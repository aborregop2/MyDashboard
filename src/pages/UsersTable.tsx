import { useState, useEffect, useRef } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { Pencil, X, Check } from "lucide-react"
import { useAuthStore } from "../store"
import { Toast } from "primereact/toast"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

interface ColumnMeta {
  field: string
  header: string
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editedUser, setEditedUser] = useState<User | null>(null)
  const toast = useRef<Toast>(null)

  const columns: ColumnMeta[] = [
    { field: "firstName", header: "First Name" },
    { field: "lastName", header: "Last Name" },
    { field: "email", header: "Email" },
    { field: "role", header: "Role" },
  ]

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" }
  ]

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users")
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
        toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to fetch users" })
      }
    }

    fetchUsers()
  }, [])

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setEditedUser({ ...user })
  }

  const handleCancelEdit = () => {
    setEditingUser(null)
    setEditedUser(null)
  }

  const handleSaveEdit = async () => {
    if (!editedUser) return

    try {
      const response = await fetch(`http://localhost:3000/users/${editedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      })

      if (response.ok) {
        const updatedUser = await response.json()

        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))

        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "User updated successfully",
        })

        // Exit edit mode
        setEditingUser(null)
        setEditedUser(null)
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to update user",
        })
      }
    } catch (error) {
      console.error("Error updating user:", error)
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update user",
      })
    }
  }

  const handleDelete = async (user: User) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setUsers(users.filter((u) => u.id !== user.id))
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "User deleted successfully",
        })
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete user",
        })
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete user",
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [field]: value,
      })
    }
  }

  const actionBodyTemplate = (rowData: User) => {
    if (editingUser && editingUser.id === rowData.id) {
      return (
        <div className="flex gap-2">
          <button
            onClick={handleSaveEdit}
            className="p-1 text-green-500 hover:text-green-700 rounded-full hover:bg-green-100"
            title="Save"
          >
            <Check size={18} />
          </button>
          <button
            onClick={handleCancelEdit}
            className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100"
            title="Cancel"
          >
            <X size={18} />
          </button>
        </div>
      )
    }

    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(rowData)}
          className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100"
          title="Edit"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => handleDelete(rowData)}
          className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100"
          title="Delete"
        >
          <X size={18} />
        </button>
      </div>
    )
  }

  const cellEditor = (options: any) => {
    if (!editedUser) return options.value

    const field = options.field
    const value = editedUser[field as keyof User]

    if (field === "role") {
      return (
        <Dropdown
          value={value}
          options={roles}
          onChange={(e) => handleInputChange(field, e.value)}
          className="w-full"
        />
      )
    }

    return (
      <InputText
        type="text"
        value={value}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="w-full"
      />
    )
  }

  const renderColumn = (col: ColumnMeta) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        sortable
        body={(rowData: User) => {
          if (editingUser && editingUser.id === rowData.id) {
            return cellEditor({ field: col.field, value: rowData[col.field as keyof User] })
          }
          return rowData[col.field as keyof User]
        }}
      />
    )
  }

  return (
    <div className="card mt-4 p-4 ml-4 mr-4">
      <Toast ref={toast} />
      <DataTable
        value={users}
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        emptyMessage="No users found"
      >
        {columns.map(renderColumn)}
        <Column body={actionBodyTemplate} header="Actions" style={{ width: "10rem" }} />
      </DataTable>
    </div>
  )
}

