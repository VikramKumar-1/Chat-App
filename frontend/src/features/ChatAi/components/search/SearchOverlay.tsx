import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
} from "react"
import { X } from "lucide-react"
import { useChatStore } from "../../store/useChatStore"
import { userService } from "../../services/UserService"
import { conversationService } from "../../services/conversationService"
import type { User} from "../../types/chat.types"

interface Props {
  onClose: () => void
}

export const SearchOverlay = ({ onClose }: Props) => {
  const [query, setQuery] = useState<string>("")
  const [results, setResults] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
   const [opening, setOpening] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const { setChats, setMessages, setActiveChat } = useChatStore()

  // ✅ Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const value = e.target.value
    setQuery(value)

    if (value.trim().length < 2) {
      setResults([])
      return
    }

    try {
      setLoading(true)
      const users = await userService.search(value)

      setResults(Array.isArray(users) ? users : [])
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

 const handleOpenChat = async (user: User): Promise<void> => {
  if (opening) return

  try {
    setOpening(true)
    onClose()

    const conversation = await conversationService.openPrivate(user.id)
    const conversationId = conversation.id

    const updatedChats =
      await conversationService.fetchConversations()

    setChats(updatedChats)

    const messages =
      await conversationService.fetchMessages(conversationId)

    setMessages(conversationId, messages)
    setActiveChat(conversationId)

  } catch (error) {
    console.error("Open chat error:", error)
  } finally {
    setOpening(false)
  }
}

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">

      <div
        ref={overlayRef}
        className="w-full max-w-md bg-neutral-900 rounded-xl border border-neutral-800 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
          <input
            autoFocus
            value={query}
            onChange={handleChange}
            placeholder="Search users..."
            className="flex-1 bg-transparent outline-none text-white"
          />

          <button
            onClick={onClose}
            className="ml-3 p-1 hover:bg-neutral-800 rounded"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">

          {/* 🔥 Instagram Skeleton Loader */}
          {loading &&
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-3 animate-pulse"
              >
                <div className="w-8 h-8 rounded-full bg-neutral-800 mr-3" />
                <div className="flex-1 h-3 bg-neutral-800 rounded" />
              </div>
            ))}

          {!loading &&
            results.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleOpenChat(user)}
                className="w-full text-left px-4 py-3 hover:bg-neutral-800 border-b border-neutral-800 text-white transition"
              >
                {user.username ?? user.name}
              </button>
            ))}

          {!loading &&
            results.length === 0 &&
            query.length >= 2 && (
              <div className="p-4 text-sm text-neutral-500">
                No users found
              </div>
            )}
        </div>
      </div>
    </div>
  )
}