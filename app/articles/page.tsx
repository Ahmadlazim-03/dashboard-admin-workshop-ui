"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash, Eye, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TableSkeleton } from "@/components/skeletons/table-skeleton"
import { ArticleForm } from "@/components/articles/article-form"
import { ArticleDetail } from "@/components/articles/article-detail"
import { ArticleDelete } from "@/components/articles/article-delete"
import { useToast } from "@/hooks/use-toast"

const initialArticles = [
  {
    id: 1,
    title: "Cara Meningkatkan Penjualan Online",
    category: "Marketing",
    status: "published",
    date: "12 Apr 2023",
    views: 1245,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    title: "Tips Mengelola Keuangan Bisnis",
    category: "Finance",
    status: "draft",
    date: "10 Apr 2023",
    views: 0,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    title: "Strategi SEO untuk Pemula",
    category: "Digital",
    status: "published",
    date: "5 Apr 2023",
    views: 892,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    title: "Panduan Lengkap E-commerce",
    category: "Business",
    status: "published",
    date: "1 Apr 2023",
    views: 1567,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    title: "Tren Digital Marketing 2023",
    category: "Marketing",
    status: "draft",
    date: "28 Mar 2023",
    views: 0,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
]

export default function ArticlesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState(initialArticles)
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null)

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<(typeof initialArticles)[0] | null>(null)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter articles based on search term
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handlers
  const handleCreate = () => {
    setCreateDialogOpen(true)
  }

  const handleEdit = () => {
    if (selectedArticleId !== null) {
      const article = filteredArticles.find((a) => a.id === selectedArticleId)
      if (article) {
        setSelectedArticle(article)
        setEditDialogOpen(true)
      }
    }
  }

  const handleView = () => {
    if (selectedArticleId !== null) {
      const article = filteredArticles.find((a) => a.id === selectedArticleId)
      if (article) {
        setSelectedArticle(article)
        setDetailDialogOpen(true)
      }
    }
  }

  const handleDelete = () => {
    if (selectedArticleId !== null) {
      const article = filteredArticles.find((a) => a.id === selectedArticleId)
      if (article) {
        setSelectedArticle(article)
        setDeleteDialogOpen(true)
      }
    }
  }

  const confirmDelete = () => {
    if (selectedArticle) {
      // In a real app, this would call an API to delete the article
      setArticles(articles.filter((article) => article.id !== selectedArticle.id))
      setDeleteDialogOpen(false)
      setSelectedArticleId(null) // Reset selection after deletion

      toast({
        title: "Artikel berhasil dihapus",
        description: `Artikel "${selectedArticle.title}" telah dihapus.`,
      })
    }
  }

  const handleRowClick = (articleId: number) => {
    setSelectedArticleId(articleId)
  }

  if (isLoading) {
    return <TableSkeleton columns={5} rows={5} hasAction={false} hasSearch={true} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kelola Artikel</h1>
          <p className="text-muted-foreground">Tambah, edit, dan hapus artikel</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={handleView}
            disabled={selectedArticleId === null}
            className="min-w-[80px] flex items-center justify-center hover:bg-muted/80 transition-colors whitespace-nowrap"
          >
            <Eye className="mr-2 h-4 w-4" />
            Lihat
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            disabled={selectedArticleId === null}
            className="min-w-[80px] flex items-center justify-center hover:bg-muted/80 transition-colors whitespace-nowrap"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={selectedArticleId === null}
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
            Tambah Artikel
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 relative">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari artikel..."
          className="pl-9 max-w-sm input-focus-effect"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container overflow-x-auto rounded-xl border bg-card shadow-md hover:shadow-lg transition-all duration-300">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  Tidak ada artikel yang ditemukan
                </TableCell>
              </TableRow>
            ) : (
              filteredArticles.map((article) => (
                <TableRow
                  key={article.id}
                  className={`hover:bg-muted/50 table-row-hover cursor-pointer ${
                    selectedArticleId === article.id ? "bg-muted" : ""
                  }`}
                  onClick={() => handleRowClick(article.id)}
                >
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                      {article.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={article.status === "published" ? "default" : "outline"}
                      className={`badge-glow ${article.status === "published" ? "bg-success hover:bg-success/80" : ""}`}
                    >
                      {article.status === "published" ? "Dipublikasi" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>{article.date}</TableCell>
                  <TableCell className="text-right">{article.views}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create Article Dialog */}
      <ArticleForm open={createDialogOpen} onOpenChange={setCreateDialogOpen} mode="create" />

      {/* Edit Article Dialog */}
      {selectedArticle && (
        <ArticleForm open={editDialogOpen} onOpenChange={setEditDialogOpen} mode="edit" article={selectedArticle} />
      )}

      {/* View Article Dialog */}
      {selectedArticle && (
        <ArticleDetail
          open={detailDialogOpen}
          onOpenChange={setDetailDialogOpen}
          article={selectedArticle}
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

      {/* Delete Article Dialog */}
      {selectedArticle && (
        <ArticleDelete
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          articleTitle={selectedArticle.title}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  )
}