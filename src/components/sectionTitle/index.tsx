interface SectionTitleProps {
  text: string;
}

export const SectionTitle = ({ text }: SectionTitleProps) => {
  return (
    <h2 className="font-display font-semibold text-black text-head24">
      {text}
    </h2>
  );
};
