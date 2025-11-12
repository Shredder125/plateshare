import {
  FaHandshake,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-900 to-black text-gray-300 pt-20 pb-8 border-t border-gray-800/50 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-2.5 rounded-xl border border-orange-500/30">
                  <FaHandshake className="text-orange-400 text-2xl group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500">
                PlateShare
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting communities through shared food. Together, we reduce
              waste and feed more.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 animate-pulse"></div>
              <span className="text-orange-300 font-semibold">
                Making a difference, one meal at a time
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-orange-400 transition-colors"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/available-foods"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-orange-400 transition-colors"></span>
                  Available Foods
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-orange-400 transition-colors"></span>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-orange-400 transition-colors"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/privacy"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-orange-400 transition-colors"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-orange-400 transition-colors"></span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-orange-400 transition-colors"></span>
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-orange-400 transition-colors"></span>
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
              Stay Connected
            </h3>
            <div className="flex gap-3 mb-8">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-blue-500 transition-all group-hover:scale-110">
                  <FaFacebookF className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-sky-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-sky-500 transition-all group-hover:scale-110">
                  <FaXTwitter className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                </div>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-pink-500 transition-all group-hover:scale-110">
                  <FaInstagram className="text-gray-400 group-hover:text-pink-500 transition-colors" />
                </div>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-blue-400 transition-all group-hover:scale-110">
                  <FaLinkedinIn className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-red-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-red-500 transition-all group-hover:scale-110">
                  <FaYoutube className="text-gray-400 group-hover:text-red-500 transition-colors" />
                </div>
              </a>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-400">Subscribe for updates</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-sm text-gray-300 placeholder-gray-500 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold text-sm rounded-xl hover:from-orange-400 hover:to-yellow-400 transition-all hover:scale-105 shadow-lg hover:shadow-orange-500/50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p className="flex items-center gap-2">
              © {new Date().getFullYear()} PlateShare. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              Built with
              <span className="inline-block animate-pulse text-red-500">❤️</span>
              for the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
