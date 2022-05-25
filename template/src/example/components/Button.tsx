import {ReactNode, SyntheticEvent} from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick: (event: SyntheticEvent) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({children, onClick, disabled}) => {
  const isDisabled = disabled ?? false;

  const getButtonClass = () => {
    const base = "w-40 p-2 rounded text-white text-md outline-none ";
    if (isDisabled) {
      return base + " bg-blue-300 cursor-not-allowed";
    }
    return base + " bg-blue-500 cursor-pointer";
  }

  return <button className={getButtonClass()}
    onClick={onClick} disabled={isDisabled}>
    {children}
  </button>;
};
export default Button;
