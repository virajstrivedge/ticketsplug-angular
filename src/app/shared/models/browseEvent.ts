export interface BrowseEventResponse {
  code: number
  data: Data
  message: string
  status: string
}

export interface Data {
  list: BrowseEvent[]
  totalCount: number
  totalPages: number
}

export interface BrowseEvent {
  eventId: string
  eventName: string
  eventShortName: string
  ageLimit: string
  eventDate: string
  eventTime: string
  duration: string
  address: string
  city: string
  state: string
  country: string
  lowestPrice: number
  eventType: string
  eventImages: EventImage[]
  timezone: string
  timezoneShort: string
  eventDateString: string
  eventTimeString: string
  eventLikes: number
  eventLikedByCurrentUser: boolean
  eventFree: boolean
  eventCancelled: boolean
  eventSoldOut: boolean
}

export interface EventImage {
  id: string
  imageUrl: string
}
