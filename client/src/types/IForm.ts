export interface FormProps {
  onSubmit: (data: FormData) => void;
}

export interface FormData {
  username: string;
  password: string;
}
