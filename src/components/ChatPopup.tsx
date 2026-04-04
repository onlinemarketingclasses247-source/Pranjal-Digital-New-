import React, { useEffect, useState } from "react";
import { Link } from "wouter";

export default function ChatPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000); // ⏱ shows after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
<div className="fixed bottom-6 right-6 z-50 animate-pulse">
      <div className="bg-[#0a0f1c] border border-[#c9a84c]/20 rounded-2xl shadow-xl p-4 w-72 animate-fade-in">

        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-white/40 hover:text-white text-sm"
        >
          ✕
        </button>

        {/* Content */}
        <div className="flex items-start gap-3">
          <img
            src="/images/author.webp" // 👈 your image
            alt="Pranjal"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <p className="text-white text-sm font-semibold">
              Looking for More Sales & Revenue?
            </p>

            <p className="text-white/50 text-xs mt-1">
              Let’s discuss how to grow your business.
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link href="/contact">
          <div className="mt-4 bg-[#c9a84c] text-[#080c14] text-sm font-semibold py-2 px-4 rounded-lg text-center cursor-pointer hover:opacity-90 transition">
            Contact Me Now →
          </div>
        </Link>
      </div>
    </div>
  );
}
