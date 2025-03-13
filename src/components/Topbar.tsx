"use client"
import { Menubar } from "primereact/menubar"
import { InputText } from "primereact/inputtext"
import type { MenuItem } from "primereact/menuitem"
import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"
import { ToggleButton } from "primereact/togglebutton"

import { useAuthStore, useDarkmodeStore } from "../store/index"
import { useNavigate } from "react-router"


export default function Topbar() {
  const { isAuth, setIsAuth } = useAuthStore()
  const { isDarkmode, setIsDarkmode } = useDarkmodeStore()

  const navigator = useNavigate()

  const items: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-home",
      className: "flex justify-center" // Centrado con Tailwind
    },
    {
      label: "Features",
      icon: "pi pi-star",
      className: "flex justify-center" // Centrado con Tailwind
    },
  ]

  const start = (
    <div className="flex items-center gap-2">
      <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" width={50} className="mr-2" />
      <ToggleButton
        checked={isDarkmode}
        onChange={(e) => setIsDarkmode(e.value)}
        onIcon="pi pi-moon"
        offIcon="pi pi-sun"
        onLabel=""
        offLabel=""
        className="p-button-rounded p-button-text w-10 h-10 flex items-center justify-center"
      />
    </div>
  )

  const end = (
    <div className="flex items-center gap-2">
      <InputText placeholder="Search" type="text" className="w-32 sm:w-48" />
      <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
      {isAuth && (
        <Button
          icon="pi pi-sign-out"
          label="Logout"
          severity="danger"
          onClick={() => {
            setIsAuth(false)
            navigator("/login")
          }}
          className="flex items-center justify-center px-4"
          
        />
      )}
    </div>
    
  )

  return (
    <Menubar
      model={items}
      start={start}
      end={end}
      className="bg-gray-100 dark:bg-gray-800 px-4 py-2"
    />
  )
}