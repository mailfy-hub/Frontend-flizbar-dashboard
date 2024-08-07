export interface Contribuition {
  id: string;
  createdAt: string;
  clientID: string;
  walletID:  string;
  dollarValue: 0,
  contributionAmount: 0,
  status: 'pending' | 'approved' | 'completed' | 'credited';
}