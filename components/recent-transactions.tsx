import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const transactions = [
  {
    id: "T12345",
    customer: "Ahmad Rizki",
    initials: "AR",
    email: "ahmad@example.com",
    amount: "Rp 250.000",
    status: "completed",
    date: "2 jam yang lalu",
  },
  {
    id: "T12346",
    customer: "Budi Santoso",
    initials: "BS",
    email: "budi@example.com",
    amount: "Rp 120.000",
    status: "processing",
    date: "3 jam yang lalu",
  },
  {
    id: "T12347",
    customer: "Citra Dewi",
    initials: "CD",
    email: "citra@example.com",
    amount: "Rp 350.000",
    status: "completed",
    date: "5 jam yang lalu",
  },
  {
    id: "T12348",
    customer: "Dian Pratama",
    initials: "DP",
    email: "dian@example.com",
    amount: "Rp 180.000",
    status: "failed",
    date: "6 jam yang lalu",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:translate-x-1"
        >
          <Avatar className="h-9 w-9 border shadow-sm">
            <AvatarFallback className="bg-primary/10 text-primary">{transaction.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.customer}</p>
            <p className="text-xs text-muted-foreground">{transaction.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{transaction.amount}</p>
            <div className="flex justify-end">
              <Badge
                variant={
                  transaction.status === "completed"
                    ? "default"
                    : transaction.status === "processing"
                      ? "outline"
                      : "destructive"
                }
                className={`text-xs badge-glow ${
                  transaction.status === "completed" ? "bg-success hover:bg-success/80" : ""
                }`}
              >
                {transaction.status === "completed"
                  ? "Selesai"
                  : transaction.status === "processing"
                    ? "Diproses"
                    : "Gagal"}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
