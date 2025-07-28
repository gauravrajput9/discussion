"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";

const HeroSection = () => {
  const { data: session } = useSession();

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center bg-gradient-to-br from-purple-500 to-indigo-700 text-white px-6">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold mb-4"
      >
        Let&#39;s Begin the Discussion
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-xl max-w-2xl mb-8"
      >
        Join the community and share your thoughts — collaborate, learn, and grow together.
      </motion.p>

      {/* Key Points */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-left bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-3 max-w-md mb-8"
      >
        <li className="flex items-center gap-2">
          <span className="text-green-400 font-bold">✔</span>
          Create an account to continue
        </li>
        <li className="flex items-center gap-2">
          <span className="text-green-400 font-bold">✔</span>
          Comment on particular topics
        </li>
        <li className="flex items-center gap-2">
          <span className="text-green-400 font-bold">✔</span>
          Create your own discussion topics
        </li>
        <li className="flex items-center gap-2">
          <span className="text-green-400 font-bold">✔</span>
          Edit or delete your topics anytime
        </li>
      </motion.ul>

      {/* Dynamic CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <Link
          href={session ? "/" : "/signup"}
          className="px-6 py-3 rounded-lg bg-white text-purple-700 font-semibold text-lg hover:bg-gray-200 transition"
        >
          Get Started By Creating A New Account..
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
