// import { useChatStore } from "../../store/useChatStore"

// export const ChatHeader = () => {
//   const { activeChatId, chats } = useChatStore()

//   const activeChat = chats.find((c) => c.id === activeChatId)

//   if (!activeChat) return null

//   return (
//     <div className="h-16 px-4 flex items-center justify-between 
//                     border-b border-neutral-800 bg-neutral-950">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-full bg-neutral-700" />
//         <div>
//           <p className="font-semibold">{activeChat.name}</p>
//           <p className="text-xs text-neutral-400">Online</p>
//         </div>
//       </div>

//       <div className="hidden sm:flex gap-4 text-neutral-400">
//         <button>Search</button>
//         <button>More</button>
//       </div>
//     </div>
//   )
// }

import { ArrowLeft } from "lucide-react"
import { useChatStore } from "../../store/useChatStore"

export const ChatHeader = () => {
  const { activeChatId, chats, setActiveChat } = useChatStore()

  const activeChat = chats.find((c) => c.id === activeChatId)

  if (!activeChat) return null

  return (
    <div
      className="h-16 px-4 flex items-center justify-between
                 border-b border-neutral-800 bg-neutral-950"
    >
      <div className="flex items-center gap-3">

        {/* 🔥 Back Arrow (Mobile Only) */}
        <button
          onClick={() => setActiveChat(null)}
          className="md:hidden p-2 rounded-full hover:bg-neutral-800 transition"
        >
          <ArrowLeft size={22} />
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-neutral-700" />

        {/* Name */}
        <div>
          <p className="font-semibold">{activeChat.name}</p>
          <p className="text-xs text-neutral-400">Online</p>
        </div>
      </div>

      {/* Desktop Actions 
      <div className="hidden md:flex gap-4 text-neutral-400">
        <button>Search</button>
        <button>More</button>
      </div>*/}
    </div>
  )
}