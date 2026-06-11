"use client";

import { Bell, Search, User } from "lucide-react";

export function TopNavbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-10 py-2.5 text-sm focus:outline-none focus:border-gray-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l">
          <div className="text-right">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}