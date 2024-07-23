export interface Wallet {
  id: string;
  createdAt: string;
  walletName: string | null;
  type: 'conventional' | 'emergency';
}