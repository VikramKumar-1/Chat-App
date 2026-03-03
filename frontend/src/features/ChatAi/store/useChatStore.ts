import { create } from "zustand"
import type {
  ChatState,
  Chat,
  ChatId,
  Message,
  User,
  FriendRequest,
  UserId,
} from "../types/chat.types"

interface ChatActions {
  setChats: (chats: Chat[]) => void
  setActiveChat: (chatId: ChatId | null) => void
  addMessage: (message: Message) => void
  setMessages: (chatId: ChatId, messages: Message[]) => void
  updateMessageStatus: (
    chatId: ChatId,
    messageId: string,
    status: Message["status"]
  ) => void
  setIsLoadingChats: (value: boolean) => void
}

interface FriendState {
  users: User[]
  friends: User[]
  friendRequests: FriendRequest[]

  setUsers: (users: User[]) => void
  setFriends: (friends: User[]) => void
  setFriendRequests: (requests: FriendRequest[]) => void

  addFriend: (user: User) => void
}

interface PresenceState {
  onlineUsers: UserId[]
  setOnlineUsers: (ids: UserId[]) => void
  addOnlineUser: (id: UserId) => void
  removeOnlineUser: (id: UserId) => void
}

type StoreState = ChatState &
  ChatActions &
  FriendState &
  PresenceState & {
    isLoadingChats: boolean
  }

export const useChatStore = create<StoreState>((set) => ({
  // ================= CHAT =================
  chats: [],
  activeChatId: null,
  messages: {},
  typingUsers: {},
  isLoadingChats: true,

  setChats: (chats) => set({ chats }),

  setActiveChat: (chatId) =>
    set((state) => ({
      activeChatId: chatId,
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, unreadCount: 0 }
          : chat
      ),
    })),

  setMessages: (chatId, messages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: messages,
      },
    })),

       addMessage: (message) =>
  set((state) => {
    const chatKey = String(message.chatId)
    const existing = state.messages[chatKey] ?? []

    //  Prevent duplicate messages
    const alreadyExists = existing.some(
      (msg) => String(msg.id) === String(message.id)
    )

    if (alreadyExists) {
      return state
    }

    return {
      messages: {
        ...state.messages,
        [chatKey]: [...existing, message],
      },
      chats: state.chats.map((chat) =>
        String(chat.id) === chatKey
          ? {
              ...chat,
              lastMessage: message.content,
            }
          : chat
      ),
    }
  }),

   updateMessageStatus: (chatId, messageId, status) =>
  set((state) => {
    const chatKey = String(chatId)

    return {
      messages: {
        ...state.messages,
        [chatKey]: (state.messages[chatKey] ?? []).map((msg) =>
          String(msg.id) === String(messageId)
            ? { ...msg, status }
            : msg
        ),
      },
    }
  }),

  setIsLoadingChats: (value) =>
    set({ isLoadingChats: value }),

  // ================= FRIENDS =================
  users: [],
  friends: [],
  friendRequests: [],

  setUsers: (users) => set({ users }),
  setFriends: (friends) => set({ friends }),
  setFriendRequests: (requests) =>
    set({ friendRequests: requests }),

  // ⚠️ DO NOT CREATE RANDOM CHAT ID HERE
  // Backend must create conversation
  addFriend: (user) =>
    set((state) => ({
      friends: [...state.friends, user],
    })),

  // ================= PRESENCE =================
  onlineUsers: [],

  setOnlineUsers: (ids) =>
    set({ onlineUsers: ids }),

  addOnlineUser: (id) =>
    set((state) => ({
      onlineUsers: [...state.onlineUsers, id],
    })),

  removeOnlineUser: (id) =>
    set((state) => ({
      onlineUsers: state.onlineUsers.filter(
        (u) => u !== id
      ),
    })),
}))