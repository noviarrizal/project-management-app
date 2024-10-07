import React from "react";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const DashboardWrapper = ({children}: {children: React.ReactNode}) => (
  <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
    {/* Sidebar */}
    <Sidebar />
    <main className="flex w-full flex-col bg-gray-50 dark:bg-dark-bg md:pl-64">
      <Navbar />
      {children}
    </main>
  </div>
);

export default DashboardWrapper;
