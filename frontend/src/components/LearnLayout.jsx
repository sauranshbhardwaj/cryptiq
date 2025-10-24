import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LearnLayout() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col bg-[#0d0d0d] pt-12 text-white">
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-2/5 overflow-y-auto border-r border-gray-700 p-6 lg:w-1/5">
            <Sidebar />
          </aside>

          <main className="h-full w-3/5 overflow-y-auto p-10 lg:w-4/5">
            <Outlet />
          </main>
        </div>
        <div className="-mt-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
