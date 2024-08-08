interface User {
  id: string;
  customId: string | null;
  name: string;
  surname: string;
  username: string;
  email: string;
  avatar: string | null;
  phone: string;
  lastAccess: string | null;
  isAdmin: boolean;
  password: string;
  verified: boolean;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
}

interface ClientProfile {
  id: string;
  userId: string;
  imageUrl: string | null;
  contractAccepted: boolean;
  createdAt: string;
  user: User;
}

interface Wallet {
  id: string;
  walletName: string;
  type: string;
  createdAt: string;
}

export type CONTRIBUTION_STATUS =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED";

export interface Contribution {
  id: string;
  createdAt: string;
  paymentDate: string;
  clientId: string;
  walletId: string;
  dollarValue: number;
  contributionAmount: number;
  status: CONTRIBUTION_STATUS;
  currency: string;
  profOfPaymentId: string | null;
  clientProfile: ClientProfile;
  wallet: Wallet;
}

export interface Attachment {
  id: string;
  clientId: string;
  createdAt: string;
  identifier: string;
  name: string;
  size: number;
  storageKey: string;
  type: string;
  url: string;
}
