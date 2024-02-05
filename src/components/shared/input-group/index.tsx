import React, { ReactElement, useImperativeHandle, useRef } from "react";
import InputError from "../input-error";

export type InputGroupProps = {
  label: string;
  type: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  errors?: { [x: string]: unknown };
  handleOnChange?: (e) => void;
  handleIcon?: ReactElement;
};

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  (
    {
      label,
      type,
      name,
      required = false,
      placeholder,
      errors,
      handleOnChange,
      handleIcon,
      ...props
    }: InputGroupProps,
    ref
  ) => {
    const isRequired = required ? <span className="red">*</span> : "";
    const inputRef = useRef<HTMLInputElement>(null);
    const inputClassName = `input ${errors && errors[name] ? "error" : ""}`;

    useImperativeHandle(ref, () => inputRef.current, []);

    return (
      <>
        <div className={"inputField"}>
          <label htmlFor="password" className={"labelText"}>
            {label} {isRequired}
          </label>
          <div className={"inputGroup"}>
            <input
              className={inputClassName}
              ref={inputRef}
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              onChange={handleOnChange}
              {...props}
            />

            {handleIcon}
          </div>

          <InputError name={name} errors={errors} />
        </div>
      </>
    );
  }
);

export default InputGroup;
