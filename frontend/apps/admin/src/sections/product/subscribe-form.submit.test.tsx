// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

// Minimal reproduction of SubscribeForm's nodes handling:
// nodes is an unregistered field updated via setValue (no DOM input),
// and we check whether handleSubmit's payload actually contains it.
describe("subscribe-form nodes submit", () => {
  it("setValue on unregistered field appears in handleSubmit payload", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm({
        defaultValues: {
          nodes: [] as number[],
          node_tags: [] as string[],
          name: "",
        },
      })
    );

    // simulate toggling a node checkbox: value comes from backend as string[],
    // then normalized to number[]
    act(() => {
      result.current.setValue("nodes", ["1", "2"].map(Number));
    });
    act(() => {
      // user checks an extra node
      const current = result.current.getValues("nodes");
      result.current.setValue("nodes", [...current, 3]);
    });

    await act(async () => {
      await result.current.handleSubmit(onSubmit)();
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const payload = onSubmit.mock.calls[0]?.[0];
    expect(payload?.nodes).toEqual([1, 2, 3]);
  });
});
