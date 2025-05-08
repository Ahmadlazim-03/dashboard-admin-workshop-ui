"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Eye, CheckCircle, XCircle, Search, Plus, Trash } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { TableSkeleton } from "@/components/skeletons/table-skeleton"
import { TransactionForm } from "@/components/transactions/transaction-form"
import { TransactionDetail } from "@/components/transactions/transaction-detail"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const initialTransactions = [
  {
    id: "T12345",
    customer: "Ahmad Rizki",
    email: "ahmad@example.com",
    product: "Laptop Asus ROG",
    amount: "Rp 15.000.000",
    status: "pending",
    date: "12 Apr 2023",
    paymentMethod: "Transfer Bank",
    address: "Jl. Sudirman No. 123, Jakarta",
  },
  {
    id: "T12346",
    customer: "Budi Santoso",
    email: "budi@example.com",
    product: "Smartphone Samsung S21",
    amount: "Rp 12.500.000",
    status: "processing",
    date: "11 Apr 2023",
    paymentMethod: "Kartu Kredit",
    address: "Jl. Thamrin No. 45, Jakarta",
  },
  {
    id: "T12347",
    customer: "Citra Dewi",
    email: "citra@example.com",
    product: "Headphone Sony WH-1000XM4",
    amount: "Rp 3.800.000",
    status: "completed",
    date: "10 Apr 2023",
    paymentMethod: "E-Wallet",
    address: "Jl. Gatot Subroto No. 67, Jakarta",
  },
  {
    id: "T12348",
    customer: "Dian Pratama",
    email: "dian@example.com",
    product: "Mechanical Keyboard Logitech",
    amount: "Rp 1.200.000",
    status: "failed",
    date: "9 Apr 2023",
    paymentMethod: "Transfer Bank",
    address: "Jl. Kuningan No. 89, Jakarta",
  },
  {
    id: "T12349",
    customer: "Eko Wijaya",
    email: "eko@example.com",
    product: "Monitor LG 27 inch",
    amount: "Rp 2.700.000",
    status: "processing",
    date: "8 Apr 2023",
    paymentMethod: "E-Wallet",
    address: "Jl. Rasuna Said No. 12, Jakarta",
  },
]

