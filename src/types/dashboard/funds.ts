export interface Fund {
  id: string;
  createdAt: string;
  name: string | null;
  currency: "BRL" | "USD" | "EUR" | "YEN";
  type: "conventional" | "emergency";
  defaultPercentage: string;
  customId?: string | null;
}
