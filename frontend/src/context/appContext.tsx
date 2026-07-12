import {
  createContext,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";


// createContext
type FormState = {
  name: string;
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
};

type AppContextProps = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;

    form: FormState;
    setForm: React.Dispatch<React.SetStateAction<FormState>>;

    navigate: (to: string) => void;
};

export const AppContext = createContext<AppContextProps | undefined>(undefined);


// contextProvider
type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();


    const valueContext: AppContextProps = {
        user,
        setUser,

        loading,
        setLoading,

        error,
        setError,

        form,
        setForm,

        navigate,
    };

    return (
        <AppContext.Provider value={valueContext}>
            {children}
        </AppContext.Provider>
    );
};

// useContext
export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("App must be used inside AppProvider");
    }

    return context;
};