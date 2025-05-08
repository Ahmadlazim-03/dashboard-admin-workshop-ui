"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Edit, CheckCircle, XCircle, Calendar, CreditCard, MapPin, Package } from "lucide-react"

interface TransactionDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction: {
    id: string
    customer: string
    email: string
    product: string
    amount: string
    status: string
    date: string
    paymentMethod: string
    address: string
  }
  onComplete: () => void
  onFail: () => void
  onEdit: () => void
}

export function TransactionDetail({
  open,
  onOpenChange,
  transaction,
  onComplete,
  onFail,
  onEdit,
}: TransactionDetailProps) {
  // Get initials from customer name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const initials = getInitials(transaction.customer)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[750px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Detail Transaksi</DialogTitle>
            <Badge
              variant={
                transaction.status === "completed"
                  ? "default"
                  : transaction.status === "processing"
                    ? "outline"
                    : transaction.status === "pending"
                      ? "secondary"
                      : "destructive"
              }
              className={`badge-glow ${transaction.status === "completed" ? "bg-success hover:bg-success/80" : ""}`}
            >
              {transaction.status === "completed"
                ? "Selesai"
                : transaction.status === "processing"
                  ? "Diproses"
                  : transaction.status === "pending"
                    ? "Menunggu"
                    : "Gagal"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Transaction ID and Date */}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-muted-foreground">ID Transaksi:</span>
              <span className="font-mono ml-2">{transaction.id}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{transaction.date}</span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="text-sm font-medium mb-3">Informasi Pelanggan</h3>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border shadow-sm">
                <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{transaction.customer}</p>
                <p className="text-sm text-muted-foreground">{transaction.email}</p>
              </div>
            </div>
            <div className="mt-3 flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">{transaction.address}</p>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="text-sm font-medium mb-3">Informasi Produk</h3>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-md bg-secondary/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="font-medium">{transaction.product}</p>
                <p className="text-sm text-muted-foreground">Kuantitas: 1</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="text-sm font-medium mb-3">Informasi Pembayaran</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{transaction.paymentMethod}</span>
              </div>
              <span className="font-bold text-lg">{transaction.amount}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 flex-col sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Tutup
          </Button>
          <Button variant="outline" className="text-primary w-full sm:w-auto" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          {(transaction.status === "pending" || transaction.status === "processing") && (
            <>
              <Button
                variant="default"
                className="bg-success hover:bg-success/90 w-full sm:w-auto"
                onClick={onComplete}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Tandai Selesai
              </Button>
              <Button variant="destructive" className="w-full sm:w-auto" onClick={onFail}>
                <XCircle className="h-4 w-4 mr-2" />
                Tandai Gagal
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
