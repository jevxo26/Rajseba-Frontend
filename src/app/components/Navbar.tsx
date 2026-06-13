"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/map", label: "Map" },
  { href: "/bookings", label: "Bookings" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-[#e5e7eb]">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto px-6 h-16">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold text-[#1a1a1a] no-underline tracking-[-0.02em] transition-colors duration-200 hover:text-[#8b1a1a]">
          Rajseba
        </Link>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-[0.9rem] font-medium no-underline rounded-lg transition-all duration-200 ${isActive ? "text-[#8b1a1a] after:content-[''] after:absolute after:bottom-[-2px] after:left-4 after:right-4 after:h-[2px] after:bg-[#8b1a1a] after:rounded-[1px]" : "text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f3f4f6]"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="px-4 py-2 text-[0.9rem] font-medium text-[#1a1a1a] no-underline rounded-lg transition-all duration-200 hover:bg-[#f3f4f6]">
            Login
          </Link>
          <Link href="/signup" className="px-5 py-2 text-[0.9rem] font-semibold text-white bg-[#8b1a1a] no-underline rounded-full transition-all duration-300 shadow-[0_2px_8px_rgba(139,26,26,0.25)] hover:bg-[#a52a2a] hover:shadow-[0_4px_16px_rgba(139,26,26,0.35)] hover:-translate-y-[1px]">
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
}
