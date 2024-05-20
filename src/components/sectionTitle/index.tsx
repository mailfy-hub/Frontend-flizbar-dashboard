interface SectionTitleProps {
  text: string;
  size?: "sm" | "md" | "lg";
}

export const SectionTitle = ({ text, size = "md" }: SectionTitleProps) => {
  const mapSize = {
    sm: "text-body18",
    md: "text-head24",
    lg: "text-head32",
  };

  return (
    <h2 className={`font-display font-semibold text-black ${mapSize[size]}`}>
      {text}
    </h2>
  );
};
