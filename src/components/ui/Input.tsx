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
      className={`w-full text-base border-2 px-3 py-1 border-[#cfd6e1] rounded-md   text-[#3c3c3c] placeholder-[#3c3c3cc2]
       focus:border-[#7fa1e4] focus:outline-none 
              [&::-webkit-calendar-picker-indicator]:invert 
              ${className}`}
      autoComplete={autoComplete}
    />
  );
};

export default Input;
