import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  Heart,
  Ticket,
  CreditCard,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Star,
  ChevronRight,
  Shield,
  CheckCircle
} from "lucide-react";
import concertImage from "@/assets/concert-event.jpg";

const EventDetail = () => {
  const { id } = useParams();
  const [selectedTickets, setSelectedTickets] = useState<{[key: string]: number}>({});
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Mock event data - in real app this would be fetched based on ID
  const event = {
    id: "1",
    title: "Summer Music Festival 2024",
    description: "Join us for the biggest music festival of the year featuring top artists and DJs from around the world. Experience three days of non-stop music, food, and fun in a beautiful outdoor setting.",
    fullDescription: `Get ready for an unforgettable musical journey at the Summer Music Festival 2024! This three-day extravaganza brings together the hottest artists and DJs from across the globe for an epic celebration of music, culture, and community.

    What to Expect:
    • 50+ artists across 5 stages
    • World-class food trucks and vendors
    • Art installations and interactive experiences
    • Silent disco and chill-out zones
    • VIP areas with premium amenities
    • Sustainable and eco-friendly practices

    Festival Lineup includes international headliners, rising indie artists, and local talent. From electronic dance music to indie rock, hip-hop to acoustic sessions - there's something for every music lover.`,
    date: "2024-09-15",
    endDate: "2024-09-17",
    time: "6:00 PM",
    location: "Mumbai, Maharashtra",
    venue: "Mahalaxmi Race Course",
    category: "Music",
    attendees: 1200,
    maxAttendees: 5000,
    image: concertImage,
    trending: true,
    featured: true,
    organizer: {
      name: "MusicEvents Pro",
      avatar: "",
      verified: true,
      rating: 4.8,
      eventsOrganized: 25
    },
    ticketTypes: [
      {
        id: "general",
        name: "General Admission",
        price: 2500,
        description: "Access to all stages and general areas",
        available: 1500,
        perks: ["Festival wristband", "Access to all stages", "Food court access"]
      },
      {
        id: "vip",
        name: "VIP Experience",
        price: 5000,
        description: "Premium experience with exclusive perks",
        available: 200,
        perks: ["VIP viewing areas", "Complimentary drinks", "Artist meet & greet", "Premium restrooms", "Fast track entry"]
      },
      {
        id: "early-bird",
        name: "Early Bird Special",
        price: 1999,
        description: "Limited time offer - save ₹500!",
        available: 50,
        perks: ["Festival wristband", "Access to all stages", "Early entry", "Exclusive merchandise"]
      }
    ],
    highlights: [
      "50+ International & Local Artists",
      "5 Different Music Stages", 
      "Food & Beverage Vendors",
      "Art Installations",
      "Safe & Secure Environment"
    ]
  };

  const handleTicketChange = (ticketId: string, quantity: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: Math.max(0, quantity)
    }));
  };

  const getTotalPrice = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
      const ticket = event.ticketTypes.find(t => t.id === ticketId);
      return total + (ticket ? ticket.price * quantity : 0);
    }, 0);
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/events">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {event.trending && (
                  <Badge className="bg-primary text-white">
                    🔥 Trending
                  </Badge>
                )}
                {event.featured && (
                  <Badge className="bg-accent text-white">
                    ⭐ Featured
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button 
                  variant="glass" 
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="glass" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Event Info */}
            <div>
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">
                  {event.category}
                </Badge>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {event.title}
                </h1>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{event.venue}</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attendees</p>
                    <p className="font-semibold">{event.attendees}/{event.maxAttendees}</p>
                  </div>
                </div>
              </div>

              {/* Organizer Info */}
              <Card className="mb-8 bg-gradient-card border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={event.organizer.avatar} />
                      <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{event.organizer.name}</h3>
                        {event.organizer.verified && (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {event.organizer.rating}
                        </span>
                        <span>{event.organizer.eventsOrganized} events organized</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {event.fullDescription}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Event Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {event.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle className="text-xl">Select Tickets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Ticket Types */}
                  {event.ticketTypes.map((ticket) => (
                    <div key={ticket.id} className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{ticket.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {ticket.description}
                          </p>
                          <p className="text-lg font-bold text-primary">
                            ₹{ticket.price.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ticket.available} available
                          </p>
                        </div>
                      </div>

                      {/* Ticket Perks */}
                      <div className="space-y-1">
                        {ticket.perks.map((perk, index) => (
                          <div key={index} className="flex items-center text-xs text-muted-foreground">
                            <CheckCircle className="w-3 h-3 mr-2 text-primary" />
                            {perk}
                          </div>
                        ))}
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Quantity:</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleTicketChange(ticket.id, (selectedTickets[ticket.id] || 0) - 1)}
                            disabled={(selectedTickets[ticket.id] || 0) <= 0}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {selectedTickets[ticket.id] || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleTicketChange(ticket.id, (selectedTickets[ticket.id] || 0) + 1)}
                            disabled={(selectedTickets[ticket.id] || 0) >= ticket.available}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                    </div>
                  ))}

                  {/* Total */}
                  {getTotalTickets() > 0 && (
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total ({getTotalTickets()} tickets)</span>
                        <span className="text-primary">₹{getTotalPrice().toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {/* Book Now Button */}
                  <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        variant="hero" 
                        size="lg"
                        disabled={getTotalTickets() === 0}
                      >
                        <Ticket className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Complete Your Booking</DialogTitle>
                        <DialogDescription>
                          Fill in your details to book tickets for {event.title}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="Enter your phone number" />
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="text-sm font-medium mb-2">Booking Summary</div>
                          {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                            const ticket = event.ticketTypes.find(t => t.id === ticketId);
                            if (!ticket || quantity === 0) return null;
                            return (
                              <div key={ticketId} className="flex justify-between text-sm">
                                <span>{ticket.name} x{quantity}</span>
                                <span>₹{(ticket.price * quantity).toLocaleString()}</span>
                              </div>
                            );
                          })}
                          <Separator className="my-2" />
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>₹{getTotalPrice().toLocaleString()}</span>
                          </div>
                        </div>
                        <Button className="w-full" variant="hero">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Proceed to Payment
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Security Note */}
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Secure payment powered by EventHive</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;