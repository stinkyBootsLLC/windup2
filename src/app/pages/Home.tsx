import { Link } from "react-router";
import { Calendar, Users, Star, ArrowRight, Quote } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Home() {
  // const features = [
  //   {
  //     icon: Calendar,
  //     title: "Exclusive Events",
  //     description: "Join our carefully curated dance events featuring world-class choreographers",
  //   },
  //   {
  //     icon: Users,
  //     title: "Expert Instructors",
  //     description: "Learn from renowned choreographers who have worked with top artists globally",
  //   },
  //   {
  //     icon: Star,
  //     title: "Premium Experience",
  //     description: "Immersive workshops designed to elevate your dance skills to the next level",
  //   },
  // ];

  // const upcomingEvents = [
  //   {
  //     id: 1,
  //     title: "Contemporary Fusion Workshop",
  //     date: "May 15, 2026",
  //     instructor: "Maria Rodriguez",
  //     location: "Los Angeles, CA",
  //   },
  //   {
  //     id: 2,
  //     title: "Hip-Hop Intensive",
  //     date: "June 2, 2026",
  //     instructor: "Jordan Smith",
  //     location: "New York, NY",
  //   },
  //   {
  //     id: 3,
  //     title: "Jazz & Broadway Masterclass",
  //     date: "June 20, 2026",
  //     instructor: "Taylor Chen",
  //     location: "Chicago, IL",
  //   },
  // ];

  const reviews = [
    {
      name: "Sarah Mitchell",
      location: "Los Angeles, CA",
      rating: 5,
      text: "Wind Up Dance Tour changed my life! Learning from choreographers who've worked with Beyoncé and other major artists was absolutely incredible. The energy, the technique, and the connections I made were priceless.",
      date: "March 2026",
    },
    {
      name: "Marcus Johnson",
      location: "New York, NY",
      rating: 5,
      text: "I've attended dance workshops all over the country, but nothing compares to Wind Up. The instructors are phenomenal, and the organization is flawless. Can't wait for the next one!",
      date: "February 2026",
    },
    {
      name: "Emily Chen",
      location: "Chicago, IL",
      rating: 5,
      text: "As an aspiring professional dancer, these workshops gave me the skills and confidence I needed. The choreographers don't just teach moves—they share their journey and inspire you to chase your dreams.",
      date: "January 2026",
    },
    {
      name: "Alex Rivera",
      location: "Nashville, TN",
      rating: 5,
      text: "The pole and aerial workshops in Wind Up 2.0 are amazing! It's so refreshing to see diverse movement styles celebrated. Annabella and her team created such an inclusive, empowering space.",
      date: "April 2026",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90 z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1765278624799-9c90305b0b7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZXJzJTIwcGVyZm9ybWluZyUyMGNvbnRlbXBvcmFyeSUyMGRhbmNlfGVufDF8fHx8MTc3NTMzNzA0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Dancers performing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl mb-6">
            WindUp Dance Tours
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Join exclusive workshops with world-renowned choreographers and elevate your dance journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              View Events
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Moments That Moved Us</h2>
            <p className="text-gray-600 text-lg">
              Hear from dancers who've experienced Wind Up Dance Tours
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow relative"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-purple-100" />
                <div className="flex mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{review.text}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-gray-900">{review.name}</p>
                    <p className="text-gray-500 text-sm">{review.location}</p>
                  </div>
                  <p className="text-gray-400 text-sm">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Apply today and join thousands of dancers who have transformed their skills
          </p>
          <Link
            to="/dancer-application"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Submit Your Application
          </Link>
        </div>
      </section>
    </div>
  );
}