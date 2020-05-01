
export interface Roles {
  client?: boolean;
  admin?: boolean;
}

export interface UserModel {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  roles?: Roles;
  username?: string;
  password?: string;
}
