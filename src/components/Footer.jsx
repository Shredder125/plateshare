import { FaHandshake } from "react-icons/fa";



export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-950 via-gray-900 to-black text-gray-300 pt-14 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaHandshake className="text-orange-400 text-2xl" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
              PlateShare
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Connecting communities through shared food.  
            Together, we reduce waste and feed more.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-orange-300 transition">Home</a></li>
            <li><a href="/available-foods" className="hover:text-orange-300 transition">Available Foods</a></li>
            <li><a href="/about" className="hover:text-orange-300 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-orange-300 transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy" className="hover:text-orange-300 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-orange-300 transition">Terms of Service</a></li>
            <li><a href="/faq" className="hover:text-orange-300 transition">FAQs</a></li>
            <li><a href="/support" className="hover:text-orange-300 transition">Support</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">
            Follow Us
          </h3>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" className="hover:text-blue-500 transition"><i className="fab fa-facebook"></i></a>
            <a href="https://twitter.com" target="_blank" className="hover:text-sky-400 transition"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com" target="_blank" className="hover:text-pink-500 transition"><i className="fab fa-instagram"></i></a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-blue-400 transition"><i className="fab fa-linkedin"></i></a>
            <a href="https://youtube.com" target="_blank" className="hover:text-red-500 transition"><i className="fab fa-youtube"></i></a>
          </div>
          <form className="mt-5 flex items-center bg-gray-800 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Subscribe for updates"
              className="w-full px-3 py-2 bg-transparent text-sm text-gray-300 outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-4 py-2 text-sm font-semibold hover:from-orange-400 hover:to-yellow-400 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PlateShare. All rights reserved. | Built with ❤️ for the community.
      </div>
    </footer>
  );
}
