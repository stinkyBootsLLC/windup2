import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function DanceWorkshopForm() {
  const [submitted, setSubmitted] = useState(false);
  const [registrationType, setRegistrationType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl mb-4">Registration Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            You're all set! You'll receive a confirmation email shortly with workshop details,
            location information, and what to bring. We can't wait to see you dance!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Register for Another Workshop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl mb-4">Wind Up Dance Tour 2.0 Dancer Registration</h1>
          <p className="text-xl text-purple-100 mb-4">
            Register for our exclusive pole and aerial workshops
          </p>
          <div className="space-y-2 text-purple-100">
            <p><strong>Ages:</strong> 18+</p>
            <p><strong>Cost:</strong> $140 for all workshops (2 days) OR $35 each workshop</p>
            <p className="text-sm italic">*Line up subject to change*</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Non-refundable Policy */}
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-900">
                <p className="font-semibold mb-2">REFUND POLICY</p>
                <p>
                  All registrations and payments for this event are final and non-refundable. 
                  By submitting your registration, you acknowledge and agree that no refunds 
                  will be issued for any reason, including schedule changes, illness, or inability 
                  to attend. Credit or transfer of registration is not guaranteed and is granted 
                  only at the discretion of the event organizers.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dancer Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dancer Name: *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dancer Age: *
              </label>
              <input
                type="number"
                required
                min="18"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email: *
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* Registration Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are you registering with a studio or as an independent dancer? *
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="registrationType"
                    value="independent"
                    required
                    onChange={(e) => setRegistrationType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Independent</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="registrationType"
                    value="studio"
                    required
                    onChange={(e) => setRegistrationType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Dance Studio</span>
                </label>
              </div>
            </div>

            {/* Conditional Studio Name Field */}
            {registrationType === "studio" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  If with a studio; please provide the studio name:
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            )}

            {/* Pole Training Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many years of pole training do you have? *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 2 years, 6 months, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* Can You Invert */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Can you invert? *
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="canInvert"
                    value="yes"
                    required
                    className="mr-2"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="canInvert"
                    value="no"
                    required
                    className="mr-2"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact Name/Phone #: *
              </label>
              <input
                type="text"
                required
                placeholder="Name and phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* Purchase Options */}
            <div className="pt-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Purchase Options: *
              </label>
              <div className="space-y-3">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="purchaseOptions"
                    value="all-workshops"
                    className="mt-1 mr-2"
                  />
                  <div>
                    <span className="text-gray-900">All workshops - two days</span>
                    <span className="text-purple-600 ml-2 font-semibold">($140)</span>
                  </div>
                </label>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="purchaseOptions"
                    value="workshop1"
                    className="mt-1 mr-2"
                  />
                  <div>
                    <span className="text-gray-900">Workshop 1</span>
                    <span className="text-gray-500 ml-2">($35)</span>
                  </div>
                </label>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="purchaseOptions"
                    value="workshop2"
                    className="mt-1 mr-2"
                  />
                  <div>
                    <span className="text-gray-900">Workshop 2</span>
                    <span className="text-gray-500 ml-2">($35)</span>
                  </div>
                </label>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="purchaseOptions"
                    value="workshop3"
                    className="mt-1 mr-2"
                  />
                  <div>
                    <span className="text-gray-900">Workshop 3</span>
                    <span className="text-gray-500 ml-2">($35)</span>
                  </div>
                </label>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="purchaseOptions"
                    value="workshop4"
                    className="mt-1 mr-2"
                  />
                  <div>
                    <span className="text-gray-900">Workshop 4</span>
                    <span className="text-gray-500 ml-2">($35)</span>
                  </div>
                </label>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="purchaseOptions"
                    value="workshop5"
                    className="mt-1 mr-2"
                  />
                  <div>
                    <span className="text-gray-900">Workshop 5</span>
                    <span className="text-gray-500 ml-2">($35)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Agreements */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="photo-consent"
                  required
                  className="mt-1 mr-3 flex-shrink-0"
                />
                <label htmlFor="photo-consent" className="text-sm text-gray-700">
                  I give permission for Wind Up Dance Tour, LLC to photograph and/or video record me 
                  (or my child) during the event and to use these images for promotional and marketing 
                  purposes. I understand no compensation will be provided and all media becomes the 
                  property of the organization. *
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="liability-waiver"
                  required
                  className="mt-1 mr-3 flex-shrink-0"
                />
                <label htmlFor="liability-waiver" className="text-sm text-gray-700">
                  By participating in this showcase/workshop, I acknowledge that dance and physical 
                  activity involve inherent risks of injury. I voluntarily assume all such risks and 
                  agree that the organizers, venue, instructors, and staff are not liable for any 
                  injuries, accidents, or damages that may occur before, during, or after this event. 
                  I certify that I am physically able to participate and agree to follow all safety 
                  guidelines. *
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Complete Registration
              </button>
              <p className="text-sm text-gray-500 text-center mt-4">
                * Indicates required question
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}