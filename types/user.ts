export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  role: "admin" | "user" | "manager"
  plan: "free" | "pro" | "enterprise"
  joinedAt: string
  lastActive: string
  preferences: UserPreferences
  billing: BillingInfo
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  notifications: {
    email: boolean
    push: boolean
    meetingReminders: boolean
    weeklyDigest: boolean
  }
  meeting: {
    defaultDuration: number
    autoRecord: boolean
    muteOnJoin: boolean
    cameraOnJoin: boolean
  }
  privacy: {
    showOnlineStatus: boolean
    allowDirectMessages: boolean
    shareAnalytics: boolean
  }
}

export interface BillingInfo {
  plan: "free" | "pro" | "enterprise"
  status: "active" | "cancelled" | "past_due"
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  paymentMethod?: {
    type: "card" | "paypal"
    last4?: string
    brand?: string
    expiryMonth?: number
    expiryYear?: number
  }
}
