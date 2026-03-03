// import { useState, type ChangeEvent, type KeyboardEvent } from "react"
// import { useChatStore } from "../../store/useChatStore"
// import type { ChatId } from "../../types/chat.types"
// import { api } from "../../lib/api" // make sure correct path

// interface Props {
//   chatId: ChatId
// }

// export const MessageInput = ({ chatId }: Props) => {
//   const [text, setText] = useState<string>("")
//   const addMessage = useChatStore((state) => state.addMessage)

//   const handleSend = async (): Promise<void> => {
//     const trimmed = text.trim()
//     if (!trimmed) return

//     try {
//       const { data } = await api.post("/messages/send", {
//         conversation_id: chatId,
//         type: "text",
//         content: trimmed,
//       })

//       // Add backend message response
//       addMessage({
//         id: String(data.id),
//         chatId: String(data.conversation_id),
//         senderId: String(data.sender_id),
//         content: data.content,
//         createdAt: data.created_at,
//         status: "sent",
//       })

//       setText("")
//     } catch (error) {
//       console.error("Send message error:", error)
//     }
//   }

//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       handleSend()
//     }
//   }

//   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     setText(e.target.value)
//   }

//   return (
//     <div className="border-t border-neutral-800 p-3 flex gap-2">
//       <input
//         value={text}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         className="flex-1 bg-neutral-900 rounded-xl px-4 py-2 outline-none"
//         placeholder="Type a message..."
//       />
//       <button
//         onClick={handleSend}
//         className="bg-blue-600 px-4 py-2 rounded-lg"
//       >
//         Send
//       </button>
//     </div>
//   )
// }

import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { useChatStore } from "../../store/useChatStore"
import type { ChatId } from "../../types/chat.types"
import { api } from "../../lib/api"

interface Props {
  chatId: ChatId
}

export const MessageInput = ({ chatId }: Props) => {
  const [text, setText] = useState<string>("")
  const addMessage = useChatStore((s) => s.addMessage)

  const handleSend = async (): Promise<void> => {
    const trimmed = text.trim()
    if (!trimmed) return

    try {
      const { data } = await api.post("/messages/send", {
        conversation_id: chatId,
        type: "text",
        content: trimmed,
      })

      addMessage({
        id: String(data.id),
        chatId: String(data.conversation_id),
        senderId: String(data.sender_id),
        content: data.content,
        createdAt: data.created_at,
        status: "sent",
      })

      setText("")
    } catch (error) {
      console.error("Send message failed:", error)
    }
  }

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setText(e.target.value)
  }

  return (
    <div className="border-t border-neutral-800 p-3 flex gap-2">
      <input
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-neutral-900 rounded-xl px-4 py-2 outline-none"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  )
}