import { useState, useEffect } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

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
    { field: "id", header: "ID" },
    { field: "firstName", header: "First Name" },
    { field: "lastName", header: "Last Name" },
    { field: "email", header: "Email" },
  ]

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users")
        const data = await response.json()

        const filteredUsers = data.users.filter((user: User) => user.role === "user")
        setUsers(filteredUsers)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="card">
      <h2>User List</h2>
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
      </DataTable>
    </div>
  )
}

