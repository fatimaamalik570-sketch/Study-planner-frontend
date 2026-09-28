import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

function StudentLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-layout">

      <Sidebar role="student" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="main-content">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="page-content">
          <Outlet />
        </div>
      </main>

    </div>
  );
}

export default StudentLayout;