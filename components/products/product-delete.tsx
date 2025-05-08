"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertTriangle } from "lucide-react"

interface ProductDeleteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productName: string
  productId: string
  onConfirm: () => void
}

export function ProductDelete({ open, onOpenChange, productName, productId, onConfirm }: ProductDeleteProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[550px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertDialogTitle>Hapus Produk</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-2">
            Apakah Anda yakin ingin menghapus produk <span className="font-medium">"{productName}"</span> dengan ID{" "}
            <span className="font-mono text-xs">{productId}</span>? Tindakan ini tidak dapat dibatalkan dan semua data
            terkait produk ini akan dihapus secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 flex-col sm:flex-row">
          <AlertDialogCancel className="mt-0 w-full sm:w-auto">Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto"
            onClick={onConfirm}
          >
            Hapus Permanen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
