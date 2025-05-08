"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Search, Calendar, Download, FileText, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const initialTransactions = [
  {
    id: "T12320",
    customer: "Ahmad Rizki",
    email: "ahmad@example.com",
    product: "Laptop Asus ROG",
    amount: "Rp 15.000.000",
    status: "completed",
    date: "1 Mar 2023",
    paymentMethod: "Transfer Bank",
    address: "Jl. Sudirman No. 123, Jakarta",
  },
  {
    id: "T12321",
    customer: "Budi Santoso",
    email: "budi@example.com",
    product: "Smartphone Samsung S21",
    amount: "Rp 12.500.000",
    status: "completed",
    date: "5 Mar 2023",
    paymentMethod: "Kartu Kredit",
    address: "Jl. Thamrin No. 45, Jakarta",
  },
  {
    id: "T12322",
    customer: "Citra Dewi",
    email: "citra@example.com",
    product: "Headphone Sony WH-1000XM4",
    amount: "Rp 3.800.000",
    status: "completed",
    date: "10 Mar 2023",
    paymentMethod: "E-Wallet",
    address: "Jl. Gatot Subroto No. 67, Jakarta",
  },
  {
    id: "T12323",
    customer: "Dian Pratama",
    email: "dian@example.com",
    product: "Mechanical Keyboard Logitech",
    amount: "Rp 1.200.000",
    status: "failed",
    date: "15 Mar 2023",
    paymentMethod: "Transfer Bank",
    address: "Jl. Kuningan No. 89, Jakarta",
  },
  {
    id: "T12324",
    customer: "Eko Wijaya",
    email: "eko@example.com",
    product: "Monitor LG 27 inch",
    amount: "Rp 2.700.000",
    status: "completed",
    date: "20 Mar 2023",
    paymentMethod: "E-Wallet",
    address: "Jl. Rasuna Said No. 12, Jakarta",
  },
  {
    id: "T12325",
    customer: "Fira Nugraha",
    email: "fira@example.com",
    product: "Smartphone iPhone 13",
    amount: "Rp 14.500.000",
    status: "completed",
    date: "25 Mar 2023",
    paymentMethod: "Kartu Kredit",
    address: "Jl. Merdeka No. 56, Jakarta",
  },
  {
    id: "T12326",
    customer: "Gita Purnama",
    email: "gita@example.com",
    product: "Tablet iPad Pro",
    amount: "Rp 12.000.000",
    status: "failed",
    date: "28 Mar 2023",
    paymentMethod: "Transfer Bank",
    address: "Jl. Asia Afrika No. 78, Jakarta",
  },
]

export default function HistoryPage() {
  // Simplified state - just for display purposes
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [monthFilter, setMonthFilter] = useState("march")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter transactions based on search term and status (for display only)
  const filteredTransactions = initialTransactions.filter((transaction) => {
    // Filter by status
    if (statusFilter !== "all" && transaction.status !== statusFilter) {
      return false
    }

    // Filter by search term
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

  // Calculate statistics for display
  const totalTransactions = filteredTransactions.length
  const completedTransactions = filteredTransactions.filter((t) => t.status === "completed").length
  const failedTransactions = filteredTransactions.filter((t) => t.status === "failed").length
  const totalAmount = 61700000 // Hardcoded for display purposes

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-32" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-16 mb-2" />
                <Skeleton className="h-4 w-28" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Skeleton className="h-9 w-full sm:w-[300px] mb-2 sm:mb-0" />
          <Skeleton className="h-9 w-full sm:w-[180px] mb-2 sm:mb-0" />
          <Skeleton className="h-9 w-full sm:w-[100px]" />
        </div>

        <div className="table-container overflow-x-auto rounded-xl border bg-card shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: 7 }).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-4 w-full max-w-[100px]" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 7 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: 7 }).map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      {colIndex === 1 ? (
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-32 hidden md:block" />
                        </div>
                      ) : colIndex === 6 ? (
                        <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                      ) : (
                        <Skeleton className="h-4 w-full max-w-[80px]" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">History Transaksi</h1>
          <p className="text-muted-foreground">Lihat riwayat transaksi yang telah selesai</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all" value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="failed">Gagal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dashboard-card hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">Bulan Maret 2023</p>
          </CardContent>
        </Card>
        <Card className="dashboard-card hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaksi Selesai</CardTitle>
            <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
              <FileText className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTransactions}</div>
            <p className="text-xs text-muted-foreground">Dari {totalTransactions} transaksi</p>
          </CardContent>
        </Card>
        <Card className="dashboard-card hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaksi Gagal</CardTitle>
            <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
              <Eye className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedTransactions}</div>
            <p className="text-xs text-muted-foreground">Dari {totalTransactions} transaksi</p>
          </CardContent>
        </Card>
        <Card className="dashboard-card hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
            <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {(totalAmount / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Bulan Maret 2023</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari transaksi..."
            className="pl-9 w-full sm:w-[300px] input-focus-effect"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select defaultValue="march" value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Pilih Bulan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="january">Januari 2023</SelectItem>
            <SelectItem value="february">Februari 2023</SelectItem>
            <SelectItem value="march">Maret 2023</SelectItem>
            <SelectItem value="april">April 2023</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="w-full sm:w-auto hover:bg-muted/80 transition-colors">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
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
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="hover:bg-muted/50 transition-colors duration-200 table-row-hover"
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
                    variant={transaction.status === "completed" ? "default" : "destructive"}
                    className={`badge-glow ${transaction.status === "completed" ? "bg-success hover:bg-success/80" : ""}`}
                  >
                    {transaction.status === "completed" ? "Selesai" : "Gagal"}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="hover:bg-muted/80 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Detail</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
