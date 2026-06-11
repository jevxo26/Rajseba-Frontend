"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, BarChart3, Settings, LogOut, Menu } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"} flex flex-col`}>
      <div className="p-6 flex items-center justify-between border-b border-gray-800">
        <h1 className={`font-bold text-xl ${collapsed ? "hidden" : "block"}`}>MyApp</h1>
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white">
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              pathname === item.href ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-800">
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}