import type { Message } from "../../types/chat.types"
import { Check, CheckCheck } from "lucide-react"

interface Props {
  message: Message
  currentUserId: string
}

export const MessageBubble = ({
  message,
  currentUserId,
}: Props) => {
  const isMe =
    String(message.senderId) ===
    String(currentUserId)

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <div
      className={`flex w-full ${
        isMe ? "justify-end" : "justify-start"
      } mt-1`}
    >
      <div
        className={`
          max-w-[70%]
          px-3 py-2
          text-[14px]
          leading-relaxed
          break-words
          shadow-sm
          ${
            isMe
              ? "bg-[#005c4b] text-white rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl"
              : "bg-[#202c33] text-white rounded-tr-2xl rounded-br-2xl rounded-tl-2xl"
          }
        `}
      >
        <p>{message.content}</p>

         <div className="flex items-center justify-end gap-1 text-[11px] mt-1">
          <span className="text-neutral-300">
          {formatTime(message.createdAt)}
        </span>

          {isMe && (
            <div className="flex items-center">
            {message.status === "sent" && (
            <Check size={14} className="text-gray-300" />
          )}

          {message.status === "delivered" && (
          <CheckCheck size={14} className="text-gray-300" />
       )}

        {message.status === "seen" && (
         <CheckCheck size={14} className="text-blue-400" />
        )}
         </div>
      )}
        </div>
      </div>
    </div>
  )
}