export default function TransactionsPage() {
  const { toast } = useToast()
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState(initialTransactions)
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<(typeof initialTransactions)[0] | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredTransactions = transactions.filter((transaction) => {
    if (statusFilter !== "all" && transaction.status !== statusFilter) {
      return false
    }
    if (
      searchTerm &&
      !(
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) {
      return false
    }
    return true
  })

  const handleCreate = () => {
    setCreateDialogOpen(true)
  }

  const handleEdit = () => {
    if (selectedTransactionId !== null) {
      const transaction = filteredTransactions.find((t) => t.id === selectedTransactionId)
      if (transaction) {
        setSelectedTransaction(transaction)
        setEditDialogOpen(true)
      }
    }
  }

  const handleView = () => {
    if (selectedTransactionId !== null) {
      const transaction = filteredTransactions.find((t) => t.id === selectedTransactionId)
      if (transaction) {
        setSelectedTransaction(transaction)
        setDetailDialogOpen(true)
      }
    }
  }

  const handleComplete = () => {
    if (selectedTransactionId !== null) {
      const transaction = filteredTransactions.find((t) => t.id === selectedTransactionId)
      if (transaction && (transaction.status === "pending" || transaction.status === "processing")) {
        const updatedTransactions = transactions.map((t) =>
          t.id === transaction.id ? { ...t, status: "completed" } : t,
        )
        setTransactions(updatedTransactions)
        setSelectedTransaction(null)
        setSelectedTransactionId(null)
        toast({
          title: "Transaksi selesai",
          description: `Transaksi ${transaction.id} telah ditandai sebagai selesai.`,
        })
      }
    }
  }

  const handleFail = () => {
    if (selectedTransactionId !== null) {
      const transaction = filteredTransactions.find((t) => t.id === selectedTransactionId)
      if (transaction && (transaction.status === "pending" || transaction.status === "processing")) {
        const updatedTransactions = transactions.map((t) =>
          t.id === transaction.id ? { ...t, status: "failed" } : t,
        )
        setTransactions(updatedTransactions)
        setSelectedTransaction(null)
        setSelectedTransactionId(null)
        toast({
          title: "Transaksi gagal",
          description: `Transaksi ${transaction.id} telah ditandai sebagai gagal.`,
        })
      }
    }
  }

  const handleDelete = () => {
    if (selectedTransactionId !== null) {
      const transaction = filteredTransactions.find((t) => t.id === selectedTransactionId)
      if (transaction) {
        setSelectedTransaction(transaction)
        setDeleteDialogOpen(true)
      }
    }
  }

  const confirmDelete = () => {
    if (selectedTransaction) {
      setTransactions(transactions.filter((t) => t.id !== selectedTransaction.id))
      setDeleteDialogOpen(false)
      setSelectedTransactionId(null)
      toast({
        title: "Transaksi dihapus",
        description: `Transaksi ${selectedTransaction.id} telah dihapus.`,
      })
    }
  }

  const handleRowClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId)
  }

  if (isLoading) {
    return <TableSkeleton columns={6} rows={5} hasAction={true} hasFilter={true} hasSearch={true} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kelola Transaksi</h1>
          <p className="text-muted-foreground">Lihat dan kelola transaksi yang sedang berlangsung</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={handleView}
            disabled={selectedTransactionId === null}
            className="min-w-[80px] flex items-center justify-center hover:bg-muted/80 transition-colors whitespace-nowrap"
          >
            <Eye className="mr-2 h-4 w-4" />
            Lihat
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            disabled={selectedTransactionId === null}
            className="min-w-[80px] flex items-center justify-center hover:bg-muted/80 transition-colors whitespace-nowrap"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={selectedTransactionId === null}
            className="min-w-[80px] flex items-center justify-center text-destructive border-destructive hover:bg-destructive/10 whitespace-nowrap"
          >
            {/* <Trash className="mr-2 h-4 w-4" /> */}
            Hapus
          </Button>
          <Button
            className="gradient-bg hover:shadow-lg transition-all duration-300 btn-hover-effect min-w-[120px] flex items-center justify-center whitespace-nowrap"
            onClick={handleCreate}
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Transaksi
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 relative">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari transaksi..."
          className="pl-9 max-w-sm input-focus-effect"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select defaultValue="all" value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="table-container overflow-x-auto rounded-xl border bg-card shadow-md hover:shadow-lg transition-all duration-300">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Produk</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  Tidak ada transaksi yang ditemukan
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className={`hover:bg-muted/50 table-row-hover cursor-pointer ${
                    selectedTransactionId === transaction.id ? "bg-muted" : ""
                  }`}
                  onClick={() => handleRowClick(transaction.id)}
                >
                  <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{transaction.customer}</p>
                      <p className="text-sm text-muted-foreground">{transaction.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.product}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : transaction.status === "failed"
                            ? "outline"
                            : "outline"
                      }
                      className={`badge-glow ${
                        transaction.status === "completed"
                          ? "bg-success hover:bg-success/80"
                          : transaction.status === "failed"
                            ? "bg-destructive hover:bg-destructive/80"
                            : ""
                      }`}
                    >
                      {transaction.status === "completed"
                        ? "Selesai"
                        : transaction.status === "processing"
                          ? "Diproses"
                          : transaction.status === "pending"
                            ? "Menunggu"
                            : "Gagal"}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TransactionForm open={createDialogOpen} onOpenChange={setCreateDialogOpen} mode="create" />
      {selectedTransaction && (
        <TransactionForm
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          mode="edit"
          transaction={selectedTransaction}
        />
      )}
      {selectedTransaction && (
        <TransactionDetail
          open={detailDialogOpen}
          onOpenChange={setDetailDialogOpen}
          transaction={selectedTransaction}
          onEdit={() => {
            setDetailDialogOpen(false)
            setTimeout(() => setEditDialogOpen(true), 100)
          }}
          onComplete={() => handleComplete()}
          onFail={() => handleFail()}
        />
      )}
      {selectedTransaction && (
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hapus Transaksi {selectedTransaction.id}</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menghapus transaksi untuk {selectedTransaction.customer} (
                {selectedTransaction.product})? Tindakan ini tidak dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}