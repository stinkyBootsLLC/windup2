import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import TalentForm from "./TalentForm";

export default function Talent() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl mb-4">Wind Up Talent</h1>
          <p className="text-xl text-purple-100">
            Empowering artists, performers, and creatives in today's evolving entertainment landscape
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl mb-6 text-center">About Wind Up Talent</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                Wind Up Talent is a creative booking and consulting division founded by Annabella, 
                dedicated to empowering artists, performers, and creatives in today's evolving 
                entertainment landscape. Based in Nashville, Tennessee, Wind Up Talent offers 
                personalized artist booking, management, and talent coordination services — guiding 
                artists through career development, event partnerships, and strategic branding.
              </p>
              <p>
                With a foundation in live entertainment and years of experience producing high-profile 
                events, Wind Up Talent is committed to fostering authentic connections between artists, 
                audiences, and industry professionals. Whether representing dancers, musicians, or 
                multi-disciplinary performers, Wind Up Talent provides the structure, vision, and 
                support needed to elevate your creative potential.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 md:p-12 text-white mb-12 text-center">
          <h2 className="text-3xl mb-4">Artist Submistion Form</h2>
          <p className="text-lg mb-6">Whether you’re a dancer, aerialist, musician, or multi-disciplinary performer, Wind Up Talent is here to help you grow, connect, and shine.
            Fill out the form below to tell us more about you, your artistry, and what you’re looking for.</p>
        </div>

        {/* Application Form Section */}
        <div id="application-form">
          <TalentForm />
        </div>
      </div>
    </div>
  );
}