export type CURRENCY_TYPE = "BRL" | "USD" | "EUR" | "JPY" | "YEN";

export interface ValueObject {
  symbol: string;
  value: string;
}

export const CURRENCY_MAP: { [key: string]: string } = {
  BRL: "R$",
  USD: "$",
  EUR: "€",
  JPY: "¥",
  YEN: "¥",
};

export const formatValueByCurrency = (
  value: number,
  currency: CURRENCY_TYPE
): ValueObject => {
  const symbol = CURRENCY_MAP[currency] || "";
  return {
    symbol: symbol,
    value: value.toFixed(2),
  };
};
