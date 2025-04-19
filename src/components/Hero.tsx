import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 pt-16">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <div className="animate-slide-in-up">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Experience Authentic Indian Weddings
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                Immerse Yourself in the Magic of 
                <span className="text-gradient"> Indian Weddings</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
                Connect with Indian hosts, attend authentic ceremonies, and create unforgettable memories while experiencing the rich cultural traditions of Indian weddings.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/discover">
                  <Button size="lg" className="w-full sm:w-auto">
                    Discover Weddings
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative animate-fade-in">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-wedding-red to-wedding-gold opacity-20 blur-2xl rounded-2xl"></div>
              <div className="relative flex justify-center">
                <div className="w-full h-[400px] sm:h-[450px] bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/punjabi-couple.jpg" 
                    alt="Punjabi Wedding Couple" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-xl overflow-hidden shadow-lg transform rotate-6 hidden lg:block">
                  <img 
                    src="/images/fire-ceremony.jpg" 
                    alt="Indian Fire Ceremony" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-xl overflow-hidden shadow-lg transform -rotate-12 hidden lg:block">
                  <img 
                    src="/images/sindoor-ceremony.jpg" 
                    alt="Sindoor Ceremony" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h4 className="font-serif text-3xl font-bold text-primary">1200+</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Weddings Listed</p>
            </div>
            <div className="text-center">
              <h4 className="font-serif text-3xl font-bold text-primary">4,800+</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Happy Guests</p>
            </div>
            <div className="text-center">
              <h4 className="font-serif text-3xl font-bold text-primary">28+</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Indian States</p>
            </div>
            <div className="text-center">
              <h4 className="font-serif text-3xl font-bold text-primary">4.8/5</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Guest Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
