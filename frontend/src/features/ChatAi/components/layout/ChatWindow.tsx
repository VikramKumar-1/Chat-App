// import { useChatStore } from "../../store/useChatStore"//"../../store/chatStore"
// import { ChatHeader } from "../header/ChatHeader"
// import { MessageList } from "../messages/MessageList"
// import { MessageInput } from "../messages/MessageInput"

// export const ChatWindow = () => {
//   const { activeChatId } = useChatStore()

//   if (!activeChatId) {
//     return (
//       <div className="flex-1 flex items-center justify-center text-neutral-500">
//         Select a chat
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col h-full bg-neutral-950">
//       <ChatHeader />
//       <MessageList chatId={activeChatId} />
//       <MessageInput chatId={activeChatId} />
//     </div>
//   )
// }

import { useEffect } from "react"
import { useChatStore } from "../../store/useChatStore"
import { conversationService } from "../../services/conversationService"
import { ChatHeader } from "../header/ChatHeader"
import { MessageList } from "../messages/MessageList"
import { MessageInput } from "../messages/MessageInput"

export const ChatWindow = () => {
  const {
    activeChatId,
    setMessages,
  } = useChatStore()

  useEffect(() => {
    if (!activeChatId) return

    const loadMessages = async (): Promise<void> => {
      try {
        const messages =
          await conversationService.fetchMessages(activeChatId)

        setMessages(activeChatId, messages)

        await conversationService.markSeen(activeChatId)
      } catch (error) {
        console.error("Load messages failed:", error)
      }
    }

    loadMessages()
  }, [activeChatId, setMessages])

  if (!activeChatId) {
    return (
      <div className="flex-1 flex items-center justify-center text-neutral-500">
        Select a chat
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-[#0b141a]">
    
      <ChatHeader />
      <MessageList chatId={activeChatId} />
      <MessageInput chatId={activeChatId} />
    </div>
  )
}