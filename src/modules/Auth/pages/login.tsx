import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter your email and password.");
      return;
    }

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
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 1200);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F4F7EF] px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_25px_70px_rgba(6,59,37,0.14)]">
            <div className="grid lg:grid-cols-2">
              {/* =====================================================
                  LEFT SIDE
              ====================================================== */}
              <div className="relative hidden min-h-[650px] overflow-hidden bg-gradient-to-br from-[#063B25] via-[#07552F] to-[#1B7A3D] p-10 lg:flex lg:flex-col lg:justify-between xl:p-12">
                {/* Decorative circles */}
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-[#B8F23D]/10" />

                <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full border-[50px] border-[#D9FF75]/10" />

                <div className="absolute bottom-28 right-20 h-24 w-24 rounded-full bg-[#B8F23D]/10 blur-sm" />

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B8F23D] shadow-lg">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-6 w-6 text-[#063B25]"
                    >
                      <rect
                        x="5"
                        y="3"
                        width="14"
                        height="18"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />

                      <path
                        d="M8 8h8M8 12h8M8 16h4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-lg font-bold text-white">My Balance</p>

                    <p className="text-xs text-[#D9FF75]">
                      Balance & transaction portal
                    </p>
                  </div>
                </div>

                {/* Hero */}
                <div className="relative z-10 max-w-md">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8F23D]/20 bg-white/10 px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-[#B8F23D]" />

                    <span className="text-xs font-semibold text-[#D9FF75]">
                      Secure Balance Portal
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                    Your balance.
                    <span className="block text-[#B8F23D]">Your control.</span>
                  </h2>

                  <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
                    View your balance, track money coming in and going out, and
                    keep up with your transactions in one simple place.
                  </p>

                  {/* Features */}
                  <div className="mt-10 grid grid-cols-2 gap-3">
                    {/* Easy Tracking */}
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#B8F23D] text-[#063B25]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5"
                        >
                          <path
                            d="M4 19V5M4 19h16"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />

                          <path
                            d="m7 15 4-4 3 3 5-6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <p className="text-sm font-semibold text-white">
                        Easy tracking
                      </p>

                      <p className="mt-1 text-xs text-white/50">
                        Simple & clear
                      </p>
                    </div>

                    {/* Secure */}
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#D9FF75] text-[#063B25]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5"
                        >
                          <path
                            d="M12 3 5 6v5c0 4.5 2.9 8.3 7 10 4.1-1.7 7-5.5 7-10V6l-7-3Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />

                          <path
                            d="m9 12 2 2 4-4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <p className="text-sm font-semibold text-white">Secure</p>

                      <p className="mt-1 text-xs text-white/50">
                        Protected access
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative z-10">
                  <div className="h-px bg-white/10" />

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-xs text-white/40">© 2026 My Balance</p>

                    <p className="text-xs text-white/40">All rights reserved</p>
                  </div>
                </div>
              </div>

              {/* =====================================================
                  RIGHT SIDE
              ====================================================== */}
              <div className="flex min-h-[650px] items-center bg-white px-6 py-10 sm:px-10 lg:px-14 xl:px-16">
                <div className="mx-auto w-full max-w-md">
                  {/* Mobile Logo */}
                  <div className="mb-10 flex items-center gap-3 lg:hidden">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#B8F23D]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5 text-[#063B25]"
                      >
                        <rect
                          x="5"
                          y="3"
                          width="14"
                          height="18"
                          rx="3"
                          stroke="currentColor"
                          strokeWidth="2"
                        />

                        <path
                          d="M8 8h8M8 12h8M8 16h4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="font-bold text-[#063B25]">My Balance</p>

                      <p className="text-xs text-[#718178]">
                        Balance & transaction portal
                      </p>
                    </div>
                  </div>

                  {/* Login Header */}
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9FF75] text-[#063B25]">
                      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                        <path
                          d="M15 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        <path
                          d="m16 8 4 4-4 4M20 12H9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-[#063B25] sm:text-4xl">
                      Welcome back
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-[#718178]">
                      Sign in to view your balance and transactions.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-[#123524]"
                      >
                        Email address
                      </label>

                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center text-[#718178]">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-5 w-5"
                          >
                            <rect
                              x="4"
                              y="6"
                              width="16"
                              height="12"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            />

                            <path
                              d="m5 7 7 5 7-5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          disabled={loading}
                          autoComplete="email"
                          placeholder="example@gmail.com"
                          className="w-full rounded-2xl border border-[#DDE8D8] bg-[#F8FAF5] py-3.5 pl-12 pr-4 text-sm text-[#063B25] outline-none transition-all placeholder:text-[#A0ADA5] focus:border-[#1B7A3D] focus:bg-white focus:ring-4 focus:ring-[#B8F23D]/20 disabled:cursor-not-allowed disabled:opacity-60"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-semibold text-[#123524]"
                      >
                        Password
                      </label>

                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center text-[#718178]">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-5 w-5"
                          >
                            <rect
                              x="5"
                              y="10"
                              width="14"
                              height="10"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            />

                            <path
                              d="M8 10V7a4 4 0 0 1 8 0v3"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>

                        <input
                          id="password"
                          type="password"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          disabled={loading}
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          className="w-full rounded-2xl border border-[#DDE8D8] bg-[#F8FAF5] py-3.5 pl-12 pr-4 text-sm text-[#063B25] outline-none transition-all placeholder:text-[#A0ADA5] focus:border-[#1B7A3D] focus:bg-white focus:ring-4 focus:ring-[#B8F23D]/20 disabled:cursor-not-allowed disabled:opacity-60"
                        />
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#063B25] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#063B25]/15 transition-all hover:bg-[#07552F] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="h-5 w-5 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="currentColor"
                              strokeWidth="3"
                              className="opacity-25"
                            />

                            <path
                              d="M21 12a9 9 0 0 0-9-9"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                          >
                            <path
                              d="M5 12h14M13 6l6 6-6 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Security */}
                  <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#DDE8D8] bg-[#F4F7EF] px-4 py-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D9FF75] text-[#063B25]">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                        <path
                          d="M12 3 5 6v5c0 4.5 2.9 8.3 7 10 4.1-1.7 7-5.5 7-10V6l-7-3Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />

                        <path
                          d="m9 12 2 2 4-4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#063B25]">
                        Secure access
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#718178]">
                        Your account information is securely protected.
                      </p>
                    </div>
                  </div>

                  <p className="mt-8 text-center text-xs text-[#A0ADA5]">
                    My Balance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
}
