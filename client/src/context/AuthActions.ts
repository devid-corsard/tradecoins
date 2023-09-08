import { Credentials } from "../types/Credentials";

export enum AuthActionsEnum {
  Register = "REGISTER",
  Login = "LOGIN",
  Logout = "LOGOUT",
}

type Register = { type: AuthActionsEnum.Register; payload: Credentials };
type Login = { type: AuthActionsEnum.Login; payload: Credentials };
type Logout = { type: AuthActionsEnum.Logout };

export type AuthActions = Login | Logout | Register;
