export type CURRENCY_TYPE = "BRL" | "USD" | "EUR" | "JPY" | "YEN";

interface TableRowProps {
  currency: CURRENCY_TYPE;
  value: number;
}

export const CURRENCY_MAP = {
  BRL: "R$",
  USD: "$",
  EUR: "€",
  JPY: "¥",
  YEN: "¥",
};

export const CurrencyRow = ({ currency, value }: TableRowProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-display font-semibold text-body16 text-GOLD_MAIN">
        {CURRENCY_MAP[currency]}
      </span>
      <p className="font-display font-semibold text-body16 text-BLACK">
        {value}
      </p>
    </div>
  );
};
