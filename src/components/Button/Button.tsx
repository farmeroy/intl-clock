interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
const Button = ({
  onClick,
  children,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      className="w-full p-2 border rounded-lg h-fit border-1 bg-gray disabled:opacity-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
