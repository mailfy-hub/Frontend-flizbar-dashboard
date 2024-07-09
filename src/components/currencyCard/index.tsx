interface CurrencyCardProps {
  Name: string;
  Symbol: string;
  Value: number;
  color?: string;
}

export const CurrencyCard = ({
  Name,
  Symbol,
  Value,
  color,
}: CurrencyCardProps) => {
  return (
    <div className="bg-white w-full h-[124px] rounded-lg flex flex-col justify-between p-6">
      <div className="w-full flex items-center justify-between gap-4">
        <p className="font-display font-semibold text-BLACK text-body16 leading-tight">
          {Name}
        </p>
        {color && (
          <div
            style={{
              backgroundColor: `${color}`,
              width: "18px",
              height: "6px",
              borderRadius: "2px",
            }}
          ></div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="font-body font-normal text-sm10 text-GRAY_400 uppercase leading-tight">
            VALOR
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-GOLD_DARK text-body18">
            {Symbol}
          </span>
          <span className="font-display font-semibold text-BLACK text-body18">
            {Value}
          </span>
        </div>
      </div>
    </div>
  );
};
