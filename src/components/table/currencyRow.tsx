interface TableRowProps {
  currency: "BRL" | "USD" | "EUR" | "JPY";
  value: number;
}

const CURRENCY_MAP = {
  BRL: "R$",
  USD: "$",
  EUR: "€",
  JPY: "¥",
};

export const CurrencyRow = ({currency, value}: TableRowProps) => {
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
