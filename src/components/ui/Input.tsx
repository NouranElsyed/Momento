import type { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  autoComplete?: string;
}

const Input = ({
  name,
  placeholder,
  className,
  type,
  autoComplete,
  ...props
}: IProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      {...props}
      className={`w-full text-sm border px-3 py-1 border-[#e1e4e9] rounded-md bg-[#fcfcfc]  text-[#3c3c3c] placeholder-[#a29c9cb3]
       focus:border-[#769ce6] focus:outline-none focus:border-2 transition-all duration-100 ease-in-out
              ${className}`}
      autoComplete={autoComplete}
    />
  );
};

export default Input;
