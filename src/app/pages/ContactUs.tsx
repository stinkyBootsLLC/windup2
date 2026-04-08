import { Link } from "react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { sanitize } from "../../lib/util";

export default function ContactUs() {

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  interface ContactData {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;    // Optional
    subject: string;
    message: string;
    newsletter: number;
  }

  const validate = (data: ContactData) => {

    const newErrors: Record<string, string> = {};
    // This regex allows only letters (including accented ones for international names) 
    // and enforces a length between 2 and 100 characters.
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,100}$/;
    // Message check: Min 10, Max 255
    const messageLength = data.message.trim().length;
    // Regex for USA phone numbers
    const phoneRegex = /^(?:\+1\s?)?\(?([2-9][0-8][0-7])\)?[-.\s]?([2-9][0-8][0-7])[-.\s]?([0-9]{4})$/;
    // Email regex: ensures the string has an @ and a dot
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // First Name check
    if (!data.first_name || !nameRegex.test(data.first_name)) {
      newErrors.first_name = "First name must be 2-100 characters and contain only letters.";
    }
    // Last Name check
    if (!data.last_name || !nameRegex.test(data.last_name)) {
      newErrors.last_name = "Last name must be 2-100 characters and contain only letters.";
    }
    // Email check
    if (!emailRegex.test(data.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    // Subject check
    if (!data.subject) {
      newErrors.subject = "Please select a reason for reaching out.";
    }
    // Message check
    if (messageLength < 10 || messageLength > 255) {
      newErrors.message = "Message must be between 10 and 255 characters.";
    }
    // Only validate if a value exists (since it's optional)
    if (data.phone && data.phone.trim() !== "") {
      if (!phoneRegex.test(data.phone)) {
        newErrors.phone = "Invalid USA phone format (e.g. 555-555-5555).";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // 1. Clear any old errors

    const form = e.currentTarget;
    const formData = new FormData(form);

    // 2. Capture and Sanitize immediately
    const data: ContactData = {
      first_name: sanitize(formData.get("first_name") as string),
      last_name: sanitize(formData.get("last_name") as string),
      email: sanitize(formData.get("email") as string).toLowerCase(),
      phone: sanitize(formData.get("phone") as string),
      subject: sanitize(formData.get("subject") as string),
      message: sanitize(formData.get("message") as string),
      newsletter: formData.get("newsletter") === "on" ? 1 : 0,
    };

    // 3. Run Validation
    const validationErrors = validate(data);
    // 4. If there are errors, stop here and show them
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // 5. If valid, proceed to API call
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
        // Hide the success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error("Server rejected data");
      }
    } catch (err) {
      alert("Oops! Something went wrong on our end. Please try again later.");
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      autoComplete="given-name"
                      required
                      aria-required="true"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {/* Step 4: Display Error */}
                    {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      autoComplete="family-name"
                      required
                      aria-required="true"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    aria-required="true"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
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
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  ></textarea>
                  {/* Step 4: Message Character Counter & Error */}
                  <div className="flex justify-between mt-1">
                    {errors.message ? (
                      <p className="text-red-500 text-xs">{errors.message}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-gray-400">
                      Max 255 characters
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="newsletter"
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
