import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import loginPic from "/images/Login-cuate.png";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { setUserData } from "../features/registration/userAuthSlice";
import authApi from "../features/registration/loginAPI";

type LoginForm = {
  username: string;
  password: string;
  role: string;
};

export const AdminLogin = () => {
  const [user, setUser] = useState<LoginForm>({
    username: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);
  const [loginUser, { isLoading }] = authApi.useLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Submitting form data:", user); // Debugging step
    try {
      const response = await loginUser(user).unwrap();
      // console.log("Backend response:", response); // Debugging step

      dispatch(setUserData({ user: response.user, token: response.token }));
      // Display the success message before navigation
      toast.success("Logged in successfully", {
        position: "bottom-center",
      });

      // Redirect based on user role

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
      if (user.role === "user") {
        navigate("/users/dashboard");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center py-12 px-6 lg:px-8">
      <Toaster
        toastOptions={{
          classNames: {
            error: "bg-red-400",
            success: "text-green-400",
            warning: "text-yellow-400",
            info: "bg-blue-400",
          },
        }}
      />
      <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start lg:px-8">
        <img
          className="w-full h-auto object-cover lg:h-full"
          src={loginPic}
          alt="Welcome"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full lg:w-[600px]">
          <div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  value={user.username}
                  onChange={handleChange}
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="rounded w-full mb-5 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  value={user.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-1/2 lg:ml-[150px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white sm:ml-0 bg-cards hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? "Logging in..." : "Login"}
                {/* success toaster */}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="text-center">
              <p className="mt-2 text-sm text-gray-600">
                Don't have an account?{" "}
                <NavLink
                  to="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Register
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
