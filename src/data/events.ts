export interface WeddingEvent {
  eventName: string;
  eventNameHindi: string;
  eventIcon: string;
  eventDate: string;
  eventDay: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  mapsLink: string;
  dressCode?: string;
  dressColor?: string;
}

export const weddingEvents: WeddingEvent[] = [
  {
    eventName: "Haldi Ceremony",
    eventNameHindi: "हल्दी",
    eventIcon: "🌼",
    eventDate: "9th May 2026",
    eventDay: "9",
    eventTime: "10:00 AM onwards",
    venueName: "Bliss Resort",
    venueAddress: "Bliss Resort, Bhilwara, Rajasthan",
    mapsLink: "https://maps.google.com/?q=Bliss+Resort+Bhilwara",
    dressCode: "Yellow Traditional",
    dressColor: "#F4D03F",
  },
  {
    eventName: "Engagement Ceremony",
    eventNameHindi: "सगाई",
    eventIcon: "💍",
    eventDate: "9th May 2026",
    eventDay: "9",
    eventTime: "4:00 PM onwards",
    venueName: "Bliss Resort",
    venueAddress: "Bliss Resort, Bhilwara, Rajasthan",
    mapsLink: "https://maps.google.com/?q=Bliss+Resort+Bhilwara",
    dressCode: "Semi-Formal Traditional",
  },
  {
    eventName: "Sangeet Evening",
    eventNameHindi: "संगीत",
    eventIcon: "🎵",
    eventDate: "9th May 2026",
    eventDay: "9",
    eventTime: "7:00 PM onwards",
    venueName: "Bliss Resort",
    venueAddress: "Bliss Resort, Bhilwara, Rajasthan",
    mapsLink: "https://maps.google.com/?q=Bliss+Resort+Bhilwara",
    dressCode: "Festive / Party Wear",
  },
  {
    eventName: "Chaak / Bhaat Ceremony",
    eventNameHindi: "चाक / भात",
    eventIcon: "🪔",
    eventDate: "10th May 2026",
    eventDay: "10",
    eventTime: "9:00 AM onwards",
    venueName: "Bliss Resort",
    venueAddress: "Bliss Resort, Bhilwara, Rajasthan",
    mapsLink: "https://maps.google.com/?q=Bliss+Resort+Bhilwara",
    dressCode: "Traditional",
  },
  {
    eventName: "Wedding Ceremony",
    eventNameHindi: "विवाह",
    eventIcon: "🔥",
    eventDate: "10th May 2026",
    eventDay: "10",
    eventTime: "7:00 PM onwards",
    venueName: "Bliss Resort",
    venueAddress: "Bliss Resort, Bhilwara, Rajasthan",
    mapsLink: "https://maps.google.com/?q=Bliss+Resort+Bhilwara",
    dressCode: "Grand Traditional",
  },
  {
    eventName: "Wedding Reception",
    eventNameHindi: "रिसेप्शन",
    eventIcon: "✨",
    eventDate: "11th May 2026",
    eventDay: "11",
    eventTime: "7:00 PM onwards",
    venueName: "Bhairav Bagh Palace",
    venueAddress: "Bhairav Bagh Palace, Udaipur, Rajasthan",
    mapsLink: "https://maps.google.com/?q=Bhairav+Bagh+Palace+Udaipur",
    dressCode: "Indo-Western / Formal",
  },
];

export const dayTabs = [
  { day: "9", label: "9th May", subtitle: "Day 1" },
  { day: "10", label: "10th May", subtitle: "Day 2" },
  { day: "11", label: "11th May", subtitle: "Day 3" },
];
