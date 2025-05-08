"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Camera, User } from "lucide-react"

interface UserFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "edit"
  user?: {
    id: string
    name: string
    email: string
    role: string
    status: string
    initials: string
    phone: string
    address: string
  }
}

export function UserForm({ open, onOpenChange, mode, user }: UserFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar with gradient background */}
          <div className="hidden md:flex md:w-1/3 bg-gradient-to-b from-accent to-primary p-6 text-white flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{mode === "create" ? "Tambah Pengguna Baru" : "Edit Pengguna"}</h3>
              <p className="text-sm opacity-90">
                {mode === "create"
                  ? "Tambahkan pengguna baru ke sistem Anda."
                  : "Perbarui informasi pengguna yang sudah ada."}
              </p>
            </div>
            <div className="text-sm opacity-80">
              <p>Tips:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Gunakan email yang valid</li>
                <li>Pilih role yang sesuai</li>
                <li>Pastikan data kontak lengkap</li>
                <li>Password harus kuat</li>
              </ul>
            </div>
          </div>

          {/* Form content */}
          <div className="flex-1 p-6">
            <DialogHeader className="md:hidden">
              <DialogTitle>{mode === "create" ? "Tambah Pengguna Baru" : "Edit Pengguna"}</DialogTitle>
              <DialogDescription>
                {mode === "create"
                  ? "Tambahkan pengguna baru ke sistem Anda."
                  : "Perbarui informasi pengguna yang sudah ada."}
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-center my-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {user?.initials || <User className="h-10 w-10" />}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-md">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama lengkap"
                    defaultValue={user?.name}
                    className="input-focus-effect"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    defaultValue={user?.email}
                    className="input-focus-effect"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue={user?.role || "user"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={user?.status || "active"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Tidak Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  placeholder="Masukkan nomor telepon"
                  defaultValue={user?.phone}
                  className="input-focus-effect"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  placeholder="Masukkan alamat lengkap"
                  defaultValue={user?.address}
                  className="input-focus-effect"
                />
              </div>

              {mode === "create" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukkan password"
                      className="input-focus-effect"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Konfirmasi password"
                      className="input-focus-effect"
                    />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="mt-6 gap-2 flex-col sm:flex-row">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                Batal
              </Button>
              <Button className="gradient-bg btn-hover-effect w-full sm:w-auto">
                {mode === "create" ? "Tambah Pengguna" : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
