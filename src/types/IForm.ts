export interface FormProps {
  onSubmit: (data: FormData) => void;
}

export interface FormData {
  login: string;
  password: string;
}
