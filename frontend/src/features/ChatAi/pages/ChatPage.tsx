// import { useEffect, useRef } from "react"
// import Echo from "laravel-echo"

// import { useChatStore } from "../store/useChatStore"
// import { conversationService } from "../services/conversationService"
// import { ChatLayout } from "../components/layout/ChatLayout"
// import { initEcho } from "../../../lib/echo"

// import type { Message } from "../types/chat.types"

// interface MessageSentEvent {
//   id: number
//   conversation_id: number
//   content: string
//   sender_id: number
//   created_at: string
// }

// interface MessageSeenEvent {
//   messageId: number
//   conversationId: number
// }



// export const ChatPage = () => {
//   const setChats = useChatStore((s) => s.setChats)
//   const setIsLoadingChats = useChatStore((s) => s.setIsLoadingChats)
//   const activeChatId = useChatStore((s) => s.activeChatId)
//   const addMessage = useChatStore((s) => s.addMessage)

//   const echoRef = useRef<Echo | null>(null)
//   const hasLoadedRef = useRef(false)
//   console.log("INIT ECHO EFFECT RUNNING")
//   // ================= LOAD CONVERSATIONS =================
//   useEffect(() => {
//     if (hasLoadedRef.current) return
//     hasLoadedRef.current = true

//     const loadChats = async (): Promise<void> => {
//       try {
//         const chats = await conversationService.fetchConversations()
//         setChats(chats)
//       } catch (error) {
//         console.error("Failed to load chats:", error)
//       } finally {
//         setIsLoadingChats(false)
//       }
//     }

//     loadChats()
//   }, [setChats, setIsLoadingChats])

//   // ================= INITIALIZE ECHO (ONCE) =================
  
//   useEffect(() => {
//   const token = localStorage.getItem("access_token")
//   if (!token) return

//   const echo = initEcho(token)
//   echoRef.current = echo

//   echo.connector.pusher.connection.bind("connected", () => {
//     console.log("Reverb Connected ✅")
//   })

//   return () => {
//     // Only disconnect if not in development strict double-mount
//     if (import.meta.env.PROD) {
//       echo.disconnect()
//       echoRef.current = null
//     }
//   }
// }, [])

//   // ================= JOIN CHANNEL WHEN CHAT CHANGES =================
//   useEffect(() => {
//     if (!activeChatId) return
//     if (!echoRef.current) return

//     const channelName = `conversation.${activeChatId}`

//     console.log("Subscribing to:", channelName)

//     const channel = echoRef.current.private(channelName)

//     channel.listen(".message.sent", (event: MessageSentEvent) => {
//      // console.log("Realtime message received:", event)

//       const mappedMessage: Message = {
//         id: String(event.id),
//         chatId: String(event.conversation_id),
//         content: event.content,
//         senderId: String(event.sender_id),
//         status: "delivered",
//         createdAt: event.created_at,
//       }

//       addMessage(mappedMessage)

//        // 🔥 Immediately notify backend that message delivered
//      conversationService.markDelivered(
//      String(event.id),
//      String(event.conversation_id)
//   )
//     })
//      // 🔥 2️⃣ ADD THIS FOR SEEN TICKS

//      channel.listen(".message.seen", (event: MessageSeenEvent) => {
//      console.log("Message seen event:", event)

//      useChatStore.getState().updateMessageStatus(
//       String(event.conversationId),
//       String(event.messageId),
//       "seen"
//      )
//    })
//     return () => {
//       echoRef.current?.leave(channelName)
//     }
//   }, [activeChatId, addMessage])

//   return <ChatLayout />
// }

import { useEffect, useRef } from "react"
import Echo from "laravel-echo"

import { useChatStore } from "../store/useChatStore"
import { conversationService } from "../services/conversationService"
import { ChatLayout } from "../components/layout/ChatLayout"
import { initEcho } from "../../../lib/echo"

import type { Message } from "../types/chat.types"

// ================= SOCKET EVENT TYPES =================

interface MessageSentEvent {
  id: number
  conversation_id: number
  content: string
  sender_id: number
  created_at: string
}

interface MessageSeenEvent {
  messageId: number
  conversationId: number
}



export const ChatPage = () => {
  const setChats = useChatStore((s) => s.setChats)
  const setIsLoadingChats = useChatStore((s) => s.setIsLoadingChats)
  const activeChatId = useChatStore((s) => s.activeChatId)
  const addMessage = useChatStore((s) => s.addMessage)

  const echoRef = useRef<Echo | null>(null)
  const hasLoadedRef = useRef(false)

  // ================= LOAD CONVERSATIONS =================
  useEffect(() => {
    if (hasLoadedRef.current) return
    hasLoadedRef.current = true

    const loadChats = async (): Promise<void> => {
      try {
        const chats = await conversationService.fetchConversations()
        setChats(chats)
      } catch (error) {
        console.error("Failed to load chats:", error)
      } finally {
        setIsLoadingChats(false)
      }
    }

    loadChats()
  }, [setChats, setIsLoadingChats])

  // ================= INITIALIZE ECHO =================
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) return

    const echo = initEcho(token)
    echoRef.current = echo

    echo.connector.pusher.connection.bind("connected", () => {
      console.log("Reverb Connected ✅")
    })

    return () => {
      if (import.meta.env.PROD) {
        echo.disconnect()
        echoRef.current = null
      }
    }
  }, [])

  // ================= JOIN PRIVATE CHANNEL =================
  useEffect(() => {
    if (!activeChatId) return
    if (!echoRef.current) return

    const channelName = `conversation.${activeChatId}`
    const channel = echoRef.current.private(channelName)

   

    // ================= MESSAGE SENT =================
     channel.listen(".message.sent", (event: MessageSentEvent) => {

      const currentUserId = localStorage.getItem("user_id")

     const isMyMessage =
      String(event.sender_id) === String(currentUserId)

      const mappedMessage: Message = {
    id: String(event.id),
    chatId: String(event.conversation_id),
    content: event.content,
    senderId: String(event.sender_id),
    status: isMyMessage ? "sent" : "sent",
    createdAt: event.created_at,

     
   }

       addMessage(mappedMessage)
       
       if (!isMyMessage && activeChatId === String(event.conversation_id)) {
    conversationService.markSeen(
      String(event.conversation_id)
    )
  }
      

      
      })

   

    // ================= MESSAGE SEEN =================
    channel.listen(".message.seen", (event: MessageSeenEvent) => {
      useChatStore.getState().updateMessageStatus(
        String(event.conversationId),
        String(event.messageId),
        "seen"
      )
    })

    return () => {
      echoRef.current?.leave(channelName)
    }

  }, [activeChatId, addMessage])

  return <ChatLayout />
}