import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<any>({});

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/auth/register", form);

      toast.success("Registration successful 🎉");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err: any) {
      const validationErrors = err.response?.data?.message;

      if (validationErrors && typeof validationErrors === "object") {
        setErrors(validationErrors);

        Object.keys(validationErrors).forEach((key) => {
          toast.error(validationErrors[key][0]);
        });
      } else {
        toast.error("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center py-10">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>

          <p className="text-gray-500 mt-1 mb-6">
            Register your Mini Wallet account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Username</label>

              <input
                type="text"
                name="username"
                onChange={handleChange}
                className={`w-full mt-1 p-3 rounded-xl border outline-none ${
                  errors.username
                    ? "border-red-500"
                    : "border-gray-200 focus:ring-2 focus:ring-emerald-400"
                }`}
                placeholder="john_doe"
              />

              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username[0]}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>

              <input
                type="email"
                name="email"
                onChange={handleChange}
                className={`w-full mt-1 p-3 rounded-xl border outline-none ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-200 focus:ring-2 focus:ring-emerald-400"
                }`}
                placeholder="example@gmail.com"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone Number</label>

              <input
                type="text"
                name="phone_number"
                onChange={handleChange}
                className={`w-full mt-1 p-3 rounded-xl border outline-none ${
                  errors.phone_number
                    ? "border-red-500"
                    : "border-gray-200 focus:ring-2 focus:ring-emerald-400"
                }`}
                placeholder="08xxxxxxxxxx"
              />

              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number[0]}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>

              <input
                type="password"
                name="password"
                onChange={handleChange}
                className={`w-full mt-1 p-3 rounded-xl border outline-none ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-200 focus:ring-2 focus:ring-emerald-400"
                }`}
                placeholder="********"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>

              <input
                type="password"
                name="password_confirmation"
                onChange={handleChange}
                className={`w-full mt-1 p-3 rounded-xl border outline-none ${
                  errors.password_confirmation
                    ? "border-red-500"
                    : "border-gray-200 focus:ring-2 focus:ring-emerald-400"
                }`}
                placeholder="********"
              />

              {errors.password_confirmation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password_confirmation[0]}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl transition"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-emerald-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        <ToastContainer position="top-right" />
      </div>
    </>
  );
}
