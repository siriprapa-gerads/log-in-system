import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Title from "../components/title";


const HomePage = () => {
  const { user } = useAppContext();

  return (
      <div className="center">
        {user
          ? (
            <div className="cenetr text-center">
              <Title
                className="font-bold mb-0!"
                title={`Welcome, ${user.name}!`}
                subtitle={user.email}
              />
            </div>
          ) : (
            <div className="card">
              <Title title={"Please Login or Register"} />
              <div className="flex flex-col w-full mt-4">
                <Link
                  to="/login"
                  className="btn btn-shape bg-blue-500 hover:bg-blue-600">
                    Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-shape bg-gray-400 hover:bg-gray-500">
                    Register
                </Link>
              </div>
            </div>
          )
        }
      </div>
  )
}

export default HomePage
