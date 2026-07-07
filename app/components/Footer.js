import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950/80 border-t border-dark-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Neutral Overdrive Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-sans font-extrabold text-sm tracking-tight text-white">
              NEUTRAL<span className="text-brand-violet">OVERDRIVE</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <Link href="/about" className="hover:text-brand-cyan transition-colors">
              About Us
            </Link>
            <Link href="/tools/token-calculator" className="hover:text-brand-cyan transition-colors">
              Token Calculator
            </Link>
            <Link href="/advertise" className="hover:text-brand-cyan transition-colors">
              Advertise / Sponsorships
            </Link>
            <Link href="/privacy" className="hover:text-brand-cyan transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-cyan transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-500 text-center md:text-right">
            &copy; {new Date().getFullYear()} Neutral Overdrive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
