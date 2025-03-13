"use client"
import { useState } from "react"
import { Menubar } from "primereact/menubar"
import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"
import { useAuthStore, useDarkmodeStore } from "../store/index"
import { useNavigate } from "react-router"

export default function Topbar() {
  const { isAuth, setIsAuth } = useAuthStore()
  const { isDarkmode, setIsDarkmode } = useDarkmodeStore()
  const [showMenu, setShowMenu] = useState(false)

  const navigator = useNavigate()

  const changeTheme = (theme: string) => {
    const existingLink = document.getElementById('theme-link');
    if (existingLink) {
        existingLink.remove();
    }

    const link = document.createElement('link');
    link.id = 'theme-link';
    link.rel = 'stylesheet';
    link.href = theme === 'dark'
        ? '/dark-blue.css'
        :  '/light-blue.css';

    document.head.appendChild(link);
  }

  changeTheme(isDarkmode ? 'dark' : 'light');


  const start = (
    <div className="flex items-center gap-2">
      <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" width={50} className="mr-2" />
      <h1 className="text-blue-500 text-xl font-bold">THE BIG BIG COMPANY</h1>
    </div>
  )

  const renderDarkModeToggle = () => (
    <Button
      icon={isDarkmode ? "pi pi-sun" : "pi pi-moon"}
      rounded
      text
      aria-label="Toggle dark mode"
      onClick={() => setIsDarkmode(!isDarkmode)}
      className="p-button-lg"
    />
  )

  const renderAvatar = () => (
    <div className="relative">
      <Avatar
        size="large"
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
        onClick={() => setShowMenu(!showMenu)}
        className="cursor-pointer"
      />

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <a
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsDarkmode(!isDarkmode)}
            >
              <i className={`pi ${isDarkmode ? "pi-sun" : "pi-moon"} mr-2`}></i>
              {isDarkmode ? "Light Mode" : "Dark Mode"}
            </a>
            <a
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setIsAuth(false)
                navigator("/auth")
              }}
            >
              <i className="pi pi-sign-out mr-2"></i>
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  )

  const end = isAuth ? renderAvatar() : renderDarkModeToggle()

  return <Menubar start={start} end={end} />
}


