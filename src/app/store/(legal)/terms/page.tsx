import { discordLink } from "@/mcinfo";

// pages/terms.js
export default function TermsAndConditions() {
  return (
    <div className="max-w-5xl mx-auto bg-gray-800/90 shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Terms & Conditions</h1>
      <p className="text-gray-400 mb-4">
        Welcome to Club Colony Store! By accessing or using our services, you agree to the following terms and conditions.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-100">1. Acceptance of Terms</h2>
          <p className="text-gray-400">
            By using our website, you agree to these Terms & Conditions. If you do not agree, please discontinue use of our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-100">2. Use of Services</h2>
          <p className="text-gray-400">
            You agree to use our website only for lawful purposes. Any misuse or unauthorized use may result in the termination of your access.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-100">3. Payment and Transactions</h2>
          <p className="text-gray-400">
            All purchases made through our website are final. Ensure that you review all product details before completing a transaction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-100">4. Limitation of Liability</h2>
          <p className="text-gray-400">
            Club Colony Store is not responsible for any damages arising from the use of our services, including but not limited to loss of data or unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-100">5. Changes to Terms</h2>
          <p className="text-gray-400">
            We reserve the right to update these Terms & Conditions at any time. Continued use of our services signifies your acceptance of any changes.
          </p>
        </section>
      </div>

      <p className="text-gray-400 mt-6">
        If you have any questions about these Terms & Conditions, please contact us at{" "}
        <a href={discordLink} className="text-blue-400 underline">
          Discord
        </a>.
      </p>
    </div>
  );
}
