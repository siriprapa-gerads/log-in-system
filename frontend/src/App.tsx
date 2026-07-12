import { Route, Routes } from "react-router-dom"
import { useAppContext } from "./context/appContext"
import { useEffect } from "react"
import axios from "axios"
import Navbar from "./components/navbar"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import NotfoundPage from "./pages/notfound"

// send cookies to every request
// be able to identify a login user
axios.defaults.withCredentials = true;

function App() {
  const { setUser, loading, setLoading } = useAppContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        // const userData = response.data?.user ?? response.data;
        // setUser(userData);
        setUser(response.data.user)
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setLoading, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar title={"PERN Auth"} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
}

export default App
