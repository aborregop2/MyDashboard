import { useState } from "react"
import { Menubar } from "primereact/menubar"
import { Menu } from "lucide-react"
import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"
import { useNavigate } from "react-router"
import { useAuthStore, useDarkmodeStore, useShowSidebar } from "../../store/index"

export default function Topbar() {
  const { user, setUser } = useAuthStore()
  const { isDarkmode, setIsDarkmode } = useDarkmodeStore()
  const { showSidebar, setShowSidebar } = useShowSidebar()

  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const changeTheme = (theme: string) => {
    const existingLink = document.getElementById("theme-link")
    if (existingLink) existingLink.remove()

    const link = document.createElement("link")
    link.id = "theme-link"
    link.rel = "stylesheet"
    link.href = theme === "dark" ? "/dark-blue.css" : "/light-blue.css"
    document.head.appendChild(link)
  }

  changeTheme(isDarkmode ? "dark" : "light")

  const topbarBgColor = !isDarkmode ? { backgroundColor: "#12a14b" } : {}

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
      <h1 className={`text-xl font-bold tracking-wide ${!isDarkmode ? "text-white" : "text-blue-500"}`}>
        THE BIG BIG COMPANY
      </h1>
    </div>
  )

  const renderAvatar = () => (
    <div className="relative">
      <Avatar
        size="large"
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
        onClick={() => setShowMenu(!showMenu)}
        className="hover:ring-2 ring-blue-300 transition-all cursor-pointer"
        aria-haspopup="true"
        aria-expanded={showMenu}
      />

      {showMenu && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 z-50
            transition-all duration-200 origin-top-right animate-slide-down ${isDarkmode ? 'bg-slate-800' : 'bg-white'}
            `}
        >
          <div className="py-1.5">
            <Button
              text
              className={`flex items-center px-4 py-2.5 text-sm hover:bg-gray-100/20 transition-colors w-full justify-start`}
              onClick={() => setIsDarkmode(!isDarkmode)}
              icon={`pi ${isDarkmode ? "pi-sun" : "pi-moon"}`}
              label={isDarkmode ? "Light Mode" : "Dark Mode"}
            />
            <hr className="my-1 border-gray-100 dark:border-gray-700" />
            <Button
              text
              className={`flex items-center px-4 py-2.5 text-sm hover:bg-gray-100/20 transition-colors w-full justify-start`}
              onClick={() => {
                setUser(null)
                navigate("/")
              }}
              icon="pi pi-sign-out"
              label="Logout"
            />
          </div>
        </div>
      )}
    </div>
  )

  const end = renderAvatar()

  return (
    <Menubar start={start} end={end} style={topbarBgColor} className="transition-all duration-300 h-16 shadow-sm" 
    submenuIcon = {undefined}
    menuIcon = {undefined}/>
  )
}

