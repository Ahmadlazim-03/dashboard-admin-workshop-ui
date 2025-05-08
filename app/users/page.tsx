"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Pencil, Trash, Eye, Lock, Search } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { TableSkeleton } from "@/components/skeletons/table-skeleton"
import { UserForm } from "@/components/users/user-form"
import { UserDetail } from "@/components/users/user-detail"
import { UserDelete } from "@/components/users/user-delete"
import { ResetPassword } from "@/components/users/reset-password"
import { useToast } from "@/hooks/use-toast"

const initialUsers = [
  {
    id: "U001",
    name: "Ahmad Rizki",
    email: "ahmad@example.com",
    role: "admin",
    status: "active",
    lastActive: "2 jam yang lalu",
    initials: "AR",
    phone: "081234567890",
    address: "Jl. Sudirman No. 123, Jakarta",
  },
  {
    id: "U002",
    name: "Budi Santoso",
    email: "budi@example.com",
    role: "user",
    status: "active",
    lastActive: "1 hari yang lalu",
    initials: "BS",
    phone: "081234567891",
    address: "Jl. Thamrin No. 45, Jakarta",
  },
  {
    id: "U003",
    name: "Citra Dewi",
    email: "citra@example.com",
    role: "user",
    status: "active",
    lastActive: "3 jam yang lalu",
    initials: "CD",
    phone: "081234567892",
    address: "Jl. Gatot Subroto No. 67, Jakarta",
  },
  {
    id: "U004",
    name: "Dian Pratama",
    email: "dian@example.com",
    role: "editor",
    status: "inactive",
    lastActive: "2 minggu yang lalu",
    initials: "DP",
    phone: "081234567893",
    address: "Jl. Kuningan No. 89, Jakarta",
  },
  {
    id: "U005",
    name: "Eko Wijaya",
    email: "eko@example.com",
    role: "user",
    status: "active",
    lastActive: "5 jam yang lalu",
    initials: "EW",
    phone: "081234567894",
    address: "Jl. Rasuna Said No. 12, Jakarta",
  },
]

export default function UsersPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState(initialUsers)

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<(typeof initialUsers)[0] | null>(null)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handlers
  const handleCreate = () => {
    setCreateDialogOpen(true)
  }

  const handleEdit = (user: (typeof initialUsers)[0]) => {
    setSelectedUser(user)
    setEditDialogOpen(true)
  }

  const handleView = (user: (typeof initialUsers)[0]) => {
    setSelectedUser(user)
    setDetailDialogOpen(true)
  }

  const handleDelete = (user: (typeof initialUsers)[0]) => {
    setSelectedUser(user)
    setDeleteDialogOpen(true)
  }

  const handleResetPassword = (user: (typeof initialUsers)[0]) => {
    setSelectedUser(user)
    setResetPasswordDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedUser) {
      // In a real app, this would call an API to delete the user
      setUsers(users.filter((user) => user.id !== selectedUser.id))
      setDeleteDialogOpen(false)

      toast({
        title: "Pengguna berhasil dihapus",
        description: `Pengguna "${selectedUser.name}" telah dihapus.`,
      })
    }
  }

  const confirmResetPassword = () => {
    if (selectedUser) {
      setResetPasswordDialogOpen(false)

      toast({
        title: "Password berhasil direset",
        description: `Password untuk "${selectedUser.name}" telah direset dan dikirim ke email pengguna.`,
      })
    }
  }

  if (isLoading) {
    return <TableSkeleton columns={4} rows={5} hasAction={true} hasSearch={true} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kelola Pengguna</h1>
          <p className="text-muted-foreground">Tambah, edit, dan hapus pengguna</p>
        </div>
        <Button
          className="gradient-bg hover:shadow-lg transition-all duration-300 btn-hover-effect"
          onClick={handleCreate}
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Pengguna
        </Button>
      </div>

      <div className="flex items-center gap-2 relative">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari pengguna..."
          className="pl-9 max-w-sm input-focus-effect"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container overflow-x-auto rounded-xl border bg-card shadow-md hover:shadow-lg transition-all duration-300">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pengguna</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Terakhir Aktif</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  Tidak ada pengguna yang ditemukan
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50 transition-colors duration-200 table-row-hover">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="border shadow-sm">
                        <AvatarFallback className="bg-primary/10 text-primary">{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize badge-glow ${user.role === "admin" ? "bg-accent/10 text-accent border-accent/20" : ""}`}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "active" ? "default" : "secondary"}
                      className={`badge-glow ${user.status === "active" ? "bg-success hover:bg-success/80" : ""}`}
                    >
                      {user.status === "active" ? "Aktif" : "Tidak Aktif"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-muted/80 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleView(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Lihat Profil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleEdit(user)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleResetPassword(user)}>
                          <Lock className="mr-2 h-4 w-4" />
                          <span>Reset Password</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive cursor-pointer"
                          onClick={() => handleDelete(user)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Hapus</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create User Dialog */}
      <UserForm open={createDialogOpen} onOpenChange={setCreateDialogOpen} mode="create" />

      {/* Edit User Dialog */}
      {selectedUser && (
        <UserForm open={editDialogOpen} onOpenChange={setEditDialogOpen} mode="edit" user={selectedUser} />
      )}

      {/* View User Dialog */}
      {selectedUser && (
        <UserDetail
          open={detailDialogOpen}
          onOpenChange={setDetailDialogOpen}
          user={selectedUser}
          onEdit={() => {
            setDetailDialogOpen(false)
            setTimeout(() => setEditDialogOpen(true), 100)
          }}
          onDelete={() => {
            setDetailDialogOpen(false)
            setTimeout(() => setDeleteDialogOpen(true), 100)
          }}
          onResetPassword={() => {
            setDetailDialogOpen(false)
            setTimeout(() => setResetPasswordDialogOpen(true), 100)
          }}
        />
      )}

      {/* Delete User Dialog */}
      {selectedUser && (
        <UserDelete
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          userName={selectedUser.name}
          userId={selectedUser.id}
          onConfirm={confirmDelete}
        />
      )}

      {/* Reset Password Dialog */}
      {selectedUser && (
        <ResetPassword
          open={resetPasswordDialogOpen}
          onOpenChange={setResetPasswordDialogOpen}
          userName={selectedUser.name}
          onConfirm={confirmResetPassword}
        />
      )}
    </div>
  )
}
