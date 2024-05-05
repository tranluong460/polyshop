import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: IconType;
  small?: boolean;
  outline?: boolean;
  disabled?: boolean;
  unBackground?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  unBackground,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full p-3
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
        ${
          unBackground
            ? "border-none hover:text-rose-500"
            : outline
            ? "bg-white text-black border-black"
            : "bg-rose-500 text-white border-rose-500"
        }
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}

      {label}
    </button>
  );
};

export default Button;
