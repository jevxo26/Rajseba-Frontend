"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="Rajseba Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="font-bold text-2xl text-slate-900">Rajseba</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="#services"
              className="text-slate-600 hover:text-[#FF5A5F] font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              href="#how-it-works"
              className="text-slate-600 hover:text-[#FF5A5F] font-medium transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="#about"
              className="text-slate-600 hover:text-[#FF5A5F] font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              href="#blog"
              className="text-slate-600 hover:text-[#FF5A5F] font-medium transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2.5 text-slate-700 font-medium hover:bg-slate-100 rounded-2xl transition-all"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 bg-[#FF5A5F] hover:bg-[#FF4449] text-white font-semibold rounded-2xl transition-all"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-700"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t py-6 bg-white">
            <div className="flex flex-col gap-6 px-6 text-lg">
              <Link href="#services" className="text-slate-700 hover:text-[#FF5A5F]">
                Services
              </Link>
              <Link href="#how-it-works" className="text-slate-700 hover:text-[#FF5A5F]">
                How it Works
              </Link>
              <Link href="#about" className="text-slate-700 hover:text-[#FF5A5F]">
                About Us
              </Link>
              <Link href="#blog" className="text-slate-700 hover:text-[#FF5A5F]">
                Blog
              </Link>

              <div className="pt-6 border-t flex flex-col gap-4">
                <Link
                  href="/login"
                  className="text-center py-3 text-slate-700 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-center py-3 bg-[#FF5A5F] text-white font-semibold rounded-2xl hover:bg-[#FF4449]"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}