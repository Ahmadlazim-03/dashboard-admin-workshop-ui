"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash, Eye, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TableSkeleton } from "@/components/skeletons/table-skeleton"
import { ProductForm } from "@/components/products/product-form"
import { ProductDetail } from "@/components/products/product-detail"
import { ProductDelete } from "@/components/products/product-delete"
import { useToast } from "@/hooks/use-toast"

const initialProducts = [
  {
    id: "P001",
    name: "Laptop Asus ROG",
    category: "Electronics",
    price: "Rp 15.000.000",
    stock: 12,
    status: "in-stock",
    description: "Laptop gaming dengan performa tinggi untuk pengalaman bermain game yang maksimal.",
  },
  {
    id: "P002",
    name: "Smartphone Samsung S21",
    category: "Electronics",
    price: "Rp 12.500.000",
    stock: 8,
    status: "in-stock",
    description: "Smartphone premium dengan kamera berkualitas tinggi dan performa yang cepat.",
  },
  {
    id: "P003",
    name: "Headphone Sony WH-1000XM4",
    category: "Accessories",
    price: "Rp 3.800.000",
    stock: 5,
    status: "in-stock",
    description: "Headphone noise-cancelling dengan kualitas suara yang jernih dan baterai tahan lama.",
  },
  {
    id: "P004",
    name: "Mechanical Keyboard Logitech",
    category: "Accessories",
    price: "Rp 1.200.000",
    stock: 0,
    status: "out-of-stock",
    description: "Keyboard mekanik dengan switch berkualitas tinggi untuk pengalaman mengetik yang nyaman.",
  },
  {
    id: "P005",
    name: "Monitor LG 27 inch",
    category: "Electronics",
    price: "Rp 2.700.000",
    stock: 3,
    status: "low-stock",
    description: "Monitor dengan resolusi tinggi dan refresh rate yang cepat untuk pengalaman visual yang optimal.",
  },
]

export default function ProductsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState(initialProducts)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<(typeof initialProducts)[0] | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreate = () => {
    setCreateDialogOpen(true)
  }

  const handleEdit = () => {
    if (selectedProductId !== null) {
      const product = filteredProducts.find((p) => p.id === selectedProductId)
      if (product) {
        setSelectedProduct(product)
        setEditDialogOpen(true)
      }
    }
  }

  const handleView = () => {
    if (selectedProductId !== null) {
      const product = filteredProducts.find((p) => p.id === selectedProductId)
      if (product) {
        setSelectedProduct(product)
        setDetailDialogOpen(true)
      }
    }
  }

  const handleDelete = () => {
    if (selectedProductId !== null) {
      const product = filteredProducts.find((p) => p.id === selectedProductId)
      if (product) {
        setSelectedProduct(product)
        setDeleteDialogOpen(true)
      }
    }
  }

  const confirmDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter((product) => product.id !== selectedProduct.id))
      setDeleteDialogOpen(false)
      setSelectedProductId(null)
      toast({
        title: "Produk berhasil dihapus",
        description: `Produk "${selectedProduct.name}" telah dihapus.`,
      })
    }
  }

  const handleRowClick = (productId: string) => {
    setSelectedProductId(productId)
  }

  if (isLoading) {
    return <TableSkeleton columns={6} rows={5} hasAction={true} hasSearch={true} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kelola Produk</h1>
          <p className="text-muted-foreground">Tambah, edit, dan hapus produk</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={handleView}
            disabled={selectedProductId === null}
            className="min-w-[80px] flex items-center justify-center hover:bg-muted/80 transition-colors whitespace-nowrap"
          >
            <Eye className="mr-2 h-4 w-4" />
            Lihat
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            disabled={selectedProductId === null}
            className="min-w-[80px] flex items-center justify-center hover:bg-muted/80 transition-colors whitespace-nowrap"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={selectedProductId === null}
            className="min-w-[80px] flex items-center justify-center text-destructive border-destructive hover:bg-destructive/10 whitespace-nowrap"
          >
            {/* <Trash className="mr-2 h-4 w-4" /> */}
            Hapus
          </Button>
          <Button
            className="gradient-bg hover:shadow-lg transition-all duration-300 btn-hover-effect min-w-[120px] flex items-center justify-center whitespace-nowrap"
            onClick={handleCreate}
          >
            {/* <Plus className="mr-2 h-4 w-4" /> */}
            Tambah Produk
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 relative">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari produk..."
          className="pl-9 max-w-sm input-focus-effect"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container overflow-x-auto rounded-xl border bg-card shadow-md hover:shadow-lg transition-all duration-300">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  Tidak ada produk yang ditemukan
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className={`hover:bg-muted/50 table-row-hover cursor-pointer ${
                    selectedProductId === product.id ? "bg-muted" : ""
                  }`}
                  onClick={() => handleRowClick(product.id)}
                >
                  <TableCell className="font-mono text-xs">{product.id}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "in-stock"
                          ? "default"
                          : product.status === "low-stock"
                            ? "outline"
                            : "outline"
                      }
                      className={`badge-glow ${
                        product.status === "in-stock"
                          ? "bg-success hover:bg-success/80"
                          : product.status === "out-of-stock"
                            ? "bg-destructive hover:bg-destructive/80"
                            : ""
                      }`}
                    >
                      {product.status === "in-stock"
                        ? "Tersedia"
                        : product.status === "low-stock"
                          ? "Stok Menipis"
                          : "Habis"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProductForm open={createDialogOpen} onOpenChange={setCreateDialogOpen} mode="create" />
      {selectedProduct && (
        <ProductForm open={editDialogOpen} onOpenChange={setEditDialogOpen} mode="edit" product={selectedProduct} />
      )}
      {selectedProduct && (
        <ProductDetail
          open={detailDialogOpen}
          onOpenChange={setDetailDialogOpen}
          product={selectedProduct}
          onEdit={() => {
            setDetailDialogOpen(false)
            setTimeout(() => setEditDialogOpen(true), 100)
          }}
          onDelete={() => {
            setDetailDialogOpen(false)
            setTimeout(() => setDeleteDialogOpen(true), 100)
          }}
        />
      )}
      {selectedProduct && (
        <ProductDelete
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          productName={selectedProduct.name}
          productId={selectedProduct.id}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  )
}