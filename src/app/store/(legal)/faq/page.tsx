import { discordLink } from "@/mcinfo";

// pages/faq.js
export default function FAQ() {
  return (
    <div className="max-w-5xl mx-auto bg-gray-800/90 shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-xl font-semibold text-gray-100">What is Club Colony Store?</h2>
          <p className="text-gray-400">
            Club Colony Store is an online store offering virtual items and ranks for Minecraft servers. 
            We aim to enhance your gameplay experience with exclusive in-game perks.
          </p>
        </div>
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-xl font-semibold text-gray-100">Are you affiliated with Mojang or Minecraft?</h2>
          <p className="text-gray-400">
            No, we are not affiliated with Mojang Studios or Minecraft. All trademarks are the property of their respective owners.
          </p>
        </div>
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-xl font-semibold text-gray-100">How do I make a purchase?</h2>
          <p className="text-gray-400">
            To make a purchase, browse our store, select the item or rank you want, and proceed to checkout. 
            Payments are processed securely through [payment methods, e.g., PayPal or Stripe].
          </p>
        </div>
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-xl font-semibold text-gray-100">When will I receive my purchased item?</h2>
          <p className="text-gray-400">
            Items are usually delivered in some minutes upon successful payment. If there’s a delay, please contact our support team at {" "}
            <a href={discordLink} className="text-blue-400 underline">Discord</a>.
          </p>
        </div>
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-xl font-semibold text-gray-100">What if I don’t receive my item?</h2>
          <p className="text-gray-400">
            If you don’t receive your item, check your email for a confirmation. If it’s not there, contact our support team with your order ID, and we’ll assist you.
          </p>
        </div>
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-xl font-semibold text-gray-100">Do you offer refunds?</h2>
          <p className="text-gray-400">
            All purchases are final, and refunds are not provided unless there is an error on our end. 
            Please read the product descriptions carefully before purchasing.
          </p>
        </div>
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-xl font-semibold text-gray-100">How can I contact support?</h2>
          <p className="text-gray-400">
            You can reach our support team at {" "}
            <a href={discordLink} className="text-blue-400 underline">Discord</a>. 
            We aim to respond to all inquiries within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
