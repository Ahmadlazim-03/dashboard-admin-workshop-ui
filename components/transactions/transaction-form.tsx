"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Plus, Minus } from "lucide-react"

interface TransactionFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "edit"
  transaction?: {
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
}

export function TransactionForm({ open, onOpenChange, mode, transaction }: TransactionFormProps) {
  // Sederhanakan struktur DialogContent untuk menghindari masalah scrolling
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar with gradient background */}
          <div className="hidden md:flex md:w-1/3 bg-gradient-to-b from-warning to-primary p-6 text-white flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">
                {mode === "create" ? "Tambah Transaksi Baru" : "Edit Transaksi"}
              </h3>
              <p className="text-sm opacity-90">
                {mode === "create"
                  ? "Tambahkan transaksi baru ke sistem Anda."
                  : "Perbarui informasi transaksi yang sudah ada."}
              </p>
            </div>
            <div className="text-sm opacity-80">
              <p>Tips:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Pilih pelanggan yang sudah terdaftar</li>
                <li>Pastikan produk tersedia</li>
                <li>Verifikasi jumlah pembayaran</li>
                <li>Pilih metode pembayaran yang sesuai</li>
              </ul>
            </div>
          </div>

          {/* Form content */}
          <div className="flex-1 p-6">
            <DialogHeader className="md:hidden">
              <DialogTitle>{mode === "create" ? "Tambah Transaksi Baru" : "Edit Transaksi"}</DialogTitle>
              <DialogDescription>
                {mode === "create"
                  ? "Tambahkan transaksi baru ke sistem Anda."
                  : "Perbarui informasi transaksi yang sudah ada."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Pelanggan</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="customer"
                    placeholder="Cari pelanggan..."
                    defaultValue={transaction?.customer}
                    className="pl-9 input-focus-effect"
                  />
                </div>
                {transaction && <div className="text-sm text-muted-foreground mt-1">Email: {transaction.email}</div>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">Produk</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="product"
                    placeholder="Cari produk..."
                    defaultValue={transaction?.product}
                    className="pl-9 input-focus-effect"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Jumlah</Label>
                  <Input
                    id="amount"
                    placeholder="Rp 0"
                    defaultValue={transaction?.amount.replace("Rp ", "")}
                    className="input-focus-effect"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Kuantitas</Label>
                  <div className="flex items-center">
                    <Button type="button" variant="outline" size="icon" className="h-9 w-9 rounded-r-none">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      defaultValue="1"
                      className="rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Button type="button" variant="outline" size="icon" className="h-9 w-9 rounded-l-none">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={transaction?.status || "pending"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Menunggu</SelectItem>
                      <SelectItem value="processing">Diproses</SelectItem>
                      <SelectItem value="completed">Selesai</SelectItem>
                      <SelectItem value="failed">Gagal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Metode Pembayaran</Label>
                  <Select defaultValue={transaction?.paymentMethod || "transfer"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih metode pembayaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transfer">Transfer Bank</SelectItem>
                      <SelectItem value="credit">Kartu Kredit</SelectItem>
                      <SelectItem value="ewallet">E-Wallet</SelectItem>
                      <SelectItem value="cash">Tunai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat Pengiriman</Label>
                <Textarea
                  id="address"
                  placeholder="Masukkan alamat pengiriman lengkap"
                  defaultValue={transaction?.address}
                  className="min-h-[80px] input-focus-effect"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan</Label>
                <Textarea
                  id="notes"
                  placeholder="Tambahkan catatan tambahan jika diperlukan"
                  className="min-h-[80px] input-focus-effect"
                />
              </div>
            </div>

            <DialogFooter className="mt-6 gap-2 flex-col sm:flex-row">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                Batal
              </Button>
              <Button className="gradient-bg btn-hover-effect w-full sm:w-auto">
                {mode === "create" ? "Tambah Transaksi" : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
