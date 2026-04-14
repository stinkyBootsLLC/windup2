import { useState } from "react";
import { Upload, CheckCircle } from "lucide-react";

export default function TalentForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl mb-4">Submission Received!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your interest in Wind Up Talent. Our team will review
          your submission and contact you within 5-7 business days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-purple-600 hover:text-purple-700 font-semibold"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Artist Submission Form</h2>
        <p className="text-gray-600">
          Tell us about yourself and your artistic journey. We're excited to learn more about you!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="talent_first_name" className="block text-sm font-medium text-gray-700 mb-2">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              id="talent_first_name"
              name="first_name"
              type="text"
              required
              aria-required="true"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label htmlFor="talent_last_name" className="block text-sm font-medium text-gray-700 mb-2">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              id="talent_last_name"
              name="last_name"
              type="text"
              required
              aria-required="true"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="stage_name" className="block text-sm font-medium text-gray-700 mb-2">
            Artist/Stage Name (if applicable)
          </label>
          <input
            id="stage_name"
            name="stage_name"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label htmlFor="talent_email" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="talent_email"
            name="email"
            type="email"
            required
            aria-required="true"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="talent_city" className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              id="talent_city"
              name="city"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label htmlFor="talent_state" className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <input
              id="talent_state"
              name="state"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="talent_phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            id="talent_phone"
            name="phone"
            type="tel"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
          />
        </div>

        {/* About Yourself */}
        <div className="pt-6 border-t border-gray-200">
          <div className="mb-6">
            <label htmlFor="about_self" className="block text-sm font-medium text-gray-700 mb-2">
              Tell us about yourself <span className="text-red-500">*</span>
            </label>
            <textarea
              id="about_self"
              name="about_self"
              required
              aria-required="true"
              rows={5}
              placeholder="Share your artistic background, experience, and what makes you unique"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">
              What are you looking for with Wind Up Talent? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="goals"
              name="goals"
              required
              aria-required="true"
              rows={4}
              placeholder="Tell us about your goals and how we can support your career"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="portfolio_links" className="block text-sm font-medium text-gray-700 mb-2">
              Website/Portfolio/Social Media Links <span className="text-red-500">*</span>
            </label>
            <textarea
              id="portfolio_links"
              name="portfolio_links"
              required
              aria-required="true"
              rows={3}
              placeholder="Include your Instagram, website, portfolio, or any other relevant links"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
            ></textarea>
          </div>
        </div>

        {/* Disciplines */}
        <div className="pt-6 border-t border-gray-200">
          <span className="block text-sm font-medium text-gray-700 mb-3" id="disciplines-label">
            Disciplines:
          </span>
          <div className="space-y-3" role="group" aria-labelledby="disciplines-label">
            {['dance', 'music-vocals', 'aerial-pole', 'acting-performance', 'other'].map((val) => (
              <label key={val} className="flex items-center cursor-pointer">
                <input
                  id={`discipline-${val}`}
                  type="checkbox"
                  name="disciplines"
                  value={val}
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">
                  {val.replace('-', '/').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* File Uploads */}
        <div className="pt-6 border-t border-gray-200">
          <div className="mb-6">
            <label htmlFor="headshot_upload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Headshot
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                id="headshot_upload"
                name="headshot"
                accept=".jpg,.jpeg,.png,.pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-600 mt-1">JPG, PNG, or PDF (Max 5MB)</p>
            </div>
          </div>

          <div>
            <label htmlFor="resume_upload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                id="resume_upload"
                name="resume"
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-600 mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all font-semibold shadow-md focus:ring-4 focus:ring-purple-300 outline-none"
          >
            Submit Application
          </button>
        </div>
      </form>

    </div>
  );
}