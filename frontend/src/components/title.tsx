
type titleProp = {
    title: string;
    subtitle?: string;
    className?: string;
};

const Title = ({ title, subtitle, className }: titleProp) => {
  return (
    <>
      <h1 className={`${className ?? ""} text-2xl text-center mb-4`}>{title}</h1>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </>
  );
};

export default Title;
