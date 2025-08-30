import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  attendees: number;
  maxAttendees: number;
  image: string;
  trending?: boolean;
  featured?: boolean;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    return `₹${price}`;
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      {/* Event Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {event.trending && (
            <Badge className="bg-primary text-white shadow-lg">
              🔥 Trending
            </Badge>
          )}
          {event.featured && (
            <Badge className="bg-accent text-white shadow-lg">
              ⭐ Featured
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-background/90 text-foreground shadow-lg">
            {formatPrice(event.price)}
          </Badge>
        </div>

        {/* Date */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-primary/90 backdrop-blur-sm rounded-lg p-2 text-white">
            <div className="text-xs font-medium">{formatDate(event.date)}</div>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <Badge variant="secondary" className="mb-2 text-xs">
          {event.category}
        </Badge>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            {event.time}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="w-3 h-3 mr-1" />
            {event.attendees}/{event.maxAttendees} attending
          </div>
        </div>

        {/* Action Button */}
        <Link to={`/events/${event.id}`}>
          <Button 
            className="w-full" 
            variant="hero"
            size="sm"
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EventCard;