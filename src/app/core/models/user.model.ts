
export interface Roles {
  client?: boolean;
  admin?: boolean;
}

export interface UserModel {
  uid?: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  roles?: Roles;
  password?: string;
}
