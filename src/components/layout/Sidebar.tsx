"use client"

import type React from "react"
import { useShowSidebar, useAuthStore } from "../../store/index"
import { Sidebar } from "primereact/sidebar"
import { Link, useNavigate } from "react-router"

interface SidebarLayoutProps {
  children: React.ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const { showSidebar, setShowSidebar } = useShowSidebar()
  const { user, setUser } = useAuthStore()
  const navigate = useNavigate()

  const sidebarWidth = "20rem"

  const handleLogout = () => {
    setUser(null)
    navigate("/")
  }

  return (
    <div className="relative min-h-screen flex">
      <Sidebar
        visible={showSidebar}
        onHide={() => setShowSidebar(false)}
        className={`w-80`}
        position="left"
        showCloseIcon={true}
        modal={false}
        style={{
          zIndex: 1000,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <h2 className={`text-xl font-bold mb-4`}>The BIG BIG Company</h2>
        <nav className="space-y-2">
          <Link to="/dashboard" className={`block p-2 rounded`}>
            Dashboard
          </Link>
          {user?.role === "admin" ? (
            <Link to="/users_panel" className={`block p-2 rounded`}>
              Users Panel
            </Link>
          ) : (
            <></>
          )}
          <button onClick={handleLogout} className={`block p-2 rounded w-full text-left`}>
            Logout
          </button>
        </nav>
      </Sidebar>

      <main
        className="flex-1 w-full"
        style={{
          marginLeft: showSidebar ? sidebarWidth : "0",
          transition: "margin-left 0.3s ease-in-out",
          width: "100%",
        }}
      >
        {children}
      </main>
    </div>
  )
}

