import { TableSkeleton } from "@/components/skeletons/table-skeleton"

export default function Loading() {
  return <TableSkeleton columns={5} rows={5} hasAction={true} hasSearch={true} />
}
