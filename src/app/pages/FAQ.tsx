import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "When do we need to register?",
      answer: "Registration will be open until the event is sold out. A lot of these workshops and events will have LIMITED capacity so it is encouraged to register as early as possible to claim your spot.",
    },
    {
      question: "How do I register for an event?",
      answer: "You can register through our website by visiting the Events page and clicking 'Register Now' on your desired workshop. You'll need to complete the Dance Workshop Form and submit payment. You'll receive a confirmation email with all the details.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made 30+ days before the event receive a full refund. Cancellations made 14-29 days before receive a 50% refund. Unfortunately, we cannot offer refunds for cancellations made less than 14 days before the event. However, you may transfer your registration to another person.",
    },
    {
      question: "What should I bring to a workshop?",
      answer: "Please bring comfortable dance attire, appropriate footwear for your dance style, a water bottle, and a towel. Some workshops may have specific requirements which will be listed in your confirmation email.",
    },
    {
      question: "Are the workshops filmed?",
      answer: "Some workshops may be filmed for promotional purposes. Participants will be notified in advance, and you'll have the option to opt out of being filmed. Personal recording is typically allowed, but this varies by instructor.",
    },
    {
      question: "Do you offer group discounts?",
      answer: "Yes! Groups of 5 or more receive a 10% discount, and groups of 10 or more receive a 15% discount. Contact us at info@windupdancetours.com to arrange group registration.",
    },
    {
      question: "How can I become an instructor with Wind Up Dance Tours?",
      answer: "We're always looking for talented choreographers! Please fill out our Talent Form with your experience, credentials, and video samples of your work. Our team reviews submissions regularly and will contact you if there's a fit.",
    },
    {
      question: "Are there age restrictions?",
      answer: "Most workshops are open to participants 16 and older. Some events may have different age requirements, which will be clearly stated in the event description. Minors must have parental consent to participate.",
    },
    {
      question: "What COVID-19 safety measures are in place?",
      answer: "We follow all local health guidelines and venue requirements. This may include capacity limits, ventilation protocols, and optional mask-wearing. Specific measures will be communicated before each event.",
    },
    {
      question: "Can I get a certificate of completion?",
      answer: "Yes! All participants who complete a workshop receive a digital certificate of completion featuring the instructor's signature and workshop details. Physical certificates can be requested for an additional fee.",
    },
    {
      question: "What if I have dietary restrictions for catered events?",
      answer: "Some of our full-day workshops include catered meals. Please indicate any dietary restrictions or allergies on your registration form, and we'll do our best to accommodate your needs.",
    },
    {
      question: "How can I stay updated on new events?",
      answer: "Subscribe to our newsletter through the Contact Us page, or follow us on Instagram, Facebook, and Twitter. We announce new events and early-bird registration opportunities through these channels first.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-purple-100">
            Find answers to common questions about our events
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors text-left"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Our team is here to help! Reach out to us and we'll get back to you as
            soon as possible.
          </p>
          <a
            href="/contact"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
