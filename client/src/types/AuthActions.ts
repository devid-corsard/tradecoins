import { FormData } from "../types/IForm";

export enum AuthActionsEnum {
  Register = "REGISTER",
  Login = "LOGIN",
  Logout = "LOGOUT",
}

type Register = { type: AuthActionsEnum.Register; payload: FormData };
type Login = { type: AuthActionsEnum.Login; payload: FormData };
type Logout = { type: AuthActionsEnum.Logout };

export type AuthActions = Login | Logout | Register;
