type ConversionType =
  | "centsToDollars"
  | "dollarsToCents"
  | "bitsToMb"
  | "mbToBits"
  | "bytesToGb"
  | "gbToBytes";

const conversionConfig: Record<
  ConversionType,
  { convert: (value: number) => number; precision: number }
> = {
  centsToDollars: { convert: (value) => value / 100, precision: 2 },
  dollarsToCents: { convert: (value) => value * 100, precision: 0 },
  bitsToMb: { convert: (value) => value / 1024 / 1024, precision: 2 },
  mbToBits: { convert: (value) => value * 1024 * 1024, precision: 0 },
  bytesToGb: { convert: (value) => value / 1024 / 1024 / 1024, precision: 2 },
  gbToBytes: { convert: (value) => value * 1024 * 1024 * 1024, precision: 0 },
};

function roundTo(value: number, precision: number): number {
  const scale = 10 ** precision;
  return Math.round(value * scale) / scale;
}

export function unitConversion(type: ConversionType, value?: number | string) {
  if (!value) return 0;

  const config = conversionConfig[type];
  if (!config) throw new Error("Invalid conversion type");

  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return 0;

  return roundTo(config.convert(numeric), config.precision);
}

const NUMBER = String.raw`-?\d+(?:\.\d+)?(?:e[+-]?\d+)?`;
const MUL_DIV_CHAIN = new RegExp(
  String.raw`^\s*${NUMBER}(?:\s*[*/]\s*${NUMBER})*\s*$`,
  "i"
);
const TOKEN = new RegExp(`${NUMBER}|[*/]`, "gi");

// Evaluates the simple `a * b / c` chains used across the panel. Callers only
// ever interpolate numbers, so a full expression parser (previously mathjs,
// ~660KB minified) is not needed.
export function evaluateWithPrecision(expression: string) {
  if (!MUL_DIV_CHAIN.test(expression)) {
    throw new Error(`Unsupported expression: ${expression}`);
  }

  const tokens = expression.match(TOKEN) ?? [];
  let result = Number(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    const operand = Number(tokens[i + 1]);
    result = tokens[i] === "*" ? result * operand : result / operand;
  }

  return roundTo(result, 2);
}
