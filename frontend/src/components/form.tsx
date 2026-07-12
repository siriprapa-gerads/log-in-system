import Title from "./title";

type formProps = {
    title: string;
    children?: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

function Form({ children, title, onSubmit }: formProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form 
        className="card" 
        onSubmit={handleSubmit}>
            <Title title={title} />
            {children}
    </form>
  )
}

export default Form