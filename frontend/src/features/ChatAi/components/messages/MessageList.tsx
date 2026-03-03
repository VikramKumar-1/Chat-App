import { useChatStore } from "../../store/useChatStore"
import { MessageBubble } from "./MessageBubble"
import type { ChatId } from "../../types/chat.types"
import { useEffect, useRef } from "react"

interface Props {
  chatId: ChatId
}

export const MessageList = ({ chatId }: Props) => {
  const messagesFromStore = useChatStore(
    (state) => state.messages[chatId]
  )

  const messages = messagesFromStore || []

  const currentUserId = localStorage.getItem("user_id") ?? ""

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-b from-[#0b141a] to-[#111b21] flex flex-col">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          currentUserId={currentUserId}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}