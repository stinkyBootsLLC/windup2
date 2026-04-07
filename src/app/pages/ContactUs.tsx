import { Link } from "react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function ContactUs() {

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    // 1. Grab the data from the form
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      newsletter: formData.get("newsletter") === "on" ? 1 : 0, // Convert checkbox to 1 or 0
    };
    // 2. Send it to your Vercel API
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Thanks! Your message has been saved.");
        form.reset();// Clear the form
      } else {
        throw new Error("Failed to send");
      }
    } catch (err) {
      alert("Oops! Something went wrong on our end.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl mb-4">Contact Us</h1>
          <p className="text-xl text-purple-100">
            We'd love to hear from you! Get in touch with our team
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl mb-6">Get In Touch</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:info@windupdancetours.com"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                       windupdancetour@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl mb-6">Send Us a Message</h2>

              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">Message sent successfully!</p>
                    <p className="text-sm text-green-700">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {/* <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      name="first_name" // Added
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      name="last_name" // Added
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      name="email" // Added
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone" // Added
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject" // Added
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="event">Event Information</option>
                    <option value="registration">Registration Question</option>
                    <option value="instructor">Instructor Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message" // Added
                    required
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    name="newsletter" // Added
                    type="checkbox"
                    id="newsletter"
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    I'd like to receive updates about upcoming events and workshops
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  Send Message
                </button>
              </form> */}
<form onSubmit={handleSubmit} className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
        First Name *
      </label>
      <input
        id="first_name" // Link to label
        name="first_name"
        type="text"
        autoComplete="given-name"
        required
        aria-required="true"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
      />
    </div>
    <div>
      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
        Last Name *
      </label>
      <input
        id="last_name" // Link to label
        name="last_name"
        type="text"
        autoComplete="family-name"
        required
        aria-required="true"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
        Email *
      </label>
      <input
        id="email" // Link to label
        name="email"
        type="email"
        autoComplete="email"
        required
        aria-required="true"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
      />
    </div>
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
        Phone Number
      </label>
      <input
        id="phone" // Link to label
        name="phone"
        type="tel"
        autoComplete="tel"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
      />
    </div>
  </div>

  <div>
    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
      Subject *
    </label>
    <select
      id="subject" // Link to label
      name="subject"
      required
      aria-required="true"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
    >
      <option value="">Select a subject</option>
      <option value="general">General Inquiry</option>
      <option value="event">Event Information</option>
      <option value="registration">Registration Question</option>
      <option value="instructor">Instructor Inquiry</option>
      <option value="partnership">Partnership Opportunity</option>
      <option value="feedback">Feedback</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div>
    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
      Message *
    </label>
    <textarea
      id="message" // Link to label
      name="message"
      required
      aria-required="true"
      rows={6}
      placeholder="Tell us how we can help you..."
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
    ></textarea>
  </div>

  <div className="flex items-center">
    <input
      id="newsletter" // Already had htmlFor connection, but added name
      name="newsletter"
      type="checkbox"
      className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
    />
    <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
      I'd like to receive updates about upcoming events and workshops
    </label>
  </div>

  <button
    type="submit"
    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition-all font-semibold outline-none"
  >
    Send Message
  </button>
</form>







            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl mb-4">Looking for Quick Answers?</h2>
          <p className="text-gray-600 mb-6">
            Check out our FAQ page for answers to commonly asked questions
          </p>
          <Link
            to="/faq"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            View FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
