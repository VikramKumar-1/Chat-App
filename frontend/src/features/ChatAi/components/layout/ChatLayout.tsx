// import { useChatStore } from "../../store/useChatStore"
// import { ChatSidebar } from "./ChatSidebar"
// import { ChatWindow } from "./ChatWindow"
// import { MobileBottomNav } from "./MobileBottomNav"

// export const ChatLayout = () => {
//   const { activeChatId } = useChatStore()

//   return (
//     <div className="h-screen flex bg-neutral-950 text-white relative">

//       {/* Sidebar */}
//       <div
//         className={`
//           w-80 border-r border-neutral-800 bg-neutral-950
//           ${activeChatId ? "hidden md:flex" : "flex"}
//         `}
//       >
//         <ChatSidebar />
//       </div>

//       {/* Chat Window */}
//       <div
//         className={`
//           flex-1 flex flex-col
//           ${!activeChatId ? "hidden md:flex" : "flex"}
//         `}
//       >
//         <ChatWindow />
//       </div>

//       {/* Mobile Bottom Nav */}
//       <div className="md:hidden fixed bottom-4 left-0 right-0 px-4">
//         <MobileBottomNav />
//       </div>

//     </div>
//   )
// }
import { useChatStore } from "../../store/useChatStore"
import { ChatSidebar } from "./ChatSidebar"
import { ChatWindow } from "./ChatWindow"
import { MobileBottomNav } from "./MobileBottomNav"

export const ChatLayout = () => {
  const { activeChatId } = useChatStore()

  return (
    <div className="h-screen flex bg-neutral-950 text-white">

      {/* Sidebar */}
      <div
        className={`
          w-full md:w-80 border-r border-neutral-800
          ${activeChatId ? "hidden md:flex" : "flex"}
        `}
      >
        <ChatSidebar />
      </div>

      {/* Chat Window */}
      <div
        className={`
          flex-1 flex flex-col
          ${activeChatId ? "flex" : "hidden md:flex"}
        `}
      >
        <ChatWindow />
      </div>

      {/* Mobile Bottom Nav */}
      {!activeChatId && (
      <div className="md:hidden fixed bottom-4 left-0 right-0 px-4">
      <MobileBottomNav />
     </div>
     )}
    </div>
  )
}