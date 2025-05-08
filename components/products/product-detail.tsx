"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react"

interface ProductDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: {
    id: string
    name: string
    category: string
    price: string
    stock: number
    status: string
    description: string
  }
  onEdit: () => void
  onDelete: () => void
}

export function ProductDetail({ open, onOpenChange, product, onEdit, onDelete }: ProductDetailProps) {
  // Simulate multiple product images
  const productImages = [
    `/placeholder.svg?height=300&width=300&text=Product+Image+1`,
    `/placeholder.svg?height=300&width=300&text=Product+Image+2`,
    `/placeholder.svg?height=300&width=300&text=Product+Image+3`,
  ]

  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  // Sederhanakan struktur DialogContent untuk menghindari masalah scrolling
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0">
        <div className="flex flex-col md:flex-row">
          {/* Product image gallery */}
          <div className="md:w-2/5 bg-muted/30 relative h-64 md:h-auto">
            <div className="relative h-full">
              <img
                src={productImages[currentImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />

              {productImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Thumbnail indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      currentImage === index ? "w-6 bg-primary" : "w-1.5 bg-primary/30"
                    }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product details */}
          <div className="flex-1 p-6">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="outline" className="mb-2 bg-secondary/10 text-secondary border-secondary/20">
                    {product.category}
                  </Badge>
                  <DialogTitle className="text-xl">{product.name}</DialogTitle>
                </div>
                <Badge
                  variant={
                    product.status === "in-stock"
                      ? "default"
                      : product.status === "low-stock"
                        ? "outline"
                        : "destructive"
                  }
                  className={product.status === "in-stock" ? "bg-success hover:bg-success/80" : ""}
                >
                  {product.status === "in-stock"
                    ? "Tersedia"
                    : product.status === "low-stock"
                      ? "Stok Menipis"
                      : "Habis"}
                </Badge>
              </div>
            </DialogHeader>

            <div className="mt-4">
              <div className="text-2xl font-bold text-primary">{product.price}</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-sm text-muted-foreground">Stok: {product.stock}</div>
                <div className="text-sm text-muted-foreground">•</div>
                <div className="text-sm text-muted-foreground">ID: {product.id}</div>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium">Deskripsi Produk</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium mb-2">Spesifikasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Berat</p>
                    <p className="font-medium">500 gram</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Dimensi</p>
                    <p className="font-medium">15 x 10 x 5 cm</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Warna</p>
                    <p className="font-medium">Hitam</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Garansi</p>
                    <p className="font-medium">1 Tahun</p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 gap-2 flex-wrap">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Tutup
              </Button>
              <Button variant="outline" className="text-primary" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" onClick={onDelete}>
                <Trash className="h-4 w-4 mr-2" />
                Hapus
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
