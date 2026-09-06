import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import BackButton from "../../../components/common/BackButton";

interface RegisterForm {
  username: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
}

interface ValidationErrors {
  [key: string]: string[];
}

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8000/api/admin/users", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Customer created successfully 🎉");

      setForm({
        username: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
      });

      setErrors({});
    } catch (err: any) {
      const validationErrors = err.response?.data?.message;

      if (validationErrors && typeof validationErrors === "object") {
        setErrors(validationErrors);

        Object.keys(validationErrors).forEach((key) => {
          toast.error(validationErrors[key][0]);
        });
      } else {
        toast.error(err.response?.data?.message || "Failed to create customer");
      }
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (field: string) => {
    return `
      w-full
      px-4 py-3
      rounded-xl
      border
      text-gray-700
      outline-none
      transition
      ${
        errors[field]?.length
          ? "border-red-500 focus:ring-2 focus:ring-red-100"
          : "border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
      }
    `;
  };

  return (
    <>
      <div className="max-w-xl mx-auto px-4 sm:px-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 md:px-8 border-b border-gray-100">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Create Customer
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Create a new Mini Wallet customer account.
                </p>
              </div>

              <BackButton />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="john_doe"
                disabled={loading}
                className={getInputClass("username")}
              />

              {errors.username?.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username[0]}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                disabled={loading}
                className={getInputClass("email")}
              />

              {errors.email?.length > 0 && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>

              <input
                id="phone_number"
                type="text"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                disabled={loading}
                className={getInputClass("phone_number")}
              />

              {errors.phone_number?.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number[0]}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                disabled={loading}
                className={getInputClass("password")}
              />

              {errors.password?.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Confirm Password
              </label>

              <input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                placeholder="********"
                disabled={loading}
                className={getInputClass("password_confirmation")}
              />

              {errors.password_confirmation?.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password_confirmation[0]}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-3 rounded-xl font-semibold transition duration-200"
            >
              {loading ? "Creating..." : "Create Customer"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
}
