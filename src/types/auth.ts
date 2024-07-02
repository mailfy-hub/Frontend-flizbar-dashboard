export type UserRoleAccessType = "all" | "user" | "admin";



export interface Profile {
  id: string;
  userId: string;
  imageUrl: string | null;
  contractAccepted: boolean;
  createdAt: string;
  attachments: any[]; // Adjust the type based on the structure of the attachments if available
  clientAddresses: ClientAddress[] | null;
  clientContacts: string[]; // Adjust the type based on the structure of the client contacts if available
  clientDetails: any | null; // Adjust the type based on the structure of the client details if available
  clientFinance: ClientFinance | null;
  clientParents: ClientParents | null;
  user: User;
  profileDetails: ProfileDetails | null;
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
  isAdmin: UserRoleAccessType;
  password: string;
  verified: boolean;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
}

export interface ClientAddress {
  clientId: string;
  addressType: string;
  documentNumber: string;
  zipCode: string;
  city: string;
  state: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  reference: string;
}

export interface ClientFinance {
  profileId: string;
  contactType: string;
  bankName: string;
  accountNumber: string;
  accountDigit: string;
  agencyNumber: string;
  agencyDigit: string;
  pixKeyType: string;
  pixKey: string;
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
  spouseDetails: string;
  spouse: boolean;
  birthDate: string;
}





export interface loginProps {
  email: string;
  password: string;
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
