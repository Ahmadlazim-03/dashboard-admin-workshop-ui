"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Calendar, Eye, Tag, Edit, Trash } from "lucide-react"

interface ArticleDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  article: {
    id: number
    title: string
    category: string
    status: string
    date: string
    views: number
    content: string
  }
  onEdit: () => void
  onDelete: () => void
}

export function ArticleDetail({ open, onOpenChange, article, onEdit, onDelete }: ArticleDetailProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0">
        <div className="relative">
          {/* Header image */}
          <div className="h-40 bg-gradient-to-r from-primary/90 to-secondary/90 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <Badge
                variant={article.status === "published" ? "default" : "outline"}
                className={`mb-2 ${
                  article.status === "published" ? "bg-success hover:bg-success/80" : "bg-background"
                }`}
              >
                {article.status === "published" ? "Dipublikasi" : "Draft"}
              </Badge>
              <h2 className="text-2xl font-bold">{article.title}</h2>
            </div>
          </div>

          <DialogHeader className="px-6 pt-6">
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{article.views} views</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                  {article.category}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6 pt-2">
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground">{article.content}</p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <p className="text-muted-foreground">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium mb-2">Informasi Tambahan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">ID Artikel</p>
                  <p className="font-medium">#{article.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Terakhir Diperbarui</p>
                  <p className="font-medium">2 hari yang lalu</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Penulis</p>
                  <p className="font-medium">Admin</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Komentar</p>
                  <p className="font-medium">0</p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 pt-0 flex flex-row justify-end gap-2 flex-wrap">
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
      </DialogContent>
    </Dialog>
  )
}
