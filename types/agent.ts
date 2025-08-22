export interface Agent {
  id: string
  name: string
  type: "transcription" | "translation" | "scheduling" | "analytics" | "moderation"
  status: "active" | "inactive" | "maintenance"
  usage: number
  rating: number
  totalSessions: number
  lastUsed: string
  createdAt: string
  description: string
  features: string[]
}

export type AgentStatus = Agent["status"]
export type AgentType = Agent["type"]
