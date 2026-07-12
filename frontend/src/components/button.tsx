
type buttonProps = {
  type?: "submit" | "button";
  label: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ label, type, onClick }: buttonProps) => {
  return (
    <button 
        type={type}
        className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={onClick}>
          {label}
    </button>
  )
}

export default Button;
