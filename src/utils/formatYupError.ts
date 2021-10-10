import { ValidationError } from "yup";

export type Error = {
  path?: string;
  message?: string;
};

export const formatYupError = (err: ValidationError): Error[] => {
  return err.inner.map(({ path, message }) => ({
    path,
    message,
  }));
};
