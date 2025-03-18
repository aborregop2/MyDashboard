import type React from "react"
import { useShowSidebar, useDarkmodeStore, useAuthStore } from "../../store/index"
import { Sidebar } from "primereact/sidebar"
import { useNavigate } from "react-router" 

interface SidebarLayoutProps {
  children: React.ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const { showSidebar, setShowSidebar } = useShowSidebar()
  const { user, setUser } = useAuthStore()
  const { isDarkmode } = useDarkmodeStore()
  const navigate = useNavigate()

  const sidebarWidth = "20rem" 

  return (
    <div className="relative min-h-screen flex">
      <Sidebar
        visible={showSidebar}
        onHide={() => setShowSidebar(false)}
        className={`w-80 ${isDarkmode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
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
        <h2 className={`text-xl font-bold mb-4 ${isDarkmode ? 'text-white' : 'text-gray-800'}`}>
          The BIG BIG Company
        </h2>
        <nav className="space-y-2">
          <a href="/dashboard" className={`block p-2 rounded ${isDarkmode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </a>
          {user?.role === 'admin' ? 
          <a className={`block p-2 rounded ${isDarkmode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onClick={() => navigate('/users_panel')}
          >
            Users Panel
          </a> 
          : <></>
          }
          <a href="/" className={`block p-2 rounded ${isDarkmode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onClick={() => {setUser(null)}}
          >
            Logout
          </a>
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