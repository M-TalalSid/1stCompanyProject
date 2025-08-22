import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-white">
      {/* Gradient overlay for luxury feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950 opacity-95 pointer-events-none"></div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-wide">
              All About Jeans
            </h3>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
              Your Destination for Premium, Sustainable Fashion. <br />
              Quality Clothing that makes a Statement.
            </p>
            <div className="flex space-x-5">
              <Link
                href="#"
                className="p-3 rounded-full bg-slate-800/60 hover:bg-blue-600 transition-all duration-300"
              >
                <Facebook className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
              <Link
                href="#"
                className="p-3 rounded-full bg-slate-800/60 hover:bg-sky-500 transition-all duration-300"
              >
                <Twitter className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
              <Link
                href="#"
                className="p-3 rounded-full bg-slate-800/60 hover:bg-pink-500 transition-all duration-300"
              >
                <Instagram className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
              <Link
                href="#"
                className="p-3 rounded-full bg-slate-800/60 hover:bg-red-600 transition-all duration-300"
              >
                <Youtube className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-5 border-b border-gray-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3 text-base md:text-lg">
              {[
                ["About Us", "/about"],
                ["Contact", "/contact"],
                ["Size Guide", "/size-guide"],
                ["Shipping Info", "/shipping"],
                ["Returns", "/returns"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xl font-semibold mb-5 border-b border-gray-700 pb-2">
              Customer Service
            </h4>
            <ul className="space-y-3 text-base md:text-lg">
              {[
                ["FAQ", "/faq"],
                ["Support", "/support"],
                ["Track Your Order", "/track-order"],
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-5 border-b border-gray-700 pb-2">
              Stay Updated
            </h4>
            <p className="text-gray-400 mb-4 text-base md:text-lg">
              Subscribe for Exclusive Offers and New Arrivals.
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 text-base md:text-lg bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none transition-all"
              />
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-3 rounded-xl font-semibold text-base md:text-lg transition-all shadow-lg hover:shadow-blue-500/30">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-gray-500 text-2xl">
          <p>&copy; 2025 All About Jeans. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
