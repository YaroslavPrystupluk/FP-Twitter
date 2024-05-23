export interface IUser {
  id: string;
  email: string;
  password?: string;
  isRememberMe?: boolean;
  accessToken: string;
}

export interface IUserDataRegister {
  email: string;
  password?: string;
  confirmPassword?: string;
  displayname: string;
}

export interface IResponseUserDataRegister {
  email: string;
  displayname: string;
  provider: string;
  isActivated: boolean;
  isRememberMe?: boolean;
}

export interface IUserDataLogin {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface IResponseUserDataLogin {
  accessToken: string;
  email: string;
  password: string;
  isRememberMe?: boolean;
}
