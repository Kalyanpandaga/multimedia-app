import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { API_BASE_URL, ROUTES } from "../config/constants";

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = API_BASE_URL + "/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt_token", data.token, { expires: 23 / 24 });
        Cookies.set("user", JSON.stringify(data.user), { expires: 23 / 24 });
        navigate(ROUTES.DASHBOARD);
      } else {
        setShowError(true);
        setErrorMsg(data.errorMessage || "Login failed");
      }
    } catch (error) {
      setShowError(true);
      setErrorMsg("Network error occurred");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-md rounded-lg p-8"
      >
        <div className="mb-4">
          <label
            htmlFor="emailId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            EMAIL
          </label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        {showError && <p className="text-red-500 text-sm mt-2">* {errorMsg}</p>}

        <div className="mt-4 text-center">
          <Link to="/signup" className="text-blue-600 hover:text-blue-700">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
