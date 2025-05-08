"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Lock } from "lucide-react"

interface ResetPasswordProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userName: string
  onConfirm: () => void
}

export function ResetPassword({ open, onOpenChange, userName, onConfirm }: ResetPasswordProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-warning">
            <Lock className="h-5 w-5" />
            <DialogTitle>Reset Password</DialogTitle>
          </div>
          <DialogDescription>
            Reset password untuk pengguna <span className="font-medium">{userName}</span>. Password baru akan dikirim ke
            email pengguna.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Password Baru</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Masukkan password baru"
              className="input-focus-effect"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Konfirmasi password baru"
              className="input-focus-effect"
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Password harus memenuhi kriteria berikut:</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Minimal 8 karakter</li>
              <li>Mengandung huruf besar dan kecil</li>
              <li>Mengandung angka</li>
              <li>Mengandung karakter khusus</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2 flex-col sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Batal
          </Button>
          <Button
            className="bg-warning text-warning-foreground hover:bg-warning/90 w-full sm:w-auto"
            onClick={onConfirm}
          >
            Reset Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
