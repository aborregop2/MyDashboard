import { Menu } from "lucide-react"
import { useAuthStore, useDarkmodeStore, useShowSidebar } from "../../store/index"
import MyMenubar from "../ui/MyMenubar"
import MenuAvatar from "./topbar/MenuAvatar"


export default function Topbar() {
  const { user } = useAuthStore()
  const { isDarkmode } = useDarkmodeStore()
  const { showSidebar, setShowSidebar } = useShowSidebar()

  const start = (
    <div className="flex items-center gap-3">
      {user && (
        <Menu
          size={30}
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 hover:bg-gray-100/20 rounded-full transition-all cursor-pointer"
        />
      )}
      <img
        alt="logo"
        src="https://primefaces.org/cdn/primereact/images/logo.png"
        width={50}
        className="mr-2 hover:scale-105 transition-transform"
      />
      <h1 className="text-xl font-bold tracking-wide text-black dark:text-white">
        THE BIG BIG COMPANY
      </h1>
    </div>
  )



  const end = <MenuAvatar />

  return (
      <MyMenubar 
        start={start} 
        end={end} 
        style={{ 
          backgroundColor: isDarkmode ? "#1a202c" : "#12a14b", 
          border: 'none' 
        }}
        className="transition-all duration-300 h-16 border-0"
      />
  )
}

