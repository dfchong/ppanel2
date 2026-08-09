(() => {
  const params = new URLSearchParams(window.location.search);
  const spec = params.get("spec") || "/swagger.json";
  const title = params.get("title") || "API Reference";
  const theme = params.get("theme") || "saturn";
  const layout = params.get("layout") || "classic";
  const operationId = params.get("operationId");
  const scalarRoot = document.getElementById("scalar-root");
  const getHeightSourceElement = () =>
    document.querySelector(".narrow-references-container") || scalarRoot;
  let resizeObserver;
  const observedElements = new WeakSet();

  const sendHeightToParent = () => {
    if (window.parent === window) return;
    const heightSource = getHeightSourceElement();
    const sourceHeight =
      heightSource?.scrollHeight ?? heightSource?.offsetHeight ?? 0;
    const fallbackHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      0
    );
    const height = heightSource ? sourceHeight : fallbackHeight;
    window.parent.postMessage(
      {
        type: "scalar-height",
        height,
      },
      window.location.origin
    );
  };

  const mountScalar = (sourceConfiguration) => {
    Scalar.createApiReference("#scalar-root", {
      title,
      theme,
      layout,
      showSidebar: false,
      hideModels: true,
      defaultOpenAllTags: true,
      documentDownloadType: "json",
      hideSearch: false,
      withDefaultFonts: true,
      showOperationId: Boolean(operationId),
      ...sourceConfiguration,
    });

    requestAnimationFrame(sendHeightToParent);
  };

  const filterSpecByOperationId = (specContent, requestedId) => {
    if (
      !specContent ||
      typeof specContent !== "object" ||
      !specContent.paths ||
      typeof specContent.paths !== "object"
    ) {
      return null;
    }

    const filteredPaths = {};
    const matchedTags = new Set();
    let hasMatch = false;

    Object.entries(specContent.paths).forEach(([path, methods]) => {
      if (!methods || typeof methods !== "object") {
        return;
      }

      const retainedOperations = Object.entries(methods).reduce(
        (acc, [method, operation]) => {
          if (
            operation &&
            typeof operation === "object" &&
            operation.operationId === requestedId
          ) {
            acc[method] = operation;
            hasMatch = true;
            if (Array.isArray(operation.tags)) {
              operation.tags.forEach((tag) => matchedTags.add(tag));
            }
          }
          return acc;
        },
        {}
      );

      if (Object.keys(retainedOperations).length > 0) {
        filteredPaths[path] = retainedOperations;
      }
    });

    if (!hasMatch) {
      return null;
    }

    const filteredSpec = {
      ...specContent,
      paths: filteredPaths,
    };

    if (Array.isArray(specContent.tags) && matchedTags.size > 0) {
      filteredSpec.tags = specContent.tags.filter((tag) =>
        matchedTags.has(tag.name)
      );
    }

    delete filteredSpec["x-scalar-navigation"];

    return filteredSpec;
  };

  const fetchSpecContent = async () => {
    const response = await fetch(spec);
    if (!response.ok) {
      throw new Error(
        `Failed to load spec (${response.status} ${response.statusText})`
      );
    }

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (error) {
      console.warn(
        "Scalar embed: Spec is not valid JSON, falling back to full document.",
        error
      );
      return null;
    }
  };

  const init = async () => {
    if (operationId) {
      try {
        const specContent = await fetchSpecContent();
        const filteredSpec = filterSpecByOperationId(specContent, operationId);
        if (filteredSpec) {
          mountScalar({ content: filteredSpec });
          return;
        }
      } catch (error) {
        console.warn(
          "Scalar embed: Unable to filter by the requested operationId.",
          error
        );
      }
    }

    mountScalar({ url: spec });
  };

  init();

  const ensureResizeObservers = () => {
    if (typeof ResizeObserver === "undefined" || !scalarRoot) return;
    if (!resizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(sendHeightToParent);
      });
    }
    [scalarRoot, getHeightSourceElement()]
      .filter((element) => element && !observedElements.has(element))
      .forEach((element) => {
        resizeObserver.observe(element);
        observedElements.add(element);
      });
  };

  const mutationObserver =
    typeof MutationObserver !== "undefined" && scalarRoot
      ? new MutationObserver(() => {
          ensureResizeObservers();
          requestAnimationFrame(sendHeightToParent);
        })
      : null;

  mutationObserver?.observe(scalarRoot, { childList: true, subtree: true });
  ensureResizeObservers();

  if (typeof ResizeObserver === "undefined" || !scalarRoot) {
    const intervalId = setInterval(() => {
      if (document.readyState === "complete") {
        sendHeightToParent();
        clearInterval(intervalId);
      }
    }, 500);
  }

  window.addEventListener("load", sendHeightToParent);
  window.addEventListener("resize", sendHeightToParent);
})();
