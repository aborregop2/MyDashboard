import { useState } from "react"
import MyButton from "../../ui/MyButton"
import MyAvatar from "../../ui/MyAvatar"
import { useAuthStore, useDarkmodeStore } from "../../../store"
import { useNavigate } from "react-router"



export default function MenuAvatar() {
    const { isDarkmode, setIsDarkmode } = useDarkmodeStore()
    const { setUser} = useAuthStore()
    const [showMenu, setShowMenu] = useState(false)

    const navigate = useNavigate()

    return(
    <div className="relative">
        <MyAvatar
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
                <MyButton
                text
                className={`flex items-center px-4 py-2.5 text-sm hover:bg-gray-100/20 transition-colors w-full justify-start`}
                onClick={() => setIsDarkmode(!isDarkmode)}
                icon={`pi dark:pi-sun pi-moon`}
                label={isDarkmode ? "Light Mode" : "Dark Mode"}
                />
                <hr className="my-1 border-gray-100 dark:border-gray-700" />
                <MyButton
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

}