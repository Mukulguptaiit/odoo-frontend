import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  Plus,
  X,
  Upload,
  Eye,
  Save,
  Wand2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TicketType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  saleStart: string;
  saleEnd: string;
}

const CreateEvent = () => {
  const { toast } = useToast();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    endDate: "",
    endTime: "",
    venue: "",
    address: "",
    city: "",
    state: "",
    maxAttendees: "",
    tags: [] as string[],
    isPublic: true,
    allowWaitlist: false,
    requireApproval: false
  });

  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    {
      id: "1",
      name: "General Admission",
      price: 0,
      quantity: 100,
      description: "Standard entry ticket",
      saleStart: "",
      saleEnd: ""
    }
  ]);

  const [newTag, setNewTag] = useState("");
  const [isDraft, setIsDraft] = useState(true);

  const categories = [
    "Music", "Sports", "Workshop", "Business", "Technology", 
    "Arts", "Food", "Health", "Education", "Entertainment"
  ];

  const addTicketType = () => {
    const newTicket: TicketType = {
      id: Date.now().toString(),
      name: "",
      price: 0,
      quantity: 50,
      description: "",
      saleStart: "",
      saleEnd: ""
    };
    setTicketTypes([...ticketTypes, newTicket]);
  };

  const removeTicketType = (id: string) => {
    setTicketTypes(ticketTypes.filter(ticket => ticket.id !== id));
  };

  const updateTicketType = (id: string, field: string, value: any) => {
    setTicketTypes(ticketTypes.map(ticket => 
      ticket.id === id ? { ...ticket, [field]: value } : ticket
    ));
  };

  const addTag = () => {
    if (newTag.trim() && !eventData.tags.includes(newTag.trim())) {
      setEventData({
        ...eventData,
        tags: [...eventData.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setEventData({
      ...eventData,
      tags: eventData.tags.filter(t => t !== tag)
    });
  };

  const handleSubmit = (publish: boolean = false) => {
    // Basic validation
    if (!eventData.title || !eventData.category || !eventData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const action = publish ? "published" : "saved as draft";
    toast({
      title: "Event " + (publish ? "Published!" : "Saved!"),
      description: `Your event has been ${action} successfully.`,
    });

    // In real app, this would make API call to save/publish event
    console.log("Event data:", eventData);
    console.log("Ticket types:", ticketTypes);
    console.log("Is published:", publish);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Create New Event</h1>
          <p className="text-lg text-muted-foreground">
            Fill in the details to create your amazing event
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wand2 className="w-5 h-5 mr-2 text-primary" />
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter your event title"
                  value={eventData.title}
                  onChange={(e) => setEventData({...eventData, title: e.target.value})}
                  className="text-lg"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event in detail"
                  value={eventData.description}
                  onChange={(e) => setEventData({...eventData, description: e.target.value})}
                  rows={4}
                />
              </div>

              {/* Category and Max Attendees */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={eventData.category} onValueChange={(value) => setEventData({...eventData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    placeholder="e.g. 100"
                    value={eventData.maxAttendees}
                    onChange={(e) => setEventData({...eventData, maxAttendees: e.target.value})}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {eventData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Start Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={eventData.date}
                    onChange={(e) => setEventData({...eventData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Start Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={eventData.time}
                    onChange={(e) => setEventData({...eventData, time: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={eventData.endDate}
                    onChange={(e) => setEventData({...eventData, endDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={eventData.endTime}
                    onChange={(e) => setEventData({...eventData, endTime: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="venue">Venue Name *</Label>
                <Input
                  id="venue"
                  placeholder="e.g. Convention Center"
                  value={eventData.venue}
                  onChange={(e) => setEventData({...eventData, venue: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Street address"
                  value={eventData.address}
                  onChange={(e) => setEventData({...eventData, address: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="e.g. Mumbai"
                    value={eventData.city}
                    onChange={(e) => setEventData({...eventData, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="e.g. Maharashtra"
                    value={eventData.state}
                    onChange={(e) => setEventData({...eventData, state: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tickets */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Ticket className="w-5 h-5 mr-2 text-primary" />
                  Ticket Types
                </div>
                <Button onClick={addTicketType} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Ticket Type
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {ticketTypes.map((ticket, index) => (
                <div key={ticket.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Ticket Type {index + 1}</h3>
                    {ticketTypes.length > 1 && (
                      <Button
                        onClick={() => removeTicketType(ticket.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ticket Name</Label>
                      <Input
                        placeholder="e.g. General Admission"
                        value={ticket.name}
                        onChange={(e) => updateTicketType(ticket.id, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Price (₹)</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={ticket.price}
                        onChange={(e) => updateTicketType(ticket.id, 'price', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        placeholder="100"
                        value={ticket.quantity}
                        onChange={(e) => updateTicketType(ticket.id, 'quantity', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        placeholder="Ticket description"
                        value={ticket.description}
                        onChange={(e) => updateTicketType(ticket.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sale Start Date</Label>
                      <Input
                        type="date"
                        value={ticket.saleStart}
                        onChange={(e) => updateTicketType(ticket.id, 'saleStart', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sale End Date</Label>
                      <Input
                        type="date"
                        value={ticket.saleEnd}
                        onChange={(e) => updateTicketType(ticket.id, 'saleEnd', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Event Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Public Event</Label>
                  <p className="text-sm text-muted-foreground">Make this event visible to everyone</p>
                </div>
                <Switch
                  checked={eventData.isPublic}
                  onCheckedChange={(checked) => setEventData({...eventData, isPublic: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Waitlist</Label>
                  <p className="text-sm text-muted-foreground">Let people join waitlist when sold out</p>
                </div>
                <Switch
                  checked={eventData.allowWaitlist}
                  onCheckedChange={(checked) => setEventData({...eventData, allowWaitlist: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Approval</Label>
                  <p className="text-sm text-muted-foreground">Manually approve each registration</p>
                </div>
                <Switch
                  checked={eventData.requireApproval}
                  onCheckedChange={(checked) => setEventData({...eventData, requireApproval: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between space-x-4 pb-8">
            <Button variant="outline" size="lg">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <div className="flex space-x-4">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => handleSubmit(false)}
              >
                <Save className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => handleSubmit(true)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Publish Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;