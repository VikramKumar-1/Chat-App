// import { api } from "./api"
// import type { BackendMessage, Message } from "../types/chat.types"

// export const conversationService = {
//   async openPrivate(userId: string): Promise<{ id: string }> {
//     const { data } = await api.post<{ id: string }>(
//       `/conversations/private/${userId}`
//     )

//     return data
//   },

//   async fetchMessages(conversationId: string): Promise<Message[]> {
//     const { data } = await api.get<BackendMessage[]>(
//       `/conversations/${conversationId}/messages`
//     )

//     return data.map((msg) => ({
//       id: String(msg.id),
//       chatId: String(msg.conversation_id),
//       senderId: String(msg.sender_id),
//       content: msg.body,
//       createdAt: msg.created_at,
//       status: msg.seen_at ? "seen" : "sent",
//     }))
//   },
// }

import { api } from "../lib/api"
import type {
  Chat,
  Message,
  BackendMessage,
  Conversation,
} from "../types/chat.types"

/* ============================= */
/* 🔥 Backend Response Types */
/* ============================= */

interface BackendConversation {
  conversation_id: number
  type: "private" | "group"
  title: string
  last_message: string | null
  last_message_time: string | null
  unread_count: number
}

/* ============================= */
/* 🔥 Conversation Service */
/* ============================= */

export const conversationService = {
  /* ---------------------------------- */
  /* 🔹 Fetch All Conversations */
  /* ---------------------------------- */
  async fetchConversations(): Promise<Chat[]> {
    const { data } = await api.get<BackendConversation[]>(
      "/conversations"
    )

    return data.map((item) => ({
      id: String(item.conversation_id),
      name: item.title,
      unreadCount: item.unread_count ?? 0,
      lastMessage: item.last_message ?? "",
    }))
  },

  /* ---------------------------------- */
  /* 🔹 Open Private Chat */
  /* ---------------------------------- */
  async openPrivate(userId: string): Promise<Conversation> {
    const { data } = await api.post<Conversation>(
      `/conversations/private/${userId}`
    )

    return {
      id: String(data.id),
    }
  },

  /* ---------------------------------- */
  /* 🔹 Fetch Messages */
  /* ---------------------------------- */
  async fetchMessages(conversationId: string): Promise<Message[]> {
    const response = await api.get(
      `/conversations/${conversationId}/messages`
    )

    const raw = response.data

    // Handle case if backend wraps inside object
    const messagesArray: BackendMessage[] = Array.isArray(raw)
      ? raw
      : Array.isArray(raw.data)
      ? raw.data
      : []

    return messagesArray.map((msg) => ({
      id: String(msg.id),
      chatId: String(msg.conversation_id),
      senderId: String(msg.sender_id),
      content: msg.content, // MUST match DB column
      createdAt: msg.created_at,
      status: msg.seen_at ? "seen" : "sent",
    }))
  },

  /* ---------------------------------- */
  /* 🔹 Send Message */
  /* ---------------------------------- */
  async sendMessage(
    conversationId: string,
    content: string
  ): Promise<Message> {
    const { data } = await api.post<BackendMessage>(
      "/messages/send",
      {
        conversation_id: conversationId,
        type: "text",
        content,
      }
    )

    return {
      id: String(data.id),
      chatId: String(data.conversation_id),
      senderId: String(data.sender_id),
      content: data.content,
      createdAt: data.created_at,
      status: "sent",
    }
  },

  /* ---------------------------------- */
  /* 🔹 Mark Messages Seen */
  /* ---------------------------------- */
  async markSeen(conversationId: string): Promise<void> {
    await api.post(`/conversations/${conversationId}/seen`)
  },

  /* ---------------------------------- */
  /* 🔹 Delete Message (For Everyone) */
  /* ---------------------------------- */
  async deleteMessage(messageId: string): Promise<void> {
    await api.delete(`/messages/${messageId}`)
  },

   markDelivered: async (
   messageId: string,
   conversationId: string
    ): Promise<void> => {
    await api.post(`/conversations/${conversationId}/delivered`, {
    message_id: messageId,
    })
  },
}