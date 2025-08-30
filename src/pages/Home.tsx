import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Users, 
  Music, 
  Gamepad2, 
  GraduationCap,
  Briefcase,
  ChevronRight,
  Star,
  Clock,
  Filter
} from "lucide-react";
import EventCard from "@/components/EventCard";
import heroImage from "@/assets/hero-events.jpg";
import concertImage from "@/assets/concert-event.jpg";
import workshopImage from "@/assets/workshop-event.jpg";
import sportsImage from "@/assets/sports-event.jpg";

const Home = () => {
  console.log("Home component rendering");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Mock data - in real app this would come from API
  const featuredEvents = [
    {
      id: "1",
      title: "Summer Music Festival 2024",
      description: "Join us for the biggest music festival of the year featuring top artists and DJs",
      date: "2024-09-15",
      time: "6:00 PM",
      location: "Mumbai, Maharashtra",
      category: "Music",
      price: 2500,
      attendees: 1200,
      maxAttendees: 5000,
      image: concertImage,
      trending: true,
      featured: true
    },
    {
      id: "2", 
      title: "Tech Workshop: AI & Machine Learning",
      description: "Learn the fundamentals of AI and ML from industry experts",
      date: "2024-09-20",
      time: "10:00 AM",
      location: "Bangalore, Karnataka",
      category: "Workshop",
      price: 500,
      attendees: 85,
      maxAttendees: 100,
      image: workshopImage,
      trending: true
    },
    {
      id: "3",
      title: "Basketball Championship",
      description: "Inter-college basketball tournament with exciting prizes",
      date: "2024-09-25",
      time: "4:00 PM", 
      location: "Delhi, NCR",
      category: "Sports",
      price: 0,
      attendees: 300,
      maxAttendees: 1000,
      image: sportsImage,
      featured: true
    }
  ];

  const categories = [
    { icon: Music, label: "Music", color: "bg-pink-100 text-pink-600" },
    { icon: Gamepad2, label: "Sports", color: "bg-blue-100 text-blue-600" },
    { icon: GraduationCap, label: "Workshop", color: "bg-green-100 text-green-600" },
    { icon: Briefcase, label: "Business", color: "bg-purple-100 text-purple-600" }
  ];

  const stats = [
    { icon: Calendar, value: "500+", label: "Events This Month" },
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: MapPin, value: "50+", label: "Cities Covered" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Events" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Where Events
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-pink-300">
                Come Alive
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover amazing events, connect with like-minded people, and create unforgettable memories. Your next adventure is just a click away.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="hero" size="lg" className="font-semibold">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Browse by Category</h2>
            <Link to="/events">
              <Button variant="ghost" className="text-primary">
                View All <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={`/events?category=${category.label.toLowerCase()}`}>
                <Card className="group cursor-pointer hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl ${category.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.label}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Events */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Events</h2>
              <p className="text-muted-foreground">Don't miss these amazing events happening soon</p>
            </div>
            <Link to="/events">
              <Button variant="hero">
                Explore All Events <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16">
          <Card className="bg-gradient-hero border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20" />
            <CardContent className="relative p-12 text-center">
              <Star className="w-16 h-16 text-yellow-300 mx-auto mb-6 animate-float" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Create Your Event?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of organizers who trust EventHive to bring their events to life. 
                Start creating memorable experiences today.
              </p>
              <Link to="/create-event">
                <Button variant="secondary" size="xl" className="font-semibold">
                  Start Creating <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Home;