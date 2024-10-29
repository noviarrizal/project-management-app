"use client";

import React, {useState} from "react";
import Image from "next/image";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import {usePathname} from "next/navigation";
import Link from "next/link";

import logo from "../../../../public/logo.png";

import {useAppDispatch, useAppSelector} from "@/src/lib/redux";
import {setIsSidebarCollapsed} from "@/src/lib/state";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState<boolean>(true);
  const [showPriority, setShowPriority] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* Top Logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">LISTMU</div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* Team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image alt="Logo" height={40} src={logo} width={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">OVIX TEAM</h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* Navbar Links */}
        <nav className="z-10 w-full">
          <SidebarLink href="/" icon={Home} label="Home" />
          <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
          <SidebarLink href="/settings" icon={Settings} label="Settings" />
          <SidebarLink href="/search" icon={Search} label="Search" />
          <SidebarLink href="/user" icon={User} label="User" />
          <SidebarLink href="/teams" icon={Users} label="Teams" />
        </nav>
        <button
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          onClick={() => setShowProjects((prev) => !prev)}
        >
          <span className="">Projects</span>
          {showProjects ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>

        <button
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          onClick={() => setShowPriority((prev) => !prev)}
        >
          <span className="">Priority</span>
          {showPriority ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {showPriority && (
          <>
            <SidebarLink href="/priority/urgent" icon={AlertCircle} label="Urgent" />
            <SidebarLink href="/priority/high" icon={ShieldAlert} label="High" />
            <SidebarLink href="/priority/medium" icon={AlertTriangle} label="Medium" />
            <SidebarLink href="/priority/low" icon={AlertOctagon} label="Low" />
            <SidebarLink href="/priority/backlog" icon={Layers3} label="Backlog" />
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({href, icon: Icon, label}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link className="w-full" href={href}>
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
