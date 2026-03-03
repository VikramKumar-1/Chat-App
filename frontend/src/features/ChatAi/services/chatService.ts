import { api } from "../lib/api"

import type { Chat, Message } from "../types/chat.types"

export const chatService = {
  async fetchChats(): Promise<Chat[]> {
    const { data } = await api.get<Chat[]>("/api/chats")
    return data
  },

  async fetchMessages(chatId: string): Promise<Message[]> {
    const { data } = await api.get<Message[]>(`/api/chats/${chatId}/messages`)
    return data
  },
}