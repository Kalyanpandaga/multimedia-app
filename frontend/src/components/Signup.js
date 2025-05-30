import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, ROUTES } from "../config/constants";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      const url = API_BASE_URL + "/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate(ROUTES.LOGIN);
      } else {
        setShowError(true);
        setErrorMsg(data.errorMessage || "Signup failed");
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
            htmlFor="firstName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            FIRST NAME
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            LAST NAME
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            required
          />
        </div>

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
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Signup
        </button>

        {showError && <p className="text-red-500 text-sm mt-2">* {errorMsg}</p>}
      </form>
    </div>
  );
};

export default Signup;
