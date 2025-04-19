
import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface PageTransitionProps {
  children: ReactNode;
  requireAuth?: boolean;
}

// Simulate authentication state - in a real app, this would use a proper auth system
const useAuth = () => {
  // Check if user is logged in based on localStorage
  const isAuthenticated = localStorage.getItem("webaura-authenticated") === "true";
  const isRegistered = localStorage.getItem("webaura-registered") === "true";
  
  const login = () => {
    if (!isRegistered) {
      return false; // Can't login if not registered
    }
    localStorage.setItem("webaura-authenticated", "true");
    return true;
  };
  
  const register = () => {
    localStorage.setItem("webaura-registered", "true");
    localStorage.setItem("webaura-authenticated", "true");
  };
  
  const logout = () => {
    localStorage.setItem("webaura-authenticated", "false");
  };
  
  return { isAuthenticated, isRegistered, login, register, logout };
};

const PageTransition = ({ children, requireAuth = false }: PageTransitionProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If page requires authentication and user is not authenticated
    if (requireAuth && !isAuthenticated && 
        location.pathname !== "/login" && 
        location.pathname !== "/signup") {
      toast({
        title: "Authentication required",
        description: "Please login to access this page",
        variant: "destructive",
      });
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [requireAuth, isAuthenticated, location.pathname, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
export { useAuth };
