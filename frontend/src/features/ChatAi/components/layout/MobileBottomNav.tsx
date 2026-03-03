import { useState } from "react"
import { MessageCircle, Users, Bell, Settings } from "lucide-react"

type TabType = "chats" | "friends" | "notifications" | "settings"

export const MobileBottomNav = () => {
  const [activeTab, setActiveTab] = useState<TabType>("chats")

  const baseClass =
    "flex flex-col items-center justify-center text-xs gap-1"

  const activeClass = "text-blue-500"
  const inactiveClass = "text-neutral-400"

  return (
    <div
      className="
        backdrop-blur-xl bg-white/10 border border-white/20
        rounded-2xl flex justify-around py-3 shadow-lg
      "
    >
      {/* Chats */}
      <button
        type="button"
        onClick={() => setActiveTab("chats")}
        className={`${baseClass} ${
          activeTab === "chats" ? activeClass : inactiveClass
        }`}
      >
        <MessageCircle size={20} />
        Chats
      </button>

      {/* Friends */}
      <button
        type="button"
        onClick={() => setActiveTab("friends")}
        className={`${baseClass} ${
          activeTab === "friends" ? activeClass : inactiveClass
        }`}
      >
        <Users size={20} />
        Friends
      </button>

      {/* Notifications */}
      <button
        type="button"
        onClick={() => setActiveTab("notifications")}
        className={`${baseClass} ${
          activeTab === "notifications" ? activeClass : inactiveClass
        }`}
      >
        <Bell size={20} />
        Alerts
      </button>

      {/* Settings */}
      <button
        type="button"
        onClick={() => setActiveTab("settings")}
        className={`${baseClass} ${
          activeTab === "settings" ? activeClass : inactiveClass
        }`}
      >
        <Settings size={20} />
        Settings
      </button>
    </div>
  )
}