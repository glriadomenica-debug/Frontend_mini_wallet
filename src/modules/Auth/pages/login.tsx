import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        form,
      );

      const { token, user } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Welcome back 👋");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center md:min-h-[70vh]">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>

          <p className="text-gray-500 mt-1 mb-6">
            Access your Mini Wallet account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>

              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>

              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                placeholder="********"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl transition"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-500 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}
