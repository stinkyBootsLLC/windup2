import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Contemporary Fusion Workshop",
      date: "May 15, 2026",
      time: "10:00 AM - 4:00 PM",
      location: "Los Angeles, CA",
      instructor: "Maria Rodriguez",
      level: "Intermediate to Advanced",
      price: "$150",
      description: "Explore the boundaries of contemporary dance with fusion techniques that blend multiple styles.",
      image: "https://images.unsplash.com/photo-1765278624799-9c90305b0b7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZXJzJTIwcGVyZm9ybWluZyUyMGNvbnRlbXBvcmFyeSUyMGRhbmNlfGVufDF8fHx8MTc3NTMzNzA0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      title: "Hip-Hop Intensive",
      date: "June 2, 2026",
      time: "1:00 PM - 6:00 PM",
      location: "New York, NY",
      instructor: "Jordan Smith",
      level: "All Levels",
      price: "$175",
      description: "Master the fundamentals and advanced techniques of hip-hop with one of the industry's top choreographers.",
      image: "https://images.unsplash.com/photo-1758526387662-fd64a2b85051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHN0dWRpbyUyMGNsYXNzJTIwY2hvcmVvZ3JhcGh5fGVufDF8fHx8MTc3NTMzNzA0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      title: "Jazz & Broadway Masterclass",
      date: "June 20, 2026",
      time: "11:00 AM - 5:00 PM",
      location: "Chicago, IL",
      instructor: "Taylor Chen",
      level: "Intermediate",
      price: "$160",
      description: "Dive into the world of Broadway jazz and learn choreography from hit musicals.",
      image: "https://images.unsplash.com/photo-1582995309738-aa7a5e962da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkYW5jZSUyMGluc3RydWN0b3IlMjB0ZWFjaGluZ3xlbnwxfHx8fDE3NzUzMzcwNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      title: "Ballet Bootcamp",
      date: "July 8, 2026",
      time: "9:00 AM - 3:00 PM",
      location: "San Francisco, CA",
      instructor: "Alexandra Petrov",
      level: "Advanced",
      price: "$185",
      description: "Intensive classical ballet training focusing on technique, strength, and artistry.",
      image: "https://images.unsplash.com/photo-1765278624799-9c90305b0b7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZXJzJTIwcGVyZm9ybWluZyUyMGNvbnRlbXBvcmFyeSUyMGRhbmNlfGVufDF8fHx8MTc3NTMzNzA0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 5,
      title: "Latin Dance Fiesta",
      date: "July 22, 2026",
      time: "2:00 PM - 7:00 PM",
      location: "Miami, FL",
      instructor: "Carlos Martinez",
      level: "All Levels",
      price: "$140",
      description: "Experience the passion and rhythm of Latin dance styles including salsa, bachata, and reggaeton.",
      image: "https://images.unsplash.com/photo-1758526387662-fd64a2b85051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHN0dWRpbyUyMGNsYXNzJTIwY2hvcmVvZ3JhcGh5fGVufDF8fHx8MTc3NTMzNzA0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 6,
      title: "K-Pop Dance Experience",
      date: "August 5, 2026",
      time: "12:00 PM - 5:00 PM",
      location: "Seattle, WA",
      instructor: "Min-Ji Park",
      level: "Beginner to Intermediate",
      price: "$155",
      description: "Learn the latest K-Pop choreography and perfect your stage presence.",
      image: "https://images.unsplash.com/photo-1582995309738-aa7a5e962da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkYW5jZSUyMGluc3RydWN0b3IlMjB0ZWFjaGluZ3xlbnwxfHx8fDE3NzUzMzcwNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl mb-4">Upcoming Events</h1>
          <p className="text-xl text-purple-100">
            Join us for exclusive dance workshops with world-class choreographers
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-purple-600 text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <h3 className="text-xl mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500">Instructor</p>
                    <p className="text-sm">{event.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-lg text-purple-600">{event.price}</p>
                  </div>
                </div>

                <Link
                  to="/workshop-form"
                  className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors inline-block text-center"
                >
                  Register Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}