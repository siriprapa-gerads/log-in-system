import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import axios from "axios";

type navbarProps = {
  title: string;
  children?: React.ReactNode;
}

const Navbar = ({ title }: navbarProps) => {
  const { user, setUser, navigate } = useAppContext();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="transition duration-200 hover:text-gray-400">
        <h1 className="text-2xl font-bold">{title}</h1>
      </Link>
      <div>
        {user 
            ? (
              <div>
                <button 
                  className="btn bg-red-800 rounded px-4 py-1 transition duration-200 hover:bg-red-700"
                  onClick={handleLogout}>
                    Log out
                </button>
              </div>
            ) : (
              <div className="flex gap-4 text-md">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            )
          }
      </div>
    </nav>
  )
}

export default Navbar
