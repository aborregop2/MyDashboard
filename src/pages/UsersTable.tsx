import { useState, useEffect, useRef } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { Button } from "primereact/button"
import { Toast } from "primereact/toast"
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"
import { fetchUsers, deleteUser, updateUser } from "../services/useUsersApi"

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
    { label: "User", value: "user" },
  ]

  useEffect(() => {
    try {
      fetchUsers().then((users) => setUsers(users))
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to fetch users" })
    }
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
      const updatedUser = await updateUser(editedUser)
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "User updated successfully",
      })

      setEditingUser(null)
      setEditedUser(null)
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update user",
      })
    }
  }

  const handleDelete = (user: User) => {
    confirmDialog({
      message: "Are you sure you want to delete this user?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => confirmDeleteUser(user),
      reject: () => {
        toast.current?.show({
          severity: "info",
          summary: "Cancelled",
          detail: "User deletion cancelled",
        })
      },
    })
  }

  const confirmDeleteUser = async (user: User) => {
    try {
      await deleteUser(user.id)
      setUsers(users.filter((u) => u.id !== user.id))

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "User deleted successfully",
      })
    } catch (error) {
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
          <Button icon="pi pi-check" onClick={handleSaveEdit} severity="success" rounded text aria-label="Save" />
          <Button icon="pi pi-times" onClick={handleCancelEdit} severity="danger" rounded text aria-label="Cancel" />
        </div>
      )
    }

    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          onClick={() => handleEdit(rowData)}
          severity="info"
          rounded
          text
          aria-label="Edit"
        />
        <Button
          icon="pi pi-trash"
          onClick={() => handleDelete(rowData)}
          severity="danger"
          rounded
          text
          aria-label="Delete"
        />
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
      <ConfirmDialog />

      <DataTable
        value={users}
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        emptyMessage="No users found in this big big company"
      >
        {columns.map(renderColumn)}
        <Column body={actionBodyTemplate} header="Actions" style={{ width: "10rem" }} />
      </DataTable>
    </div>
  )
}

