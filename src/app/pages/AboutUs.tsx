import { Target, Heart, Users, Globe, ExternalLink } from "lucide-react";

export default function AboutUs() {
  const pressLinks = [
    {
      title: "Meet Annabella Estrada of Wind Up Dance Tour",
      url: "https://voyagela.com/interview/meet-annabella-estrada-wind-dance-tour/",
    },
    {
      title: "Enter The Entrepreneur with Annabella Estrada",
      url: "https://eightbykate.buzzsprout.com/947788/episodes/8009541-enter-the-entrepreneur-with-annabella-estrada-of-wind-up-dance-tour",
    },
    {
      title: "Olivia Rush: Turning tragedy into triumph",
      url: "https://www.danceinforma.com/2018/11/01/olivia-rush-turning-tragedy-into-triumph/",
    },
    {
      title: "Today's Photo Journal: November 14, 2016",
      url: "https://www.mcall.com/2016/11/13/todays-photo-journal-november-14-2016/",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl mb-4">About Us</h1>
          <p className="text-xl text-purple-100">
            Connecting dancers with world-renowned choreographers since 2016
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* The Vision Behind Wind Up Dance Tour */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl mb-8 text-center">The Vision Behind Wind Up Dance Tour</h2>
          
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Annabella is a dynamic producer and creative entrepreneur with a deep passion for live entertainment, 
              dance, and artistic collaboration. Her journey began at a young age during the Sundance Film Festival 
              in Park City, Utah, where she served as an assistant producer for major live events including the 
              Social Film Loft (2014) and the EMERGE Bang & Olufsen House (2015). Through these experiences, 
              Annabella honed her expertise in event production, talent relations, and brand partnerships, working 
              alongside renowned artists and media figures such as Michael C. Hall, Lindsay Lohan, and Elijah Wood. 
              Her early success also led her to contribute to high-profile events in Los Angeles including the 
              Oscars, MTV Music Awards, and America's Best Dance Crew.
            </p>
            
            <p>
              In 2016, driven by her entrepreneurial spirit and love for dance, Annabella founded Wind Up Dance 
              Tour, LLC, an innovative all-day dance intensive celebrating diverse cultural and foundational dance 
              styles. The tour began in Pennsylvania and quickly expanded to Los Angeles, earning a five-star 
              reputation for its commitment to artistic excellence, education, and community. After years of growth 
              and creative evolution, Annabella is proud to reintroduce Wind Up Dance Tour 2.0 — an expanded 
              experience that now includes workshops for aerialists and pole dancers. This new chapter reflects 
              her continued exploration of movement and her dedication to building inclusive spaces for artists 
              to connect, learn, and thrive.
            </p>
            
            <p>
              Furthering her mission to support performers beyond the stage, Annabella has launched Wind Up 
              Talent, a division focused on artist booking, management, and creative consulting. Based in 
              Nashville, Tennessee, Wind Up Talent helps emerging artists develop their careers through 
              professional coordination, strategic partnerships, and personalized guidance.
            </p>
          </div>
        </div>

        {/* Press Coverage */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl mb-8 text-center">Press Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pressLinks.map((press, index) => (
              <a
                key={index}
                href={press.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow group"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg text-gray-800 group-hover:text-purple-600 transition-colors pr-2">
                    {press.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}