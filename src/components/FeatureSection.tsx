
import { ArrowRight, Calendar, Globe, Home, MapPin, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureSection = () => {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-wedding-blue" />,
      title: "Cultural Immersion",
      description: "Experience authentic Indian traditions, rituals, and ceremonies firsthand."
    },
    {
      icon: <Users className="h-8 w-8 text-wedding-green" />,
      title: "Connect with Locals",
      description: "Build meaningful connections with Indian families and communities."
    },
    {
      icon: <Home className="h-8 w-8 text-wedding-red" />,
      title: "Stay with Hosts",
      description: "Enjoy authentic hospitality with comfortable accommodations provided by your hosts."
    },
    {
      icon: <MapPin className="h-8 w-8 text-wedding-purple" />,
      title: "Explore India",
      description: "Discover diverse regions of India through its wedding traditions and local culture."
    },
    {
      icon: <Calendar className="h-8 w-8 text-wedding-orange" />,
      title: "Multi-Day Celebrations",
      description: "Participate in multiple days of festivities, each with unique customs and events."
    },
    {
      icon: <Star className="h-8 w-8 text-wedding-gold" />,
      title: "Curated Experiences",
      description: "Access to carefully selected weddings with verified hosts and detailed itineraries."
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">Why Experience an Indian Wedding?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Indian weddings are vibrant celebrations filled with rich traditions, colorful ceremonies, 
            and warm hospitality that create unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl hover-scale card-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/how-it-works" 
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Learn more about the experience
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
