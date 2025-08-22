export interface Meeting {
  id: string
  title: string
  description: string
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  type: "one-on-one" | "team" | "client" | "webinar" | "training"
  startTime: string
  endTime: string
  duration: number // in minutes
  participants: Participant[]
  host: string
  meetingRoom: string
  recordingEnabled: boolean
  aiAgents: string[]
  createdAt: string
  updatedAt: string
}

export interface Participant {
  id: string
  name: string
  email: string
  role: "host" | "co-host" | "participant"
  status: "accepted" | "pending" | "declined"
  joinedAt?: string
  leftAt?: string
}

export type MeetingStatus = Meeting["status"]
export type MeetingType = Meeting["type"]
