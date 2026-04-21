// import { useState } from "react";
// import { CheckCircle, Upload, Info } from "lucide-react";

// export default function DancerApplicationForm() {
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//     window.scrollTo(0, 0);
//   };

//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//         <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <CheckCircle className="w-10 h-10 text-green-600" />
//           </div>
//           <h2 className="text-2xl mb-4">Application Submitted!</h2>
//           <p className="text-gray-600 mb-6">
//             Thank you for your interest in the Wind Up Experience! We've received your
//             application and will review it carefully. You'll receive an email confirmation
//             shortly with next steps.
//           </p>
//           <button
//             onClick={() => setSubmitted(false)}
//             className="text-purple-600 hover:text-purple-700 font-semibold"
//           >
//             Submit Another Application
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-5xl mb-4">Dancer Application - Wind Up Experience</h1>
//           <p className="text-xl text-purple-100 mb-6">
//             Apply to perform at our showcase
//           </p>
//           {/* Event Details */}
//           <div className="bg-white/10 rounded-lg p-6 space-y-2 text-purple-100">
//             <h3 className="font-semibold text-white mb-3">EVENT DETAILS</h3>
//             <p><strong>DATE:</strong> TBD</p>
//             <p><strong>TIME:</strong> TBD</p>
//             <p><strong>LOCATION:</strong> TBD</p>
//             <p><strong>NON PROFIT</strong></p>
//             <p><strong>DANCER CALL TIME:</strong> TBD</p>
//             <p><strong>REHEARSAL TIMES:</strong> TBD</p>
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="bg-white rounded-xl shadow-md p-8">
//           {/* Google Account Notice */}
//           <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <div className="flex items-start gap-3">
//               <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//               <div className="text-sm text-blue-900">
//                 <p>
//                   The name, email address and photo associated with your Google Account will be 
//                   recorded when you upload files and submit this form.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Performer Info */}
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Performer Info:</h3>
//               <p className="text-sm text-gray-600 mb-4">Basic contact information.</p>
              
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Name or Stage Name: *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Pronouns:
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., she/her, he/him, they/them"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email & Phone #: *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     placeholder="email@example.com / (555) 123-4567"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     City/Location:
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Performance Details */}
//             <div className="pt-6 border-t border-gray-200">
//               <h3 className="text-lg font-semibold mb-2">Performance Details</h3>
//               <p className="text-sm text-gray-600 mb-4">
//                 Tell us all about your performance. If you do not have an idea yet that is OKAY! 
//                 Just briefly describe your style. (Heels, Flow, Tricks, Ballet, Hip Hop.. you name it!)
//               </p>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Type of Performance:
//                   </label>
//                   <div className="space-y-2">
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="performanceType"
//                         value="solo"
//                         className="mr-2"
//                       />
//                       <span className="text-gray-700">Solo</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="performanceType"
//                         value="group"
//                         className="mr-2"
//                       />
//                       <span className="text-gray-700">Group</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="performanceType"
//                         value="duo"
//                         className="mr-2"
//                       />
//                       <span className="text-gray-700">Duo</span>
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     What style are you performing?
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Are you pole dancing or just dancing?
//                   </label>
//                   <div className="space-y-2">
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="poleOrNot"
//                         value="pole"
//                         className="mr-2"
//                       />
//                       <span className="text-gray-700">Pole</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="poleOrNot"
//                         value="combo"
//                         className="mr-2"
//                       />
//                       <span className="text-gray-700">Combo</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="poleOrNot"
//                         value="non-pole"
//                         className="mr-2"
//                       />
//                       <span className="text-gray-700">Non-Pole</span>
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     If using the pole, what techniques will you use? Static, Spin, Floorwork, All the above. Type below:
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Other:
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Describe the concept or story of your piece:
//                   </label>
//                   <textarea
//                     rows={4}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   ></textarea>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Do you have a song chosen? If so, please share:
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     How does your performance reflect your identity or cultural background (if applicable)?
//                   </label>
//                   <textarea
//                     rows={3}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   ></textarea>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Are there any special props, costume themes, or tech elements required?
//                   </label>
//                   <textarea
//                     rows={3}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   ></textarea>
//                 </div>
//               </div>
//             </div>

//             {/* Logistics */}
//             <div className="pt-6 border-t border-gray-200">
//               <h3 className="text-lg font-semibold mb-2">Logistics</h3>
//               <p className="text-sm text-gray-600 mb-4">Technical aspects of your performance.</p>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Length of performance?
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., 3 minutes"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Do you need assistance with your costume or props or any element on stage during the performance?
//                   </label>
//                   <div className="space-y-2">
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="needAssistance"
//                         value="yes"
//                         className="mr-2"
//                       />
//                       <span className="text-gray-700">Yes</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="needAssistance"
//                         value="no"
//                         className="mr-2"
//                       />
//                       <span className="text-gray-700">No</span>
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Do you give us permission to use your photograph leading up to the showcase and/or record the performance?
//                   </label>
//                   <div className="space-y-2">
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="photoPermission"
//                         value="yes"
//                         className="mr-2"
//                       />
//                       <span className="text-gray-700">Yes</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="photoPermission"
//                         value="no"
//                         className="mr-2"
//                       />
//                       <span className="text-gray-700">No</span>
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Upload any reference videos, photos, music files, or sketches.
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
//                     <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                     <p className="text-sm text-gray-600">
//                       Click to upload or drag and drop
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Upload up to 5 supported files. Max 10 MB per file.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Emergency Contact & Waiver */}
//             <div className="pt-6 border-t border-gray-200 space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Emergency Contact Name and #: *
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="Name and phone number"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                 />
//               </div>

//               <div className="flex items-start">
//                 <input
//                   type="checkbox"
//                   id="liability-waiver"
//                   required
//                   className="mt-1 mr-3 flex-shrink-0"
//                 />
//                 <label htmlFor="liability-waiver" className="text-sm text-gray-700">
//                   By participating in this showcase/workshop, I acknowledge that dance and physical 
//                   activity involve inherent risks of injury. I voluntarily assume all such risks and 
//                   agree that the organizers, venue, instructors, and staff are not liable for any 
//                   injuries, accidents, or damages that may occur before, during, or after this event. 
//                   I certify that I am physically able to participate and agree to follow all safety 
//                   guidelines. *
//                 </label>
//               </div>
//             </div>

//             {/* Submit */}
//             <div className="pt-6">
//               <button
//                 type="submit"
//                 className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
//               >
//                 Submit Application
//               </button>
//               <p className="text-sm text-gray-500 text-center mt-4">
//                 * Indicates required question
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }