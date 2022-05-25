import React, {ChangeEvent, SyntheticEvent, useCallback} from "react";

export interface InputProps {
  type: "text" | "textarea";
  value: string;
  onChange: (event: ChangeEvent) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({type, value, onChange, placeholder, disabled}) => {
  const getInputClassName = useCallback(() => {
    const base = "p-4 border border-gray-300 rounded outline-none ";
    if (disabled) {
      return base + "cursor-default";
    }
    return base;
  },[disabled]);
  const _onChange = (event: ChangeEvent) => {
    if (!disabled) {
      onChange(event);
    }
  };
  return <input className={getInputClassName()}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={_onChange}
  />
}
export default Input;
