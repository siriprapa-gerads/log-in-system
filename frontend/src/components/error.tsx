import { useAppContext } from "../context/appContext";

type errorProp = {
    text: string;
}

const Error = ({ text }: errorProp) => {
    const { error } = useAppContext();

    return error ? <p className="error">{text}</p> : null;
}

export default Error