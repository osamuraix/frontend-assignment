import { ErrorMessage } from "@hookform/error-message";

type InputErrorProps = {
  errors?: { [x: string]: unknown };
  name?: string;
};

const InputError = ({ errors, name }: InputErrorProps) => {
  if (!errors || !name) {
    return null;
  }

  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => <p className="red">{message}</p>}
    />
  );
};

export default InputError;
