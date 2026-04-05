import { Award, Youtube, Instagram } from "lucide-react";

export default function Instructors() {
  const instructors = [
    {
      id: 1,
      name: "Maria Rodriguez",
      specialty: "Contemporary & Fusion",
      bio: "Maria has choreographed for major artists including Beyoncé and Jennifer Lopez. With 15+ years of experience, she brings a unique blend of contemporary and cultural fusion to every workshop.",
      achievements: [
        "MTV Video Music Award Winner",
        "Choreographer for World Tours",
        "Featured on So You Think You Can Dance",
      ],
      social: {
        instagram: "@mariamoves",
        youtube: "MariaDanceOfficial",
      },
    },
    {
      id: 2,
      name: "Jordan Smith",
      specialty: "Hip-Hop & Urban",
      bio: "Jordan is a hip-hop pioneer who has worked with Drake, Travis Scott, and Megan Thee Stallion. Known for innovative choreography that pushes boundaries.",
      achievements: [
        "BET Awards Choreographer",
        "Nike Dance Campaign Director",
        "Red Bull Dance Battle Judge",
      ],
      social: {
        instagram: "@jordanurbandance",
        youtube: "JordanSmithHipHop",
      },
    },
    {
      id: 3,
      name: "Taylor Chen",
      specialty: "Jazz & Broadway",
      bio: "Taylor has performed in and choreographed for Broadway productions including Hamilton, Wicked, and The Lion King. A master of theatrical dance.",
      achievements: [
        "Tony Award Nominee",
        "Broadway's Top Choreographer 2024",
        "Juilliard Guest Faculty",
      ],
      social: {
        instagram: "@taylorchenbroadway",
        youtube: "TaylorChenDance",
      },
    },
    {
      id: 4,
      name: "Alexandra Petrov",
      specialty: "Ballet & Classical",
      bio: "Former principal dancer with the Bolshoi Ballet, Alexandra brings world-class technique and artistry to every class. Her teaching combines traditional methods with modern insights.",
      achievements: [
        "Bolshoi Ballet Principal Dancer",
        "Prix de Lausanne Winner",
        "Royal Ballet Guest Artist",
      ],
      social: {
        instagram: "@alexandraballet",
        youtube: "PetrovBalletAcademy",
      },
    },
    {
      id: 5,
      name: "Carlos Martinez",
      specialty: "Latin & Ballroom",
      bio: "Carlos is a world champion Latin dancer who has brought the heat to Dancing with the Stars and international competitions globally.",
      achievements: [
        "World Latin Dance Champion",
        "Dancing with the Stars Professional",
        "International Competition Judge",
      ],
      social: {
        instagram: "@carloslatindance",
        youtube: "CarlosMartinezDance",
      },
    },
    {
      id: 6,
      name: "Min-Ji Park",
      specialty: "K-Pop & Commercial",
      bio: "Min-Ji has choreographed for top K-Pop groups including BTS, BLACKPINK, and Seventeen. She brings authentic K-Pop training and performance techniques.",
      achievements: [
        "HYBE Entertainment Choreographer",
        "MAMA Awards Performance Director",
        "Seoul Dance Academy Founder",
      ],
      social: {
        instagram: "@minjikpop",
        youtube: "MinJiDanceStudio",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl mb-4">Our Instructors</h1>
          <p className="text-xl text-purple-100">
            Learn from the world's most renowned choreographers and dance professionals
          </p>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <div className="text-white text-6xl opacity-30">
                      {instructor.name.charAt(0)}
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-2xl mb-2">{instructor.name}</h3>
                  <p className="text-purple-600 mb-4">{instructor.specialty}</p>
                  <p className="text-gray-600 text-sm mb-4">{instructor.bio}</p>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold">Achievements</span>
                    </div>
                    <ul className="space-y-1">
                      {instructor.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-gray-600 pl-6">
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={`https://instagram.com/${instructor.social.instagram.slice(1)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>{instructor.social.instagram}</span>
                    </a>
                    <a
                      href={`https://youtube.com/${instructor.social.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <Youtube className="w-4 h-4" />
                      <span>{instructor.social.youtube}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
