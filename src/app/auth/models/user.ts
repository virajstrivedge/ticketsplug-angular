export interface ResponseBody {
  code: number
  data: User
  message: string
  status: string
  token: string
}

export interface User {
  firstName: string
  lastName: string
  userId: string
  email: string
  role?: string
  bankDetailsAdded: boolean
}
