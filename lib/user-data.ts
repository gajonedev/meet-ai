import type { User } from "@/types/user"

export const currentUser: User = {
  id: "user-1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@company.com",
  avatar: "/placeholder-user.png",
  role: "admin",
  plan: "pro",
  joinedAt: "2023-06-15T08:00:00Z",
  lastActive: "2024-01-15T10:30:00Z",
  preferences: {
    theme: "system",
    notifications: {
      email: true,
      push: true,
      meetingReminders: true,
      weeklyDigest: false,
    },
    meeting: {
      defaultDuration: 30,
      autoRecord: false,
      muteOnJoin: true,
      cameraOnJoin: false,
    },
    privacy: {
      showOnlineStatus: true,
      allowDirectMessages: true,
      shareAnalytics: false,
    },
  },
  billing: {
    plan: "pro",
    status: "active",
    currentPeriodStart: "2024-01-01T00:00:00Z",
    currentPeriodEnd: "2024-02-01T00:00:00Z",
    cancelAtPeriodEnd: false,
    paymentMethod: {
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2025,
    },
  },
}
