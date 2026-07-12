import { useAppContext } from "../context/appContext";
import axios from "axios";
import Form from "../components/form"
import Input from "../components/input"
import Button from "../components/button"
import Error from "../components/error";

const RegisterPage = () => {

  const { form, setForm, error, setError, setUser, navigate } = useAppContext();
  
  const handleRegister = async (_e: React.FormEvent<HTMLFormElement>) => {
      try {
        const response = await axios.post(
            "/api/auth/register",
            form
        );
        // const userData = response.data?.user ?? response.data;
        // setUser(userData);
        setUser(response.data.user)
        navigate("/");

      } catch (error) {
          setError("Registration failed. Please try again.");

      }
  }

  return (
    <div className="center">
      <Form title="Register" onSubmit={handleRegister}>
        <Error text={error} />
        <Input
          type="text"
          placeholder="Username"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <Input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
        <Button label="Register" type="submit"/>
      </Form>
    </div>
  )
}

export default RegisterPage
