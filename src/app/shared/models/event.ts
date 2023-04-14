export interface EventResponse {
  code?:    number;
  data?:    EventDetails;
  message?: string;
  status?:  string;
}

export interface EventDetails {
  eventId?:                 string;
  eventName?:               string;
  eventShortName?:          string;
  description?:             string;
  ageLimit?:                string;
  eventDate?:               string;
  eventTime?:               string;
  duration?:                string;
  latitude?:                number;
  longitude?:               number;
  address?:                 string;
  city?:                    string;
  state?:                   string;
  country?:                 string;
  zipcode?:                 string;
  artistList?:              ArtistList[];
  hostList?:                any[];
  djList?:                  any[];
  eventType?:               string;
  eventTypeID?:             string;
  eventCategory?:           string;
  eventCategoryId?:         string;
  eventImages?:             EventImage[];
  timezone?:                string;
  timezoneShort?:           string;
  eventDateString?:         Date;
  eventTimeString?:         string;
  eventOwner?:              boolean;
  packageId?:               string;
  packageType?:             string;
  verificationRequired?:    boolean;
  eventLikes?:              number;
  managerList?:             any[];
  eventTicketsList:        EventTicketsList[];
  associateInviteList?:     any[];
  eventPromoterList?:       any[];
  totalEarnings?:           null;
  organizerDetails?:        OrganizerDetails;
  saleDate?:                null;
  saleTime?:                null;
  saleDateString?:          null;
  saleTimeString?:          null;
  saleTimingSelected?:      boolean;
  showRemainingTickets?:    boolean;
  publish?:                 boolean;
  eventLikedByCurrentUser?: boolean;
  eventFree?:               boolean;
  eventCancelled?:          boolean;
  eventSoldOut?:            boolean;
}

export interface ArtistList {
  id?:                 string;
  artistName?:         string;
  artistImageUrl?:     string;
  artistThumbnailUrl?: null;
}

export interface EventImage {
  id?:       string;
  imageUrl?: string;
}

export interface EventTicketsList {
  id:             string;
  price:          number;
  totalSeats:     number;
  availableSeats: number;
  bookedSeats:    number;
  ticketCategory: string;
  isMarkSold:     boolean;
}

export interface OrganizerDetails {
  organizerId?:             string;
  organizerName?:           string;
  organizerProfileUrl?:     null;
  organizerRatings?:        null;
  organizerLikes?:          null;
  aboutOrganizer?:          null;
  organizerWebsite?:        null;
  organizerFollowedByUser?: boolean;
  organizerLikedByUser?:    boolean;
}
