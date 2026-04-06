import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

export default function FAQ() {
  // Use a string ID (e.g., "section-index") to track which specific FAQ is open
  const [openId, setOpenId] = useState<string | null>(null);

  const faqData: FAQSection[] = [
    {
      title: "REGISTRATION & PAYMENT POLICIES",
      items: [
        {
          question: "When do we need to register?",
          answer: "Registration will be open until the event is sold out. A lot of these workshops and events will have LIMITED capacity so it is encouraged to register as early as possible to claim your spot.",
        },
        {
          question: "When is payment due?",
          answer: "Upon registration, you will be taken to the payment page to confirm your spot.",
        },
        {
          question: "Do you accept group registrations?",
          answer: (
            <span>
              Yes we do! Have your studio reach out to{" "}
              <a href="mailto:windupdancetour@gmail.com" className="text-purple-600 hover:underline">
                windupdancetour@gmail.com
              </a>{" "}
              to obtain your code for studio group registration.
            </span>
          ),
        },
        {
          question: "Will I get a confirmation?",
          answer: "Yes, once payment is complete, your account holder will receive a confirmation email. Registrations without payment are not confirmed and may be removed.",
        },
        {
          question: "Can I register at the event?",
          answer: "On-site registration is allowed only if space permits. Events may sell out — we strongly recommend registering early.",
        },
      ],
    },
    {
      title: "REFUND & CREDIT POLICIES",
      items: [
        {
          question: "Do you offer refunds?",
          answer: "WIND UP DANCE TOUR, LLC does not offer refunds, transfers, or exchanges for registration fees, except in the case of full event cancellation.",
        },
      ],
    },
    {
      title: "OBSERVATION POLICIES",
      items: [
        {
          question: "Can parents observe classes?",
          answer: "To ensure the best learning environment, parent/guardian observation is not permitted inside the workshop or studio room (except approved studio directors/teachers). Observer bands are not sold.",
        },
        {
          question: "Are showcases open to the public?",
          answer: "Yes! Our showcase and closing awards are open for friends & family to attend. Select programming may also be streamed online.",
        },
      ],
    },
    {
      title: "Check-In & Wristbands",
      items: [
        {
          question: "What are the entry requirements?",
          answer: (
            <ul className="list-disc ml-5 space-y-1">
              <li>All dancers must have a signed waiver before receiving credentials.</li>
              <li>Wristbands must be worn at all times — no band = no entry.</li>
              <li>Wristbands may not be shared or transferred.</li>
            </ul>
          ),
        },
      ],
    },
    {
      title: "VIDEO & PHOTO POLICY",
      items: [
        {
          question: "Can I film during classes?",
          answer: "Filming or recording during classes is not permitted. If the instructor gives an OK to record during class there will be a designated time to do so. (Wind Up 2.0)",
        },
        {
          question: "How is official media handled?",
          answer: "Official media teams may capture event footage. By registering, you grant WIND UP DANCE TOUR permission to use images/videos from the event.",
        },
      ],
    },
    {
      title: "CODE OF CONDUCT & LIABILITY",
      items: [
        {
          question: "What is the conduct policy?",
          answer: "WIND UP DANCE TOUR reserves the right to refuse entry or remove any attendee behaving disruptively or unsafely.",
        },
        {
          question: "What is the liability policy?",
          answer: "Staff, instructors, and affiliates are not responsible for injuries, lost items, or property damage. Participation is voluntary and at your own risk.",
        },
      ],
    },
  ];

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-purple-100">
            Everything you need to know about WindUp Dance Tours.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-purple-200">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => {
                  const id = `${sectionIndex}-${itemIndex}`;
                  const isOpen = openId === id;
                  
                  return (
                    <div
                      key={id}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(id)}
                        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div 
                        className={`transition-all duration-200 ease-in-out overflow-hidden ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-4 text-gray-600 border-t border-gray-50 pt-3">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
          <link
            href="/contact"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Contact Us
          </link>
        </div>
      </div>
    </div>
  );
}


