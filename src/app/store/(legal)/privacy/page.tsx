import { discordLink } from "@/mcinfo";

// pages/privacy.js
export default function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto bg-gray-800/90 shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Privacy Policy</h1>
      <p className="text-gray-400 mb-4">
        At Club Colony Store, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you use our services.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-100">1. Information We Collect</h2>
          <p className="text-gray-400">
            We collect personal information such as your name, email address, and payment details when you make a purchase. Additionally, we may collect technical data such as your IP address and browser type for analytics purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-100">2. How We Use Your Information</h2>
          <p className="text-gray-400">
            Your information is used to process transactions, provide support, and improve our services. We may also send occasional promotional emails, which you can opt out of at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-100">3. Sharing Your Information</h2>
          <p className="text-gray-400">
            We do not sell or share your personal information with third parties, except as required by law or to complete transactions (e.g., payment processors).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-100">4. Data Security</h2>
          <p className="text-gray-400">
            We use encryption and secure storage to protect your information. However, no system is completely secure, and we cannot guarantee absolute protection.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-100">5. Changes to This Policy</h2>
          <p className="text-gray-400">
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page, and significant updates may be communicated to you directly.
          </p>
        </section>
      </div>

      <p className="text-gray-400 mt-6">
        If you have any questions about this Privacy Policy, please contact us at{" "}
        <a href={discordLink} className="text-blue-400 underline">
          Discord
        </a>.
      </p>
    </div>
  );
}
