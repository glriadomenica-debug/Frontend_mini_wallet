import HeaderLogin from "./headerLogin";
import { Outlet } from "react-router-dom";

export default function LayoutLogin() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col">
        {/* HEADER */}
        <HeaderLogin />

        {/* CONTENT */}
        <main className="flex flex-1 items-center justify-center px-4 py-6 sm:py-10">
          <div
            className="
          w-full
          max-w-md sm:max-w-lg md:max-w-4xl lg:max-w-5xl
          bg-white
          rounded-2xl sm:rounded-3xl
          shadow-lg sm:shadow-xl
          overflow-hidden
          flex flex-col md:flex-row
        "
          >
            <div
              className="
              w-full
              md:w-1/2
              bg-gradient-to-br from-emerald-500 to-teal-600
              text-white
              p-6 sm:p-8 md:p-12
              flex flex-col justify-center
            "
            >
              <h1 className="text-3xl lg:text-4xl font-bold">Mini Wallet</h1>

              <p className="mt-4 text-emerald-100 text-sm lg:text-base">
                Manage your money securely, fast transfer and track all
                transactions in one place.
              </p>
            </div>

            <div
              className="
            w-full md:w-1/2
            p-6 sm:p-8 md:p-10
          "
            >
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
