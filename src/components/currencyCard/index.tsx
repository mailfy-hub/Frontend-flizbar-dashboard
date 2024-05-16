interface CurrencyCardProps {
  Name: string;
  Symbol: string;
  Value: number;
}

export const CurrencyCard = ({Name, Symbol, Value}: CurrencyCardProps) => {

  return (
    <div className="bg-white w-full h-[124px] rounded-lg flex flex-col justify-between p-6">
      <p className="font-display font-semibold text-BLACK text-body16 leading-tight">{Name}</p>
      <div className="flex flex-col gap-1">
        <span className="font-body font-normal text-sm10 text-GRAY_400 uppercase leading-tight">VALOR</span>
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-GOLD_DARK text-body18">{Symbol}</span>
          <span className="font-display font-semibold text-BLACK text-body18">{Value}</span>
        </div>
      </div>
    </div>
  )
}