import { useState } from "react";
import { Upload, CheckCircle } from "lucide-react";
import { sanitize, Validator } from "../../lib/util";

interface TalentData {
  first_name: string;
  last_name: string;
  stage_name?: string;
  email: string;
  city?: string;
  state?: string;
  phone?: string;
  about_self: string;
  goals: string;
  portfolio_links: string;
  disciplines: string[];
}

export default function TalentForm() {

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileNames, setFileNames] = useState<{ headshot?: string; resume?: string }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFileNames((prev) => ({
        ...prev,
        [name]: files[0].name,
      }));
    }
  };

  const validateTalentForm = (data: TalentData) => {
    const newErrors: Record<string, string> = {};
    // Names & Email
    if (!Validator.isValidName(data.first_name)) newErrors.first_name = "Required (2-100 letters).";
    if (!Validator.isValidName(data.last_name)) newErrors.last_name = "Required (2-100 letters).";
    if (!Validator.isValidEmail(data.email)) newErrors.email = "Valid email required.";
    // Text blocks
    if (!Validator.isValidText(data.about_self, 20, 1000)) newErrors.about_self = "Provide 20-1000 characters.";
    if (!Validator.isValidText(data.goals, 20, 1000)) newErrors.goals = "Provide 20-1000 characters.";

    if (!data.portfolio_links || data.portfolio_links.length < 5) {
      newErrors.portfolio_links = "Provide portfolio or social links.";
    }
    // City, State, Phone (Optional)
    if (data.city && !Validator.isValidName(data.city)) newErrors.city = "Invalid city format.";
    if (data.state && !Validator.isValidName(data.state)) newErrors.state = "Invalid state format.";
    if (!Validator.isValidPhone(data.phone)) newErrors.phone = "Invalid USA phone format.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: TalentData = {
      first_name: sanitize(formData.get("first_name") as string),
      last_name: sanitize(formData.get("last_name") as string),
      stage_name: sanitize(formData.get("stage_name") as string),
      email: sanitize(formData.get("email") as string).toLowerCase(),
      city: sanitize(formData.get("city") as string),
      state: sanitize(formData.get("state") as string),
      phone: sanitize(formData.get("phone") as string),
      about_self: sanitize(formData.get("about_self") as string),
      goals: sanitize(formData.get("goals") as string),
      portfolio_links: sanitize(formData.get("portfolio_links") as string),
      disciplines: formData.getAll("disciplines") as string[],
    };

    const vErrors = validateTalentForm(data);

    if (Object.keys(vErrors).length > 0) {
      setErrors(vErrors);
      return;
    }

    setIsSubmitting(true); // START LOADING

    try {
      const response = await fetch("/api/talent", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        setFileNames({});
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      alert("There was an error submitting your application.");
    } finally { setIsSubmitting(false); }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl mb-4 font-bold">Submission Received!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your interest in Wind Up Talent. Our team will review
          your submission and contact you within 5-7 business days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-purple-600 hover:text-purple-700 font-semibold underline"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Names */}
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
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-colors ${errors.first_name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            />
            {errors.first_name && <p className="text-red-600 text-xs mt-1">{errors.first_name}</p>}
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
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-colors ${errors.last_name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            />
            {errors.last_name && <p className="text-red-600 text-xs mt-1">{errors.last_name}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="stage_name" className="block text-sm font-medium text-gray-700 mb-2">
            Artist/Stage Name (if applicable)
          </label>
          <input id="stage_name" name="stage_name" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none" />
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
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Location & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="talent_city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input id="talent_city" name="city" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none" />
            {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="talent_state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input id="talent_state" name="state" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none" />
            {errors.state && <p className="text-red-600 text-xs mt-1">{errors.state}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="talent_phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input id="talent_phone" name="phone" type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none" />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Text Areas */}
        <div className="pt-6 border-t border-gray-200">
          <div className="mb-6">
            <label htmlFor="about_self" className="block text-sm font-medium text-gray-700 mb-2">
              Tell us about yourself <span className="text-red-500">*</span>
            </label>
            <textarea
              id="about_self"
              name="about_self"
              required
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-colors ${errors.about_self ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            ></textarea>
            <div className="flex justify-between mt-1">
              {errors.about_self ? <p className="text-red-600 text-xs">{errors.about_self}</p> : <span />}
              <span className="text-xs text-gray-600">Min 20 characters</span>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">
              What are you looking for with Wind Up Talent? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="goals"
              name="goals"
              required
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-colors ${errors.goals ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            ></textarea>
            <div className="flex justify-between mt-1">
              {errors.goals ? <p className="text-red-600 text-xs">{errors.goals}</p> : <span />}
              <span className="text-xs text-gray-600">Min 20 characters</span>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="portfolio_links" className="block text-sm font-medium text-gray-700 mb-2">
              Website/Portfolio/Social Media Links <span className="text-red-500">*</span>
            </label>
            <textarea
              id="portfolio_links"
              name="portfolio_links"
              required
              rows={3}
              placeholder="Instagram, website, or other links"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-colors ${errors.portfolio_links ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            ></textarea>
            {errors.portfolio_links && <p className="text-red-600 text-xs mt-1">{errors.portfolio_links}</p>}
          </div>
        </div>

        {/* Disciplines Checkboxes */}
        <div className="pt-6 border-t border-gray-200">
          <span className="block text-sm font-medium text-gray-700 mb-3" id="disciplines-label">Disciplines:</span>
          <div className="space-y-3" role="group" aria-labelledby="disciplines-label">
            {['dance', 'music-vocals', 'aerial-pole', 'acting-performance'].map((val) => (
              <label key={val} className="flex items-center cursor-pointer group">
                <input
                  id={`discipline-${val}`}
                  type="checkbox"
                  name="disciplines"
                  value={val}
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700 group-hover:text-purple-600 transition-colors">
                  {val.replace('-', '/').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* File Uploads */}
        <div className="pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="headshot_upload" className="block text-sm font-medium text-gray-700 mb-2">Upload Headshot</label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <input type="file" id="headshot_upload" name="headshot"
                accept=".jpg,.jpeg,.png,.pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />

              <Upload className={`w-8 h-8 mx-auto mb-2 ${fileNames.headshot ? 'text-green-600' : 'text-gray-600'}`} />

              {/* Dynamic Text Display */}
              {fileNames.headshot ? (
                <p className="text-sm font-semibold text-green-700">{fileNames.headshot}</p>
              ) : (
                <p className="text-xs text-gray-600">JPG, PNG, or PDF (Max 5MB)</p>
              )}

            </div>
          </div>
          {/* Resume Upload */}
          <div>
            <label htmlFor="resume_upload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume
            </label>
            <div className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${fileNames.resume ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-purple-400'}`}>
              <input
                type="file"
                id="resume_upload"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className={`w-8 h-8 mx-auto mb-2 ${fileNames.resume ? 'text-green-600' : 'text-gray-600'}`} />

              {/* Dynamic Text Display */}
              {fileNames.resume ? (
                <p className="text-sm font-semibold text-green-700">{fileNames.resume}</p>
              ) : (
                <p className="text-xs text-gray-600">PDF, DOC, or DOCX (Max 5MB)</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-lg font-bold shadow-lg transition-all outline-none flex items-center justify-center space-x-2 ${isSubmitting
              ? 'bg-purple-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 active:scale-95'
            } text-white`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing Application...</span>
            </>
          ) : (
            <span>Submit Application</span>
          )}
        </button>
      </form>
    </div>
  );
}