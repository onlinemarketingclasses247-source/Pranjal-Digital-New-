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

export default function TermsOfService() {

  useEffect(() => {
  document.title = "Terms of Service | Pranjal Digital";

  setMeta(
    "Read the terms of service for Pranjal Digital to understand service conditions, responsibilities, and policies."
  );
}, []);
  return (
    <div className="bg-[#080c14] text-white pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          <span className="text-[#c9a84c]">Terms</span> of Service
        </h1>

        <p className="text-white/60 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-white/70 leading-relaxed">

          <p>
            By accessing and using Pranjal Digital’s website and services, you agree to comply with these Terms of Service.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">1. Services</h2>
          <p>
            We provide digital marketing consulting, strategy, and execution services. Results may vary depending on market conditions and implementation.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">2. User Responsibilities</h2>
          <p>
            You agree to provide accurate information and use our services ethically. Any misuse may result in termination of services.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">3. Payments</h2>
          <p>
            All payments for services must be made as agreed. Fees are non-refundable unless explicitly stated.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">4. Intellectual Property</h2>
          <p>
            All content, strategies, and materials shared remain the intellectual property of Pranjal Digital unless agreed otherwise.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">5. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect or consequential damages resulting from the use of our services.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">6. Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use of the website means acceptance of updated terms.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">7. Contact</h2>
          <p>
            For any questions or updates, contact us at:
            <br />
            <span className="text-[#c9a84c]">info@pranjaldigital.com</span>
          </p>

        </div>
      </div>
    </div>
  );
}
