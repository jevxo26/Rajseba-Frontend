// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="Rajseba Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-3xl font-bold tracking-tight">Rajseba</span>
          </Link>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Making home services simple, reliable, and trustworthy across Bangladesh.
          </p>
        </div>
        
        {/* Company */}
        <div>
          <div className="font-medium mb-4 text-lg">Company</div>
          <div className="space-y-2 text-sm text-zinc-400">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="#" className="hover:text-white transition-colors">Careers</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
        
        {/* Services */}
        <div>
          <div className="font-medium mb-4 text-lg">Services</div>
          <div className="space-y-2 text-sm text-zinc-400">
            <Link href="#services" className="hover:text-white transition-colors">AC Repair</Link>
            <Link href="#services" className="hover:text-white transition-colors">Plumbing</Link>
            <Link href="#services" className="hover:text-white transition-colors">Cleaning</Link>
            <Link href="#services" className="hover:text-white transition-colors">Painting</Link>
            <Link href="#services" className="hover:text-white transition-colors">Electrical</Link>
          </div>
        </div>
        
        {/* Support */}
        <div>
          <div className="font-medium mb-4 text-lg">Support</div>
          <div className="space-y-2 text-sm text-zinc-400">
            <Link href="#" className="hover:text-white transition-colors">Help Center</Link>
            <Link href="#" className="hover:text-white transition-colors">Safety Guarantee</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-zinc-800 text-center text-xs text-zinc-500">
        © 2026 Rajseba. All rights reserved.
      </div>
    </footer>
  );
}