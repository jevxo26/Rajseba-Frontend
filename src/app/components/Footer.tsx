import Link from "next/link";

const footerLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Help Center" },
  { href: "#", label: "Contact Us" },
  { href: "#", label: "Partner with Us" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e5e7eb] pt-[60px] pb-[40px] px-6 text-center mt-auto">
      <div className="max-w-[800px] mx-auto flex flex-col items-center gap-6">
        <Link href="/" className="text-[1.8rem] font-extrabold text-[#8b1a1a] no-underline tracking-[-0.03em]">
          Rajseba
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-[0.95rem] text-[#6b7280] no-underline transition-colors duration-200 hover:text-[#8b1a1a]">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-[0.85rem] text-[#9ca3af] mt-4">
          © 2024 Rajseba. All rights reserved. Premium Home Services in Bangladesh.
        </p>
      </div>
    </footer>
  );
}
