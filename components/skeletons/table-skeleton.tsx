import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TableSkeletonProps {
  columns: number
  rows: number
  hasAction?: boolean
  hasFilter?: boolean
  hasSearch?: boolean
}

export function TableSkeleton({
  columns,
  rows,
  hasAction = true,
  hasFilter = false,
  hasSearch = true,
}: TableSkeletonProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex items-center gap-2">
          {hasAction && <Skeleton className="h-9 w-32" />}
          {hasFilter && <Skeleton className="h-9 w-32" />}
        </div>
      </div>

      {hasSearch && (
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-64" />
        </div>
      )}

      <div className="table-container overflow-x-auto rounded-xl border bg-card shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-full max-w-[100px]" />
                </TableHead>
              ))}
              {hasAction && (
                <TableHead className="text-right">
                  <Skeleton className="h-4 w-12 ml-auto" />
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    {colIndex === 0 ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32 hidden md:block" />
                      </div>
                    ) : colIndex === columns - 1 ? (
                      <Skeleton className="h-6 w-16" />
                    ) : (
                      <Skeleton className="h-4 w-full max-w-[80px]" />
                    )}
                  </TableCell>
                ))}
                {hasAction && (
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
