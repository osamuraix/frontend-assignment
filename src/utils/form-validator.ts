const FormValidator = {
  required: (name: string) => ({
    value: true,
    message: `${name} is required.`,
  }),
  minLength: (name: string, min: number) => ({
    value: min,
    message: `${name} must be at least ${min} characters.`,
  }),
  maxLength: (name: string, max: number) => ({
    value: max,
    message: `${name} must not exceed ${max} characters.`,
  }),
  email: (name: string) => ({
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: `${name} must be a valid email address.`,
  }),
  password: (name: string) => ({
    value:
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/,
    message: `${name} does not contain at least a number, an upper case alphabet, a lower case alphabet.`,
  }),
  validatePasswordMatch: (value: string, password: string) =>
    value === password || "Passwords do not match",
};

export default FormValidator;
