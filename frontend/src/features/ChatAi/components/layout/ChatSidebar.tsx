// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { Search } from "lucide-react"

// import { useChatStore } from "../../store/useChatStore"
// import type { Chat } from "../../types/chat.types"
// import { SearchOverlay } from "../search/SearchOverlay"
// export const ChatSidebar = () => {
//   const { chats, activeChatId, setActiveChat, setChats } = useChatStore()
//   const navigate = useNavigate()

//   const [openSearch, setOpenSearch] = useState(false)

//   // Temporary mock data (remove when API connected)
//   useEffect(() => {
//     if (chats.length === 0) {
//       const mockChats: Chat[] = [
//         {
//           id: "1",
//           name: "Rahul Sharma",
//           unreadCount: 2,
//           lastMessage: "Let's meet tomorrow",
//         },
//         {
//           id: "2",
//           name: "Priya Singh",
//           unreadCount: 0,
//           lastMessage: "Project completed",
//         },
//       ]

//       setChats(mockChats)
//     }
//   }, [chats.length, setChats])

//   return (
//     <>
//       <div className="flex flex-col w-full h-full bg-neutral-950 text-white">

//         {/* Header */}
//         <div className="h-16 px-4 flex items-center justify-between border-b border-neutral-800">

//           {/* App Name */}
//           <h1 className="text-lg font-semibold tracking-tight">
//             ChatAi
//           </h1>

//           {/* Search Icon */}
//           <button
//             type="button"
//             onClick={() => setOpenSearch(true)}
//             className="p-2 rounded-lg hover:bg-neutral-800 transition"
//           >
//             <Search size={20} />
//           </button>
//         </div>

//         {/* Chat List or Empty State */}
//         {chats.length === 0 ? (
//           <div className="flex flex-col items-center justify-center flex-1 text-center px-6">

//             <p className="text-neutral-400 text-sm mb-4">
//               Please add a friend to start chatting
//             </p>

//             <button
//               type="button"
//               onClick={() => navigate("/friends")}
//               className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
//             >
//               Add Friend
//             </button>

//           </div>
//         ) : (
//           <div className="flex-1 overflow-y-auto">

//             {chats.map((chat) => {
//               const isActive = chat.id === activeChatId

//               return (
//                 <button
//                   key={chat.id}
//                   type="button"
//                   onClick={() => setActiveChat(chat.id)}
//                   className={`
//                     w-full text-left px-4 py-3 border-b border-neutral-800
//                     hover:bg-neutral-900 transition
//                     ${isActive ? "bg-neutral-900" : ""}
//                   `}
//                 >
//                   <div className="flex justify-between items-center">
//                     <p className="font-medium">{chat.name}</p>

//                     {chat.unreadCount > 0 && (
//                       <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">
//                         {chat.unreadCount}
//                       </span>
//                     )}
//                   </div>

//                   {chat.lastMessage && (
//                     <p className="text-sm text-neutral-400 truncate">
//                       {chat.lastMessage}
//                     </p>
//                   )}
//                 </button>
//               )
//             })}

//           </div>
//         )}

//       </div>

//       {/* Search Overlay */}
//       {openSearch && (
//         <SearchOverlay onClose={() => setOpenSearch(false)} />
//       )}
//     </>
//   )
// }

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"

import { useChatStore } from "../../store/useChatStore"
import { SearchOverlay } from "../search/SearchOverlay"

export const ChatSidebar = () => {
  const chats = useChatStore((s) => s.chats)
  const activeChatId = useChatStore((s) => s.activeChatId)
  const setActiveChat = useChatStore((s) => s.setActiveChat)
  const isLoading = useChatStore((s) => s.isLoadingChats)

  const navigate = useNavigate()
  const [openSearch, setOpenSearch] = useState(false)

  return (
    <>
      <div className="flex flex-col w-full h-full bg-neutral-950 text-white">

        {/* ================= HEADER ================= */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-neutral-800">
          <h1 className="text-lg font-semibold tracking-tight">
            ChatAi
          </h1>

          <button
            type="button"
            onClick={() => setOpenSearch(true)}
            className="p-2 rounded-lg hover:bg-neutral-800 transition"
          >
            <Search size={20} />
          </button>
        </div>

        {/* ================= LOADING ================= */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center text-neutral-400">
            Loading chats...
          </div>
        ) : chats.length === 0 ? (
          /* ================= EMPTY STATE ================= */
          <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
            <p className="text-neutral-400 text-sm mb-4">
              Please add a friend to start chatting
            </p>

            <button
              type="button"
              onClick={() => navigate("/friends")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              Add Friend
            </button>
          </div>
        ) : (
          /* ================= CHAT LIST ================= */
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => {
              const isActive = chat.id === activeChatId

              return (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => setActiveChat(chat.id)}
                  className={`w-full text-left px-4 py-3 border-b border-neutral-800 hover:bg-neutral-900 transition ${
                    isActive ? "bg-neutral-900" : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{chat.name}</p>

                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>

                  {chat.lastMessage && (
                    <p className="text-sm text-neutral-400 truncate">
                      {chat.lastMessage}
                    </p>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ================= SEARCH OVERLAY ================= */}
      {openSearch && (
        <SearchOverlay onClose={() => setOpenSearch(false)} />
      )}
    </>
  )
}