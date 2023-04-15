export interface QuotationResponse {
  code: number
  data: Quotation
  message: string
  status: string
}

export interface Quotation {
  eventId: string
  eventName: string
  eventDate: string
  eventTime: string
  address: string
  city: string
  state: string
  country: string
  zipcode: string
  totalTickets: number
  totalCheckins: number
  orderNumber: any
  username: any
  email: any
  verificationRequired: boolean
  selectedTickets: SelectedTicket[]
  timezone: string
  timezoneShort: string
  eventDateString: string
  eventTimeString: string
  ticketPrice: number
  handlingFees: number
  organizingFees: number
  stripeCharges: number
  totalAmount: number
  bookingCode: string
}

export interface SelectedTicket {
  ticketCategoryId: string
  bookedSeats: number
  ticketCategory: string
}
