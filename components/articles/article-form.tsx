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
import { Calendar, ImagePlus, X } from "lucide-react"

interface ArticleFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "edit"
  article?: {
    id: number
    title: string
    category: string
    status: string
    date: string
    content: string
  }
}

export function ArticleForm({ open, onOpenChange, mode, article }: ArticleFormProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageUpload = () => {
    // Simulate image upload - in a real app, this would handle file selection
    setSelectedImage("/placeholder.svg?height=200&width=400")
  }

  const removeImage = () => {
    setSelectedImage(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar with gradient background */}
          <div className="hidden md:flex md:w-1/3 bg-gradient-to-b from-primary to-secondary p-6 text-white flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{mode === "create" ? "Tambah Artikel Baru" : "Edit Artikel"}</h3>
              <p className="text-sm opacity-90">
                {mode === "create"
                  ? "Buat artikel baru untuk ditampilkan di website Anda."
                  : "Perbarui informasi artikel yang sudah ada."}
              </p>
            </div>
            <div className="text-sm opacity-80">
              <p>Tips:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Gunakan judul yang menarik</li>
                <li>Pilih kategori yang sesuai</li>
                <li>Tambahkan gambar berkualitas</li>
                <li>Tulis konten yang informatif</li>
              </ul>
            </div>
          </div>

          {/* Form content */}
          <div className="flex-1 p-6">
            <DialogHeader className="md:hidden">
              <DialogTitle>{mode === "create" ? "Tambah Artikel Baru" : "Edit Artikel"}</DialogTitle>
              <DialogDescription>
                {mode === "create"
                  ? "Buat artikel baru untuk ditampilkan di website Anda."
                  : "Perbarui informasi artikel yang sudah ada."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Artikel</Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul artikel"
                  defaultValue={article?.title}
                  className="input-focus-effect"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select defaultValue={article?.category || "marketing"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={article?.status || "draft"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Dipublikasi</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gambar Artikel</Label>
                {selectedImage ? (
                  <div className="relative rounded-md overflow-hidden border">
                    <img src={selectedImage || "/placeholder.svg"} alt="Preview" className="w-full h-40 object-cover" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={handleImageUpload}
                  >
                    <ImagePlus className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Klik untuk mengunggah gambar</p>
                    <p className="text-xs text-muted-foreground mt-1">Mendukung JPG, PNG atau GIF hingga 5MB</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Konten Artikel</Label>
                <Textarea
                  id="content"
                  placeholder="Tulis konten artikel di sini..."
                  defaultValue={article?.content}
                  className="min-h-[150px] input-focus-effect"
                />
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {mode === "create"
                    ? "Akan dipublikasikan pada: " + new Date().toLocaleDateString()
                    : "Dipublikasikan pada: " + article?.date}
                </span>
              </div>
            </div>

            <DialogFooter className="mt-6 gap-2 flex-col sm:flex-row">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                Batal
              </Button>
              <Button className="gradient-bg btn-hover-effect w-full sm:w-auto">
                {mode === "create" ? "Tambah Artikel" : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
