import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter,
  MapPin,
  Calendar,
  Grid3X3,
  List,
  SlidersHorizontal
} from "lucide-react";
import EventCard from "@/components/EventCard";
import concertImage from "@/assets/concert-event.jpg";
import workshopImage from "@/assets/workshop-event.jpg";
import sportsImage from "@/assets/sports-event.jpg";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock events data
  const events = [
    {
      id: "1",
      title: "Summer Music Festival 2024",
      description: "Join us for the biggest music festival of the year featuring top artists and DJs from around the world. Experience three days of non-stop music, food, and fun.",
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
      description: "Learn the fundamentals of AI and ML from industry experts. Hands-on sessions with real-world projects and networking opportunities.",
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
      description: "Inter-college basketball tournament with exciting prizes. Watch the best teams compete for the ultimate championship title.",
      date: "2024-09-25",
      time: "4:00 PM", 
      location: "Delhi, NCR",
      category: "Sports",
      price: 0,
      attendees: 300,
      maxAttendees: 1000,
      image: sportsImage,
      featured: true
    },
    {
      id: "4",
      title: "Digital Marketing Masterclass",
      description: "Master the art of digital marketing with expert-led sessions covering SEO, social media, and content marketing strategies.",
      date: "2024-09-30",
      time: "2:00 PM",
      location: "Pune, Maharashtra",
      category: "Workshop",
      price: 800,
      attendees: 45,
      maxAttendees: 75,
      image: workshopImage
    },
    {
      id: "5",
      title: "Indie Music Concert",
      description: "Discover amazing indie artists in an intimate venue setting. Great music, great vibes, and great company guaranteed.",
      date: "2024-10-05",
      time: "8:00 PM",
      location: "Goa",
      category: "Music",
      price: 1200,
      attendees: 150,
      maxAttendees: 300,
      image: concertImage
    },
    {
      id: "6",
      title: "Football Tournament",
      description: "Annual inter-state football tournament with teams from across the country competing for the championship trophy.",
      date: "2024-10-10",
      time: "5:00 PM",
      location: "Kolkata, West Bengal",
      category: "Sports",
      price: 100,
      attendees: 800,
      maxAttendees: 2000,
      image: sportsImage
    }
  ];

  const categories = ["All", "Music", "Sports", "Workshop", "Business"];
  const locations = ["All", "Mumbai", "Delhi", "Bangalore", "Pune", "Goa", "Kolkata"];
  const priceRanges = ["All", "Free", "Under ₹500", "₹500-₹1000", "₹1000-₹2000", "Above ₹2000"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "All" || event.category === selectedCategory;
    const matchesLocation = !selectedLocation || selectedLocation === "All" || event.location.includes(selectedLocation);
    
    let matchesPrice = true;
    if (priceRange && priceRange !== "All") {
      switch (priceRange) {
        case "Free":
          matchesPrice = event.price === 0;
          break;
        case "Under ₹500":
          matchesPrice = event.price > 0 && event.price < 500;
          break;
        case "₹500-₹1000":
          matchesPrice = event.price >= 500 && event.price <= 1000;
          break;
        case "₹1000-₹2000":
          matchesPrice = event.price > 1000 && event.price <= 2000;
          break;
        case "Above ₹2000":
          matchesPrice = event.price > 2000;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Discover Events</h1>
          <p className="text-lg text-muted-foreground">
            Find amazing events happening around you
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-gradient-card border-0 shadow-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results and View Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredEvents.length} events
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No events found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to find more events
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setSelectedLocation("");
                  setPriceRange("");
                }}
                variant="hero"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More Button */}
        {filteredEvents.length > 0 && (
          <div className="text-center mt-12 mb-8">
            <Button variant="outline" size="lg">
              Load More Events
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;