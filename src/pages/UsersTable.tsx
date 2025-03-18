"use client"

import { useState, useEffect } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Pencil, X } from "lucide-react"

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

  const columns: ColumnMeta[] = [
    { field: "firstName", header: "First Name" },
    { field: "lastName", header: "Last Name" },
    { field: "email", header: "Email" },
    { field: "role", header: "Role" },
  ]

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users")
        const data = await response.json()
        console.log(data)

        const filteredUsers = data.filter((user: any) => user.role === "user")
        setUsers(filteredUsers)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  const handleEdit = (user: User) => {
    
    
    console.log("Edit user:", user)
  }

  const handleDelete = async (user: User) => {
    try {
      
      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "DELETE",
      })

      setUsers(users.filter((u) => u.id !== user.id))
      
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  const actionBodyTemplate = (rowData: User) => {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(rowData)}
          className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => handleDelete(rowData)}
          className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100"
        >
          <X size={18} />
        </button>
      </div>
    )
  }

  return (
    <div className="card mt-4 p-4 ml-4 mr-4">
      <DataTable
        value={users}
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        emptyMessage="No users found"
      >
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} sortable />
        ))}
        <Column body={actionBodyTemplate} header="Actions" style={{ width: "10rem" }} />
      </DataTable>
    </div>
  )
}

