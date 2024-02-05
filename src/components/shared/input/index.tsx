import React, { useImperativeHandle, useRef } from "react";
import InputError from "../input-error";

export type InputProps = {
  label: string;
  type: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  errors?: { [x: string]: unknown };
  handleOnChange?: (e) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type,
      name,
      required = false,
      placeholder,
      errors,
      handleOnChange,
      ...props
    }: InputProps,
    ref
  ) => {
    const isRequired = required ? <span className="red">*</span> : "";
    const inputRef = useRef<HTMLInputElement>(null);
    const inputClassName = `input ${errors && errors[name] ? "error" : ""}`;

    useImperativeHandle(ref, () => inputRef.current, []);

    return (
      <div className={"inputField"}>
        <label htmlFor={name} className={"labelText"}>
          {label} {isRequired}
        </label>
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

        <InputError name={name} errors={errors} />
      </div>
    );
  }
);

export default Input;
