import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

import { sanitize } from "../../lib/util";
import { Validator } from "../../lib/util";

export default function DanceWorkshopForm() {

  const [registrationType, setRegistrationType] = useState("");
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedWorkshops, setSelectedWorkshops] = useState<string[]>([]);

  const handleWorkshopChange = (id: string) => {
    setSelectedWorkshops((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        // Logic: If selecting 'all-workshops', clear everything else.
        // If selecting a specific workshop, ensure 'all-workshops' isn't active.
        if (id === 'all-workshops') return ['all-workshops'];
        return [...prev.filter(item => item !== 'all-workshops'), id];
      }
    });
  };

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};

    // Extract and sanitize values for validation
    const first_name = sanitize(formData.get("first_name") as string);
    const last_name = sanitize(formData.get("last_name") as string);
    const email = sanitize(formData.get("email") as string);
    const pole_training = sanitize(formData.get("pole_training") as string);
    const trainingValue = parseInt(pole_training, 10);
    const emergency = sanitize(formData.get("emergency_contact") as string);

    // Run Validator checks
    if (!Validator.isValidName(first_name)) newErrors.first_name = "First name required (letters only).";
    if (!Validator.isValidName(last_name)) newErrors.last_name = "Last name required (letters only).";
    if (!Validator.isValidEmail(email)) newErrors.email = "Please enter a valid email address.";

    if (isNaN(trainingValue) || trainingValue < 0) {
      newErrors.pole_training = "Please enter a valid number of years.";
    }



    if (!Validator.isValidText(emergency, 5, 200)) {
      newErrors.emergency_contact = "Please provide a name and contact number.";
    }

    // Checkbox validation (Ensure at least one workshop is selected)
    const options = formData.getAll("purchaseOptions");
    if (options.length === 0) {
      newErrors.purchaseOptions = "Please select at least one workshop option.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Clear old errors

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Run Validation
    const vErrors = validateForm(formData);
    if (Object.keys(vErrors).length > 0) {
      setErrors(vErrors);
      // Scroll to the first error or top of form
      window.scrollTo({ top: 400, behavior: 'smooth' });
      return;
    }

    setStatus('submitting');

    try {

      const formData = new FormData(form);

      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {

        form.reset();
        setRegistrationType("");
        setStatus('success');
        window.scrollTo(0, 0);


      } else {
        throw new Error("Dancer workshop form Submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting registration.");
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your information has been securely sent to our database.
            Check your email for workshop details and location info!
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Register Another Performer
          </button>
        </div>
      </div>
    );
  }

  const totalCost = selectedWorkshops.reduce((acc, workshopId) => {
    if (workshopId === 'all-workshops') return 140;
    return acc + 35;
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl mb-4">Event Registration</h1>
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

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Dancer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500 ml-1" aria-hidden="true">*</span>
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-colors ${errors.first_name ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-purple-600'
                    }`}
                />
                {errors.first_name && <p className="text-red-600 text-xs mt-1">{errors.first_name}</p>}
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500 ml-1" aria-hidden="true">*</span>
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-colors ${errors.last_name ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-purple-600'
                    }`}
                />
                {errors.last_name && <p className="text-red-600 text-xs mt-1">{errors.last_name}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="dancer_age" className="block text-sm font-medium text-gray-700 mb-2">
                Age <span className="text-red-500 ml-1" aria-hidden="true">*</span>
              </label>
              <input
                id="dancer_age"
                name="dancer_age"
                type="number"
                required
                min="18"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-colors ${errors.dancer_age ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-purple-600'
                  }`}
              />
              {errors.dancer_age && <p className="text-red-600 text-xs mt-1">{errors.dancer_age}</p>}
            </div>

            <div>
              <label htmlFor="dancer_email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500 ml-1" aria-hidden="true">*</span>
              </label>
              <input
                id="dancer_email"
                name="email"
                type="email"
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-purple-600'
                  }`}
              />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Registration Type */}
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                Are you registering with a studio or as an independent dancer? <span className="text-red-500 ml-1" aria-hidden="true">*</span>
              </legend>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="registrationType"
                    value="independent"
                    onChange={(e) => setRegistrationType(e.target.value)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-700">Independent</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="registrationType"
                    value="studio"
                    onChange={(e) => setRegistrationType(e.target.value)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-700">Dance Studio</span>
                </label>
              </div>
              {errors.registrationType && <p className="text-red-600 text-xs mt-1">{errors.registrationType}</p>}
            </fieldset>

            {/* Conditional Studio Name Field */}
            {registrationType === "studio" && (
              <div className="animate-in fade-in slide-in-from-top-1">
                <label htmlFor="studio_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Please provide the studio name:
                </label>
                <input
                  id="studio_name"
                  name="studio_name"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                />
              </div>
            )}

            {/* Pole Training Experience */}
            <div>
              <label htmlFor="pole_training" className="block text-sm font-medium text-gray-700 mb-2">
                Years of Pole Training <span className="text-red-500 ml-1" aria-hidden="true">*</span>
              </label>
              <input
                id="pole_training"
                name="pole_training"
                type="number"
                inputMode="numeric"
                min="0"
                max="50"
                required
                placeholder="0"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-colors ${errors.pole_training ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-purple-600'
                  }`}
              />
              {errors.pole_training && <p className="text-red-600 text-xs mt-1">{errors.pole_training}</p>}
            </div>

            {/* Can You Invert */}
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                Can you invert? <span className="text-red-500 ml-1" aria-hidden="true">*</span>
              </legend>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="canInvert"
                    value="yes"
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="canInvert"
                    value="no"
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
              {errors.canInvert && <p className="text-red-600 text-xs mt-1">{errors.canInvert}</p>}
            </fieldset>

            {/* Emergency Contact */}
            <div>
              <label htmlFor="emergency_contact" className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact Name/Phone: <span className="text-red-500 ml-1" aria-hidden="true">*</span>
              </label>
              <input
                id="emergency_contact"
                name="emergency_contact"
                type="text"
                required
                placeholder="Name and phone number"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-colors ${errors.emergency_contact ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-purple-600'
                  }`}
              />
              {errors.emergency_contact && <p className="text-red-600 text-xs mt-1">{errors.emergency_contact}</p>}
            </div>

            {/* Purchase Options */}
            <fieldset className="pt-6 border-t border-gray-200">
              <legend className="block text-sm font-medium text-gray-700 mb-3">
                Purchase Options <span className="text-red-500 ml-1" aria-hidden="true">*</span>
              </legend>
              {errors.purchaseOptions && <p className="text-red-600 text-xs mb-3">{errors.purchaseOptions}</p>}

              <div className="space-y-3">
                {[
                  { id: 'all-workshops', label: 'All workshops - two days', price: '$140', highlight: true },
                  { id: 'ws1', label: 'Workshop 1', price: '$35' },
                  { id: 'ws2', label: 'Workshop 2', price: '$35' },
                  { id: 'ws3', label: 'Workshop 3', price: '$35' },
                  { id: 'ws4', label: 'Workshop 4', price: '$35' },
                  { id: 'ws5', label: 'Workshop 5', price: '$35' },
                ].map((opt) => {
                  // Logic: Disable individual workshops if "All" is selected
                  // Logic: Disable "All" if any individual workshop is selected
                  const isAllSelected = selectedWorkshops.includes('all-workshops');
                  const isIndivSelected = selectedWorkshops.length > 0 && !isAllSelected;

                  const isDisabled =
                    (opt.id !== 'all-workshops' && isAllSelected) ||
                    (opt.id === 'all-workshops' && isIndivSelected);

                  return (
                    <label
                      key={opt.id}
                      className={`flex items-start cursor-pointer group ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <input
                        id={opt.id}
                        type="checkbox"
                        name="purchaseOptions"
                        value={opt.id}
                        checked={selectedWorkshops.includes(opt.id)}
                        disabled={isDisabled}
                        onChange={() => handleWorkshopChange(opt.id)}
                        className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 disabled:bg-gray-200"
                      />
                      <div className="ml-3">
                        <span className={`transition-colors ${isDisabled ? 'text-gray-400' : 'text-gray-900 group-hover:text-purple-600'}`}>
                          {opt.label}
                        </span>
                        <span className={`ml-2 font-semibold ${isDisabled ? 'text-gray-400' : opt.highlight ? 'text-purple-600' : 'text-gray-500'}`}>
                          ({opt.price})
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Total Cost Display */}
            <div className="mt-4 p-4 bg-purple-50 border border-purple-100 rounded-lg flex justify-between items-center animate-in fade-in slide-in-from-bottom-2">
              <div>
                <p className="text-sm text-purple-700 font-medium">Estimated Total</p>
                <p className="text-xs text-purple-700 italic">
                  {selectedWorkshops.length === 0
                    ? "No workshops selected"
                    : `${selectedWorkshops.length} item(s) selected`}
                </p>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                ${totalCost}
              </div>
            </div>
            {/* Agreements */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex flex-col">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="photo-consent"
                    name="photoConsent"
                    required
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded"
                  />
                  <label htmlFor="photo-consent" className="ml-3 text-sm text-gray-700 cursor-pointer">
                    I give permission for Wind Up Dance Tour, LLC to photograph/video record me during the event for marketing purposes. <span className="text-red-500 ml-1" aria-hidden="true">*</span>
                  </label>
                </div>
                {errors.photoConsent && <p className="text-red-600 text-xs mt-1 ml-7">{errors.photoConsent}</p>}
              </div>

              <div className="flex flex-col">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="liability-waiver"
                    name="liabilityWaiver"
                    required
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded"
                  />
                  <label htmlFor="liability-waiver" className="ml-3 text-sm text-gray-700 cursor-pointer">
                    I assume all risks of injury and agree that staff and venue are not liable for any accidents. <span className="text-red-500 ml-1" aria-hidden="true">*</span>
                  </label>
                </div>
                {errors.liabilityWaiver && <p className="text-red-600 text-xs mt-1 ml-7">{errors.liabilityWaiver}</p>}
              </div>
            </div>

            {/* Submit Button with Loading State */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full py-4 rounded-lg font-bold shadow-lg transition-all outline-none flex items-center justify-center space-x-2 ${status === 'submitting'
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 active:scale-95'
                  } text-white`}
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing Registration...</span>
                  </>
                ) : (
                  <span>Complete Registration</span>
                )}
              </button>
              <p className="text-sm text-gray-500 text-center mt-4">
                <span className="text-red-500 ml-1" aria-hidden="true">*</span> Indicates required
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}