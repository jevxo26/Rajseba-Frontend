"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Briefcase,
  Map as MapIcon,
  Calendar,
  Search,
  ChevronDown,
  Home as HomeIcon,
  LayoutGrid,
  Info,
  Phone,
  LucideIcon,
  User,
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CATEGORIES_CONTENT } from "./sections/home/ExploreCategories";

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
  hasDropdown?: boolean;
}

const LEFT_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Menu", href: "#menu", icon: LayoutGrid, hasDropdown: true },
  { label: "Services", href: "/services", icon: Briefcase },
];

const RIGHT_NAV_LINKS: NavLink[] = [
  { label: "Map", href: "/map", icon: MapIcon },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
  { label: "Booking", href: "/bookings", icon: Calendar },
];

const ALL_NAV_LINKS: NavLink[] = [...LEFT_NAV_LINKS, ...RIGHT_NAV_LINKS];

const MOBILE_BOTTOM_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Menu", href: "#menu", icon: LayoutGrid, hasDropdown: true },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Map", href: "/map", icon: MapIcon },
  { label: "Booking", href: "/bookings", icon: Calendar },
  { label: "Login", href: "/login", icon: User },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showMobileAccordion, setShowMobileAccordion] = useState(false);
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const isHomepage = pathname === "/";

  const { scrollY } = useScroll();

  // Scroll-triggered search bar (desktop/tablet, homepage only)
  const searchOpacity = useTransform(scrollY, [150, 300], [0, 1]);
  const searchScale = useTransform(scrollY, [150, 300], [0.9, 1]);
  const searchY = useTransform(scrollY, [150, 300], [-8, 0]);

  const opacityVal = isHomepage ? searchOpacity : 1;
  const scaleVal = isHomepage ? searchScale : 1;
  const yVal = isHomepage ? searchY : 0;

  // Header shadow on scroll
  const headerShadow = useTransform(
    scrollY,
    [0, 80],
    ["0 0px 0px rgba(0,0,0,0)", "0 4px 20px -2px rgba(0,0,0,0.06)"]
  );
  const borderColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(226,232,240,0.5)", "rgba(226,232,240,1)"]
  );

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, [scrollY]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setCurrentHash(window.location.hash);
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Focus mobile search input when opened
  useEffect(() => {
    if (mobileSearchOpen && mobileSearchRef.current) {
      setTimeout(() => mobileSearchRef.current?.focus(), 100);
    }
  }, [mobileSearchOpen]);

  // Close drawer on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setMobileSearchOpen(false);
    setShowMenuDropdown(false);
    setShowMobileAccordion(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && (currentHash === "" || currentHash === "#");
    if (href.startsWith("#")) return pathname === "/" && currentHash === href;
    return pathname === href;
  };

  const handleMobileSearchToggle = () => {
    setMobileSearchOpen((v) => !v);
    if (isOpen) setIsOpen(false);
  };

  const handleMenuToggle = () => {
    setIsOpen((v) => !v);
    if (mobileSearchOpen) setMobileSearchOpen(false);
  };

  return (
    <>
      <motion.nav
        style={{ boxShadow: headerShadow, borderBottomColor: borderColor }}
        className="bg-white border-b sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* ─── TOP BAR ─── */}
          <div className="flex items-center justify-between h-16 sm:h-[68px] gap-3">

            {/* Brand */}
            <Link
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0"
              aria-label="Rajseba — Home"
            >
              <Image
                src="/logo.png"
                alt="Rajseba"
                width={140}
                height={40}
                className="h-9 sm:h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Left Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0" aria-label="Left navigation">
              {LEFT_NAV_LINKS.map((link, i) => {
                const active = link.hasDropdown ? pathname.startsWith("/categories") : isActive(link.href);
                const Icon = link.icon;

                if (link.hasDropdown) {
                  return (
                    <div
                      key={i}
                      className="relative py-2 group"
                      onMouseEnter={() => setShowMenuDropdown(true)}
                      onMouseLeave={() => setShowMenuDropdown(false)}
                    >
                      <button
                        type="button"
                        className={`flex items-center font-semibold text-xs lg:text-sm transition-colors cursor-pointer ${active ? "text-[#FF5A5F]" : "text-slate-600 hover:text-[#FF5A5F]"
                          }`}
                      >
                        <Icon className={`stroke-[2.2] transition-all duration-300 ease-in-out ${isScrolled ? "w-0 h-0 opacity-0 mr-0 scale-0" : "w-[15px] h-[15px] opacity-100 mr-1.5 scale-100"}`} />
                        <span>{link.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${showMenuDropdown ? "rotate-180" : ""}`} />
                        {active && (
                          <motion.span
                            layoutId="navIndicatorLeft"
                            className="absolute inset-x-0 -bottom-px h-0.5 bg-[#FF5A5F] rounded-full"
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {showMenuDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[460px] bg-white rounded-2xl border border-slate-100 shadow-xl p-4 z-50"
                          >
                            <div className="grid grid-cols-2 gap-2">
                              {CATEGORIES_CONTENT.categories.map((cat) => {
                                const IconComponent = cat.icon;
                                return (
                                  <Link
                                    key={cat.slug}
                                    href={`/categories/${cat.slug}`}
                                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-rose-50/50 group/item transition-colors"
                                    onClick={() => setShowMenuDropdown(false)}
                                  >
                                    <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover/item:bg-[#FF5A5F]/10 group-hover/item:text-[#FF5A5F] transition-colors">
                                      <IconComponent className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-sm text-slate-700 group-hover/item:text-slate-900 transition-colors">
                                      {cat.label}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={i}
                    href={link.href}
                    className={`relative flex items-center font-semibold text-xs lg:text-sm py-2 transition-colors ${active ? "text-[#FF5A5F]" : "text-slate-600 hover:text-[#FF5A5F]"
                      }`}
                  >
                    <Icon className={`stroke-[2.2] transition-all duration-300 ease-in-out ${isScrolled ? "w-0 h-0 opacity-0 mr-0 scale-0" : "w-[15px] h-[15px] opacity-100 mr-1.5 scale-100"}`} />
                    <span>{link.label}</span>
                    {active && (
                      <motion.span
                        layoutId="navIndicatorLeft"
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-[#FF5A5F] rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Center Search — desktop/tablet, appears on scroll (homepage) or always (other pages) */}
            {isHomepage ? (
              <div className="hidden md:flex flex-1 justify-center max-w-xs lg:max-w-sm mx-4 relative h-10">
                {mounted && (
                  <motion.div
                    style={{ opacity: opacityVal, scale: scaleVal, y: yVal }}
                    className="absolute inset-0"
                  >
                    <label htmlFor="desktop-search" className="sr-only">Search services</label>
                    <div className="flex items-center h-full bg-slate-50 border border-slate-200 rounded-full px-4 gap-2 focus-within:border-[#FF5A5F] focus-within:ring-2 focus-within:ring-[#FF5A5F]/10 transition-all">
                      <Search className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                      <input
                        id="desktop-search"
                        type="text"
                        placeholder="What service do you need?"
                        className="bg-transparent text-sm text-slate-700 outline-none w-full placeholder-slate-400"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex flex-1 justify-center max-w-xs lg:max-w-sm mx-4">
                <label htmlFor="desktop-search-2" className="sr-only">Search services</label>
                <div className="flex items-center h-10 w-full bg-slate-50 border border-slate-200 rounded-full px-4 gap-2 focus-within:border-[#FF5A5F] focus-within:ring-2 focus-within:ring-[#FF5A5F]/10 transition-all">
                  <Search className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                  <input
                    id="desktop-search-2"
                    type="text"
                    placeholder="What service do you need?"
                    className="bg-transparent text-sm text-slate-700 outline-none w-full placeholder-slate-400"
                  />
                </div>
              </div>
            )}

            {/* Right Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0" aria-label="Right navigation">
              {RIGHT_NAV_LINKS.map((link, i) => {
                const active = isActive(link.href);
                const Icon = link.icon;

                return (
                  <Link
                    key={i}
                    href={link.href}
                    className={`relative flex items-center font-semibold text-xs lg:text-sm py-2 transition-colors ${active ? "text-[#FF5A5F]" : "text-slate-600 hover:text-[#FF5A5F]"
                      }`}
                  >
                    <Icon className={`stroke-[2.2] transition-all duration-300 ease-in-out ${isScrolled ? "w-0 h-0 opacity-0 mr-0 scale-0" : "w-[15px] h-[15px] opacity-100 mr-1.5 scale-100"}`} />
                    <span>{link.label}</span>
                    {active && (
                      <motion.span
                        layoutId="navIndicatorRight"
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-[#FF5A5F] rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Auth Buttons (desktop/tablet) */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
              <Link
                href="/login"
                className="font-semibold text-slate-700 hover:text-[#FF5A5F] hover:bg-rose-50 py-2 px-3 rounded-lg text-sm lg:text-[15px] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-[#FF5A5F] hover:bg-[#FF4449] text-white font-semibold py-2.5 px-5 rounded-lg text-sm lg:text-[15px] transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                Signup
              </Link>
            </div>

            {/* Mobile Right Controls */}
            <div className="flex md:hidden items-center gap-1">
              <Button
                variant="ghost"
                onClick={handleMobileSearchToggle}
                className={`p-2.5 h-auto rounded-lg transition-colors ${mobileSearchOpen
                  ? "text-[#FF5A5F] bg-rose-50 hover:bg-rose-50 hover:text-[#FF5A5F]"
                  : "text-slate-600 hover:text-[#FF5A5F] hover:bg-slate-50"
                  }`}
                aria-label={mobileSearchOpen ? "Close search" : "Open search"}
                aria-expanded={mobileSearchOpen}
              >
                {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                onClick={handleMenuToggle}
                className={`p-2.5 h-auto rounded-lg transition-colors ${isOpen
                  ? "text-[#FF5A5F] bg-rose-50 hover:bg-rose-50 hover:text-[#FF5A5F]"
                  : "text-slate-600 hover:text-[#FF5A5F] hover:bg-slate-50"
                  }`}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X className="w-[22px] h-[22px]" /> : <Menu className="w-[22px] h-[22px]" />}
              </Button>
            </div>

          </div>

          {/* ─── MOBILE SEARCH BAR ─── */}
          <AnimatePresence>
            {mobileSearchOpen && (
              <motion.div
                key="mobile-search"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden border-t border-slate-100"
              >
                <div className="py-3 px-1">
                  <label htmlFor="mobile-search" className="sr-only">Search services</label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-4 h-11 gap-2 focus-within:border-[#FF5A5F] focus-within:ring-2 focus-within:ring-[#FF5A5F]/10 transition-all">
                    <Search className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                    <input
                      id="mobile-search"
                      ref={mobileSearchRef}
                      type="text"
                      placeholder="What service do you need today?"
                      className="bg-transparent text-sm text-slate-700 outline-none w-full placeholder-slate-400"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* ─── MOBILE DRAWER ─── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-drawer"
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-slate-100 bg-white"
            >
              <div className="px-4 py-4 space-y-1">

                {/* Nav Links */}
                {ALL_NAV_LINKS.map((link, i) => {
                  const active = link.hasDropdown ? pathname.startsWith("/categories") : isActive(link.href);
                  const Icon = link.icon;

                  if (link.hasDropdown) {
                    return (
                      <div key={i} className="space-y-1">
                        <button
                          type="button"
                          onClick={() => setShowMobileAccordion(!showMobileAccordion)}
                          className={`w-full flex items-center justify-between px-3 py-3 font-semibold text-[15px] rounded-xl transition-colors cursor-pointer ${active ? "text-[#FF5A5F] bg-rose-50" : "text-slate-700 hover:bg-slate-50 hover:text-[#FF5A5F]"
                            }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-5 h-5 text-slate-500" />
                            <span>{link.label}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMobileAccordion ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {showMobileAccordion && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4 pr-2 py-1 space-y-1"
                            >
                              <div className="grid grid-cols-2 gap-1.5">
                                {CATEGORIES_CONTENT.categories.map((cat) => {
                                  const IconComponent = cat.icon;
                                  return (
                                    <Link
                                      key={cat.slug}
                                      href={`/categories/${cat.slug}`}
                                      className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-[#FF5A5F] transition-colors"
                                      onClick={() => {
                                        setIsOpen(false);
                                        setShowMobileAccordion(false);
                                      }}
                                    >
                                      <IconComponent className="w-4 h-4 text-slate-400" />
                                      <span className="text-xs font-semibold">{cat.label}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={i}
                      href={link.href}
                      className={`flex items-center gap-2.5 px-3 py-3 font-semibold text-[15px] rounded-xl transition-colors ${active ? "text-[#FF5A5F] bg-rose-50" : "text-slate-700 hover:bg-slate-50 hover:text-[#FF5A5F]"
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5 text-slate-500" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}

                {/* Auth Buttons */}
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 mt-1">
                  <Link
                    href="/login"
                    className="text-center py-3 text-slate-700 font-semibold text-[15px] border border-slate-200 rounded-xl hover:border-[#FF5A5F] hover:text-[#FF5A5F] hover:bg-rose-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-center py-3 bg-[#FF5A5F] hover:bg-[#FF4449] text-white font-semibold text-[15px] rounded-xl shadow-sm transition-colors active:scale-[0.98]"
                    onClick={() => setIsOpen(false)}
                  >
                    Signup
                  </Link>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── MOBILE BOTTOM NAVIGATION ─── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-50 px-2 py-2 pb-safe-bottom">
        <div className="grid grid-cols-6 gap-1 max-w-lg mx-auto">
          {MOBILE_BOTTOM_LINKS.map((link, i) => {
            const Icon = link.icon;
            const active = link.hasDropdown
              ? pathname.startsWith("/categories") || (isOpen && showMobileAccordion)
              : isActive(link.href);

            const handleClick = (e: React.MouseEvent) => {
              if (link.hasDropdown) {
                e.preventDefault();
                setIsOpen((prev) => !prev);
                setShowMobileAccordion(true);
              } else {
                setIsOpen(false);
              }
            };

            return (
              <Link
                key={i}
                href={link.href}
                onClick={handleClick}
                className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all active:scale-90 ${active
                  ? "text-[#FF5A5F]"
                  : "text-slate-500 hover:text-[#FF5A5F]"
                  }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${active ? "scale-110" : ""}`} />
                <span className="text-[10px] font-semibold tracking-wide leading-none">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}