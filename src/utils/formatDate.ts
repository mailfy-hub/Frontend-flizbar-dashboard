export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear().toString();

  return `${day}/${month}/${year}`;
};
