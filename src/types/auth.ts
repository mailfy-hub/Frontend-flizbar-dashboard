export type UserRoleAccessType = "all" | "user" | "admin";

export interface Profile {
  id: string;
  userId: string;
  imageUrl: string | null;
  contractAccepted: boolean;
  createdAt: string;
  attachments: Attachment[]; // Adjust the type based on the structure of the attachments if available
  clientAddresses: ClientAddress[];
  clientContacts: ClientContact[]; // Adjust the type based on the structure of the client contacts if available
  clientDetails: ProfileDetails | null; // Adjust the type based on the structure of the client details if available
  clientFinance: ClientFinance | null;
  clientParents: ClientParents | null;
  user: User;
  profileDetails: ProfileDetails | null;
  beneficiaries: Beneficiary[];
}

export interface Attachment {
  clientId: string;
  createdAt: string;
  id: string;
  name: string;
  size: number;
  storageKey: string;
  type: string;
  url: string;
  identifier: string | null;
}

export interface Beneficiary {
  fullName: string;
  nationality: string;
  maritalStatus: string;
  profession: string;
  zipCode: string;
  city: string;
  state: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  reference?: string;
  email: string;
  RG: string;
  CPF: string;
  clientId: string;
  id: string;
}

export interface User {
  id: string;
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
  customId?: string | null;
}

export interface ClientAddress {
  clientId?: string;
  addressType: string;
  zipCode: string;
  city: string;
  state: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  reference?: string;
  id?: string;
}

export interface ClientFinance {
  profileId?: string;
  accountType: string;
  bankName: string;
  accountNumber: string;
  accountDigit?: string;
  agencyNumber: string;
  agencyDigit?: string;
  pixKeyType?: string;
  pixKey?: string;
  id?: string;
}

export interface ClientParents {
  profileId: string;
  fatherName: string;
  motherName: string;
}
export interface ClientParents {
  profileId: string;
  fatherName: string;
  motherName: string;
}

export interface ProfileDetails {
  profileId: string;
  nationality: string;
  documentType: string;
  document: string;
  gender: string;
  corporateName: string;
  maritalStatus: string;
  education: string;
  politicalPerson: boolean;
  profession: string;
  declaresUsTaxes: boolean;
  isEnterprise: boolean;
  personalPhone: string;
  spouseDetails: {
    spouseName?: string;
    spouseDocumentType?: string;
    spousedocument?: string;
  };
  spouse: boolean;
  birthDate: string;
  fatherName?: string;
  motherName: string;
  personType: "Física" | "Jurídica" | null;
  id: string;
}

export interface loginProps {
  email: string;
  password: string;
}

export interface ClientContact {
  clientId?: string;
  createdAt?: string;
  id: string;
  name: string;
  phone: string;
}

export interface ClientContactClient {
  name: string;
  phone: string;
}

export interface loginResponseProps {
  data: {
    user: User;
    accessToken: string;
    expires: string;
  };
}

export interface SignUpProps {
  name: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  surname: string;
}

export interface AUTH_ERROR {
  message: string;
  resource: string;
  scope: string;
}
