'use client'

"use client";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-purple-200 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-white">Discussion Hub</h2>
          <p className="text-sm text-purple-400">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Right Section (Social Icons) */}
        <div className="flex gap-4">
          <a
            href="#"
            className="p-2 rounded-full bg-purple-800 hover:bg-purple-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 5 3.66 9.12 8.44 9.88v-6.99H8.09v-2.89h2.35V9.71c0-2.33 1.39-3.63 3.52-3.63 1.02 0 2.08.18 2.08.18v2.28h-1.17c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.89h-2.18v6.99C18.34 21.12 22 17 22 12c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-purple-800 hover:bg-purple-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.57 2.163-2.724-.949.564-2.003.974-3.127 1.195-.896-.956-2.173-1.555-3.591-1.555-2.717 0-4.924 2.207-4.924 4.924 0 .39.044.765.128 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.729-.666 1.577-.666 2.475 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.229-.616v.062c0 2.385 1.693 4.374 3.946 4.828-.413.112-.848.171-1.296.171-.317 0-.626-.031-.928-.088.627 1.956 2.444 3.379 4.6 3.419-1.68 1.318-3.809 2.105-6.115 2.105-.397 0-.788-.023-1.175-.069 2.179 1.397 4.768 2.212 7.557 2.212 9.054 0 14.01-7.496 14.01-13.986 0-.213-.005-.425-.014-.636.962-.694 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
