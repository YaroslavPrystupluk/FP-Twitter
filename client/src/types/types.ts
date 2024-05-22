export interface IUserData {
  name?: string;
  email: string;
  password?: string;
}

export interface IPersoneUserData {
  email: string;
  displayName: string;
  provider: string;
  isActivated: boolean;
  isRememberMy: boolean;
}