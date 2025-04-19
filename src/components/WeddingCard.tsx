import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Heart, MapPin, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "./PageTransition";

interface WeddingCardProps {
  id: string;
  title: string;
  location: string;
  date: string;
  price: number;
  currency?: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  region: string;
  weddingType: string;
  isWishlisted?: boolean;
  experiences?: string[];
}

const WeddingCard = ({
  id,
  title,
  location,
  date,
  price,
  currency = "USD",
  rating,
  reviewCount,
  imageUrl,
  region,
  weddingType,
  isWishlisted = false,
  experiences = [],
}: WeddingCardProps) => {
  const [wishlisted, setWishlisted] = useState(isWishlisted);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Check if item is in wishlist from localStorage
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("webaura-wishlist") || "[]");
    setWishlisted(wishlist.includes(id));
  }, [id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to save weddings to your wishlist",
        variant: "destructive",
      });
      navigate("/login", { state: { from: `/wedding/${id}` } });
      return;
    }
    
    // Update wishlist in localStorage
    const wishlist = JSON.parse(localStorage.getItem("webaura-wishlist") || "[]");
    let newWishlist;
    
    if (wishlisted) {
      newWishlist = wishlist.filter((itemId: string) => itemId !== id);
      toast({
        title: "Removed from wishlist",
        description: "Wedding has been removed from your wishlist",
      });
    } else {
      newWishlist = [...wishlist, id];
      toast({
        title: "Added to wishlist",
        description: "Wedding has been added to your wishlist",
      });
    }
    
    localStorage.setItem("webaura-wishlist", JSON.stringify(newWishlist));
    setWishlisted(!wishlisted);
  };
  
  const getRegionColor = (region: string) => {
    const regions: Record<string, string> = {
      "North Indian": "bg-wedding-red text-white",
      "South Indian": "bg-wedding-green text-white",
      "East Indian": "bg-wedding-blue text-white",
      "West Indian": "bg-wedding-orange text-white",
      "Central Indian": "bg-wedding-purple text-white",
      "North East Indian": "bg-wedding-pink text-black",
    };
    
    return regions[region] || "bg-gray-200 text-gray-800";
  };

  return (
    <Link to={`/wedding/${id}`}>
      <Card className="overflow-hidden hover-scale card-shadow h-full flex flex-col">
        <div className="relative">
          <div className="overflow-hidden aspect-[3/4]">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 ${
              wishlisted ? "text-red-500" : "text-gray-600"
            }`}
            onClick={toggleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-5 w-5 ${wishlisted ? "fill-current" : ""}`} />
          </Button>
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge variant="secondary" className={getRegionColor(region)}>
              {region}
            </Badge>
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              {weddingType}
            </Badge>
          </div>
        </div>
        <CardContent className="pt-4 flex-grow">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-serif text-lg font-semibold line-clamp-2">{title}</h3>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
            <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-wedding-gold mr-1" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">({reviewCount} reviews)</span>
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
          <div className="w-full flex justify-between items-center">
            <div>
              <span className="font-serif font-bold text-lg">{currency} {price}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400"> / person</span>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default WeddingCard;
