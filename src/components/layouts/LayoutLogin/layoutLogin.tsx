import { Outlet } from "react-router-dom";

export default function LayoutLogin() {
  return (
    <div className="min-h-screen bg-[#F4F7EF]">
      <Outlet />
    </div>
  );
}
