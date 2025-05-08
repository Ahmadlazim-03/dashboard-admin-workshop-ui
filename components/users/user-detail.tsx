"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Edit, Trash, Lock, Mail, Phone, MapPin, Clock } from "lucide-react"

interface UserDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: {
    id: string
    name: string
    email: string
    role: string
    status: string
    lastActive: string
    initials: string
    phone: string
    address: string
  }
  onEdit: () => void
  onDelete: () => void
  onResetPassword: () => void
}

export function UserDetail({ open, onOpenChange, user, onEdit, onDelete, onResetPassword }: UserDetailProps) {
  // Sederhanakan struktur DialogContent untuk menghindari masalah scrolling
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0">
        <div className="relative">
          {/* Header with gradient background */}
          <div className="h-32 bg-gradient-to-r from-accent/90 to-primary/90"></div>

          {/* User avatar */}
          <div className="absolute top-16 left-0 w-full flex justify-center">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarFallback className="bg-primary/10 text-primary text-4xl">{user.initials}</AvatarFallback>
            </Avatar>
          </div>

          <DialogHeader className="pt-20 px-6">
            <div className="text-center">
              <DialogTitle className="text-xl">{user.name}</DialogTitle>
              <div className="flex justify-center gap-2 mt-2">
                <Badge
                  variant="outline"
                  className={`capitalize ${user.role === "admin" ? "bg-accent/10 text-accent border-accent/20" : ""}`}
                >
                  {user.role}
                </Badge>
                <Badge
                  variant={user.status === "active" ? "default" : "secondary"}
                  className={user.status === "active" ? "bg-success hover:bg-success/80" : ""}
                >
                  {user.status === "active" ? "Aktif" : "Tidak Aktif"}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Terakhir aktif: {user.lastActive}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium mb-2">Informasi Tambahan</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">ID Pengguna</p>
                  <p className="font-medium">{user.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tanggal Bergabung</p>
                  <p className="font-medium">12 Jan 2023</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Login Terakhir</p>
                  <p className="font-medium">Hari ini, 09:45</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Perangkat</p>
                  <p className="font-medium">Web Browser</p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 pt-0 flex flex-row justify-end gap-2 flex-wrap">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Tutup
            </Button>
            <Button variant="outline" className="text-primary" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" className="text-warning" onClick={onResetPassword}>
              <Lock className="h-4 w-4 mr-2" />
              Reset Password
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              <Trash className="h-4 w-4 mr-2" />
              Hapus
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
