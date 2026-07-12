import { useAppContext } from "../context/appContext"
import axios from "axios";
import Form from "../components/form";
import Input from "../components/input";
import Button from "../components/button";
import Error from "../components/error";


const LoginPage = () => {

    const { form, setForm, error, setError, setUser, navigate } = useAppContext();

    const handleLogin = async (_e: React.FormEvent<HTMLFormElement>) => {
        try {
            const response = await axios.post(
                "/api/auth/login",
                form
            );
            // const userData = response.data?.user ?? response.data;
            // setUser(userData);
            setUser(response.data.user)
            navigate("/");

        } catch (error) {
            setError("Invalid email or password")

        }
    }

    return (
        <div className="center">
            <Form title={"Login"} onSubmit={handleLogin} >
                <Error text={error} />
                <Input
                    type={"email"}
                    placeholder={"email"}
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                />
                <Input
                    type={"password"}
                    placeholder={"password"}
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                />
                <Button label={"Log in"} type="submit" />
            </Form>
        </div>
    )
}

export default LoginPage
