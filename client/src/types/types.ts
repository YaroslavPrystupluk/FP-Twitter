export interface IUserData {
  email: string;
  password?: string;
  displayname?: string;
}

export interface IResponseUserData {
  email: string | undefined;
  displayname: string | undefined;
  provider: string | undefined;
  isActivated: boolean | undefined;
  isRememberMy: boolean | undefined;
}