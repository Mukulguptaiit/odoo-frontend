import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Ticket, 
  Heart, 
  Settings,
  Download,
  BarChart3,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  MoreHorizontal,
  MapPin,
  Clock,
  Star
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import concertImage from "@/assets/concert-event.jpg";
import workshopImage from "@/assets/workshop-event.jpg";
import sportsImage from "@/assets/sports-event.jpg";

const Dashboard = () => {
  const [userRole, setUserRole] = useState<"attendee" | "organizer">("attendee");

  // Mock data
  const userTickets = [
    {
      id: "1",
      eventId: "1",
      eventTitle: "Summer Music Festival 2024",
      eventDate: "2024-09-15",
      eventTime: "6:00 PM",
      eventLocation: "Mumbai, Maharashtra",
      ticketType: "VIP Experience",
      price: 5000,
      bookingId: "BK001234",
      status: "confirmed",
      image: concertImage
    },
    {
      id: "2", 
      eventId: "2",
      eventTitle: "Tech Workshop: AI & Machine Learning",
      eventDate: "2024-09-20",
      eventTime: "10:00 AM",
      eventLocation: "Bangalore, Karnataka",
      ticketType: "General Admission",
      price: 500,
      bookingId: "BK001235",
      status: "confirmed",
      image: workshopImage
    }
  ];

  const organizedEvents = [
    {
      id: "1",
      title: "Summer Music Festival 2024",
      date: "2024-09-15",
      location: "Mumbai, Maharashtra",
      category: "Music",
      status: "published",
      attendees: 1200,
      maxAttendees: 5000,
      revenue: 2500000,
      image: concertImage
    },
    {
      id: "2",
      title: "Tech Innovation Summit",
      date: "2024-10-01",
      location: "Bangalore, Karnataka", 
      category: "Business",
      status: "draft",
      attendees: 0,
      maxAttendees: 300,
      revenue: 0,
      image: workshopImage
    }
  ];

  const stats = [
    { label: "Total Events", value: "12", icon: Calendar },
    { label: "Total Attendees", value: "5.2K", icon: Users },
    { label: "Revenue", value: "₹8.5L", icon: TrendingUp },
    { label: "Rating", value: "4.8", icon: Star }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {userRole === "attendee" ? "My Dashboard" : "Organizer Dashboard"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {userRole === "attendee" 
                ? "Manage your tickets and bookings" 
                : "Manage your events and track performance"
              }
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant={userRole === "attendee" ? "default" : "outline"}
              onClick={() => setUserRole("attendee")}
            >
              Attendee View
            </Button>
            <Button 
              variant={userRole === "organizer" ? "default" : "outline"}
              onClick={() => setUserRole("organizer")}
            >
              Organizer View
            </Button>
          </div>
        </div>

        {userRole === "attendee" ? (
          /* Attendee Dashboard */
          <Tabs defaultValue="tickets" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tickets">My Tickets</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="tickets" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-card border-0 shadow-card">
                  <CardContent className="p-6 text-center">
                    <Ticket className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{userTickets.length}</div>
                    <div className="text-sm text-muted-foreground">Active Tickets</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-card border-0 shadow-card">
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">8</div>
                    <div className="text-sm text-muted-foreground">Events Attended</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-card border-0 shadow-card">
                  <CardContent className="p-6 text-center">
                    <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">₹25,000</div>
                    <div className="text-sm text-muted-foreground">Total Spent</div>
                  </CardContent>
                </Card>
              </div>

              {/* Tickets */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Upcoming Events</h2>
                  <Link to="/events">
                    <Button variant="hero">
                      <Plus className="w-4 h-4 mr-2" />
                      Find Events
                    </Button>
                  </Link>
                </div>

                {userTickets.length > 0 ? (
                  <div className="space-y-4">
                    {userTickets.map((ticket) => (
                      <Card key={ticket.id} className="bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={ticket.image} 
                                alt={ticket.eventTitle}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-bold text-lg mb-1">{ticket.eventTitle}</h3>
                                  <div className="space-y-1 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {formatDate(ticket.eventDate)} at {ticket.eventTime}
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      {ticket.eventLocation}
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-3 mt-3">
                                    <Badge className="bg-primary/10 text-primary">
                                      {ticket.ticketType}
                                    </Badge>
                                    <Badge className={getStatusColor(ticket.status)}>
                                      {ticket.status}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-primary mb-2">
                                    ₹{ticket.price.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    ID: {ticket.bookingId}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-4">
                                <Link to={`/events/${ticket.eventId}`}>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-3 h-3 mr-1" />
                                    View Event
                                  </Button>
                                </Link>
                                <Button variant="outline" size="sm">
                                  <Download className="w-3 h-3 mr-1" />
                                  Download Ticket
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="text-center py-16">
                    <CardContent>
                      <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        No tickets yet
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Start exploring events and book your first ticket!
                      </p>
                      <Link to="/events">
                        <Button variant="hero">
                          Discover Events
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              <Card className="text-center py-16">
                <CardContent>
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No favorites yet
                  </h3>
                  <p className="text-muted-foreground">
                    Heart events you love to see them here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarFallback className="text-lg">JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">John Doe</h3>
                        <p className="text-muted-foreground">john.doe@example.com</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          /* Organizer Dashboard */
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gradient-card border-0 shadow-card">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Events Management */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Events</h2>
                <Link to="/create-event">
                  <Button variant="hero">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {organizedEvents.map((event) => (
                  <Card key={event.id} className="bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {formatDate(event.date)}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {event.location}
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 mt-3">
                                <Badge variant="secondary">{event.category}</Badge>
                                <Badge className={getStatusColor(event.status)}>
                                  {event.status}
                                </Badge>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Event
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Event
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <BarChart3 className="w-4 h-4 mr-2" />
                                  Analytics
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                            <div>
                              <div className="text-lg font-bold text-primary">
                                {event.attendees}/{event.maxAttendees}
                              </div>
                              <div className="text-xs text-muted-foreground">Attendees</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-primary">
                                ₹{event.revenue.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">Revenue</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-primary">
                                {event.attendees > 0 ? Math.round((event.attendees / event.maxAttendees) * 100) : 0}%
                              </div>
                              <div className="text-xs text-muted-foreground">Sold</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;