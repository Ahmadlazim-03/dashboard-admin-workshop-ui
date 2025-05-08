"use client"

import { useState } from "react"
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
import { ImagePlus, X, Plus, Minus } from "lucide-react"

interface ProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "edit"
  product?: {
    id: string
    name: string
    category: string
    price: string
    stock: number
    status: string
    description: string
  }
}

export function ProductForm({ open, onOpenChange, mode, product }: ProductFormProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [stock, setStock] = useState(product?.stock || 0)

  const handleImageUpload = () => {
    // Simulate image upload - in a real app, this would handle file selection
    if (selectedImages.length < 5) {
      setSelectedImages([
        ...selectedImages,
        `/placeholder.svg?height=200&width=200&text=Product+Image+${selectedImages.length + 1}`,
      ])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index))
  }

  const increaseStock = () => {
    setStock(stock + 1)
  }

  const decreaseStock = () => {
    if (stock > 0) {
      setStock(stock - 1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar with gradient background */}
          <div className="hidden md:flex md:w-1/3 bg-gradient-to-b from-secondary to-primary p-6 text-white flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{mode === "create" ? "Tambah Produk Baru" : "Edit Produk"}</h3>
              <p className="text-sm opacity-90">
                {mode === "create"
                  ? "Tambahkan produk baru ke katalog Anda."
                  : "Perbarui informasi produk yang sudah ada."}
              </p>
            </div>
            <div className="text-sm opacity-80">
              <p>Tips:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Tambahkan foto produk berkualitas</li>
                <li>Berikan deskripsi yang detail</li>
                <li>Tetapkan harga yang kompetitif</li>
                <li>Kelola stok dengan akurat</li>
              </ul>
            </div>
          </div>

          {/* Form content */}
          <div className="flex-1 p-6">
            <DialogHeader className="md:hidden">
              <DialogTitle>{mode === "create" ? "Tambah Produk Baru" : "Edit Produk"}</DialogTitle>
              <DialogDescription>
                {mode === "create"
                  ? "Tambahkan produk baru ke katalog Anda."
                  : "Perbarui informasi produk yang sudah ada."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Produk</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama produk"
                  defaultValue={product?.name}
                  className="input-focus-effect"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select defaultValue={product?.category || "electronics"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="home">Home & Living</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Harga</Label>
                  <Input
                    id="price"
                    placeholder="Rp 0"
                    defaultValue={product?.price.replace("Rp ", "")}
                    className="input-focus-effect"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stok</Label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-r-none"
                      onClick={decreaseStock}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="stock"
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(Number.parseInt(e.target.value) || 0)}
                      className="rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-l-none"
                      onClick={increaseStock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={product?.status || "in-stock"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-stock">Tersedia</SelectItem>
                      <SelectItem value="low-stock">Stok Menipis</SelectItem>
                      <SelectItem value="out-of-stock">Habis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Foto Produk</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden border">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {selectedImages.length < 5 && (
                    <div
                      className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors flex flex-col items-center justify-center h-24"
                      onClick={handleImageUpload}
                    >
                      <ImagePlus className="h-6 w-6 text-muted-foreground mb-1" />
                      <p className="text-xs text-muted-foreground">Tambah Foto</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Tambahkan hingga 5 foto produk (JPG, PNG atau GIF)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Produk</Label>
                <Textarea
                  id="description"
                  placeholder="Tulis deskripsi produk di sini..."
                  defaultValue={product?.description}
                  className="min-h-[100px] input-focus-effect"
                />
              </div>
            </div>

            <DialogFooter className="mt-6 gap-2 flex-col sm:flex-row">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                Batal
              </Button>
              <Button className="gradient-bg btn-hover-effect w-full sm:w-auto">
                {mode === "create" ? "Tambah Produk" : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
