import React, { useEffect } from "react";

function setMeta(description) {
  let meta = document.querySelector("meta[name='description']");

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", description);
}

export default function PrivacyPolicy() {
  useEffect(() => {
  document.title = "Privacy Policy | Pranjal Digital";

  setMeta(
    "Read the privacy policy of Pranjal Digital to understand how your data is collected, used, and protected."
  );
}, []);
  return (
    <div className="bg-[#080c14] text-white pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          <span className="text-[#c9a84c]">Privacy</span> Policy
        </h1>

        <p className="text-white/60 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-white/70 leading-relaxed">

          <p>
            This Privacy Policy explains how Pranjal Digital collects, uses, and protects your information.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">1. Information We Collect</h2>
          <p>
            We may collect personal information such as name, email, phone number, and business details when you contact us or use our services.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">2. How We Use Information</h2>
          <p>
            Your information is used to provide services, improve user experience, and communicate updates or offers.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">3. Data Protection</h2>
          <p>
            We implement security measures to protect your data. However, no method is 100% secure.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">4. Third-Party Services</h2>
          <p>
            We may use third-party tools (e.g., analytics, ads platforms) that collect data according to their policies.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">5. Cookies</h2>
          <p>
            Our website may use cookies to enhance user experience and track performance.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">6. Your Rights</h2>
          <p>
            You can request to access, update, or delete your personal data at any time.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">7. Contact</h2>
          <p>
            For any privacy-related requests or updates:
            <br />
            <span className="text-[#c9a84c]">info@pranjaldigital.com</span>
          </p>

        </div>
      </div>
    </div>
  );
}
