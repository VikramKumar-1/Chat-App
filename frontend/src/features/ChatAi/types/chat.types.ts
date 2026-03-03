export type ChatId = string
export type MessageId = string
export type UserId = string

export interface Chat {
  id: ChatId
  name: string
  avatarUrl?: string
  unreadCount: number
  lastMessage?: string
}

export interface Message {
  id: MessageId
  chatId: ChatId
  senderId: UserId
  content: string
  createdAt: string
  status: "sent" | "delivered" | "seen"
}

export interface ChatState {
  chats: Chat[]
  activeChatId: ChatId | null
  messages: Record<ChatId, Message[]>
  typingUsers: Record<ChatId, UserId[]>
}

export interface User {
  id: string
  name: string
  username: string
  email: string
}

export interface FriendRequest {
  id: string
  senderId: string
  receiverId: string
  status: "pending" | "accepted" | "rejected"
}
// 🔥 Backend message shape (matches DB column names)
export interface BackendMessage {
  id: number
  conversation_id: number
  sender_id: number
  content: string   // ✅ must match DB column
  created_at: string
  seen_at: string | null
}

// 🔥 Backend conversation shape
export interface BackendConversation {
  id: number
  unread_count?: number
  name?: string
  other_user?: {
    id: number
    name: string
  }
  last_message?: {
    id: number
    content: string
  }
}

// 🔥 Simple conversation response
export interface Conversation {
  id: string
}