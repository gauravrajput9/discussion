"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

const HeaderPage = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: App Name */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-wide hover:text-gray-200 transition"
            >
              Discussion
            </Link>
          </div>

          <div className="flex-1 mx-6 flex justify-center">
            <input
              type="text"
              placeholder="Enter a post to search..."
              className="w-full max-w-md px-4 py-2 text-base rounded-lg text-gray-800 border border-gray-300 bg-white placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-200"
            />
          </div>

          <div className="flex gap-4 items-center">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg hover:bg-purple-600 transition text-white border border-white"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-white text-purple-700 font-semibold hover:bg-gray-100 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Popover>
                  <PopoverTrigger>
                    <Image
                      src={session.user?.image ?? "/profile.png"}
                      alt="User image"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white cursor-pointer hover:scale-105 transition"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="p-3 bg-white rounded-lg shadow-md border border-gray-200 w-36 text-center flex flex-col">
                    {/* Logout Button */}
                    <button
                      onClick={() => signOut()}
                      className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition"
                    >
                      Logout
                    </button>

                    <Separator className="my-2 h-[2px] bg-gray-300" />

                    {/* Edit Profile Button */}
                    <button className="w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition">
                      Edit Profile
                    </button>
                  </PopoverContent>
                </Popover>
                <p className="text-white font-medium">{session.user?.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderPage;
