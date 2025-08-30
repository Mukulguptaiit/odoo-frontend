import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Calendar, 
  Search, 
  User, 
  Plus, 
  Menu,
  ChevronDown,
  Ticket,
  BarChart3,
  Settings
} from "lucide-react";

const Navbar = () => {
  console.log("Navbar rendering");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<"attendee" | "organizer">("attendee");
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EventHive
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/events" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/events') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Discover Events
            </Link>
            
            {userRole === "organizer" && (
              <Link 
                to="/create-event" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/create-event') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Create Event
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Role Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  {userRole === "attendee" ? "Attendee" : "Organizer"}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setUserRole("attendee")}>
                  <User className="mr-2 h-4 w-4" />
                  Switch to Attendee
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserRole("organizer")}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Switch to Organizer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search */}
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>

            {/* Create Event Button for Organizers */}
            {userRole === "organizer" && (
              <Link to="/create-event">
                <Button variant="hero" size="sm">
                  <Plus className="h-4 w-4" />
                  Create Event
                </Button>
              </Link>
            )}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">
                    <Ticket className="mr-2 h-4 w-4" />
                    My Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/events"
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Discover Events
              </Link>
              {userRole === "organizer" && (
                <Link
                  to="/create-event"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Event
                </Link>
              )}
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;