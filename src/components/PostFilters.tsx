import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PostFiltersProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  sortOrder: 'newest' | 'oldest';
  onSortChange: (sort: 'newest' | 'oldest') => void;
  onItemsPerPageChange: (items: number) => void;
}

export function PostFilters({
  currentPage,
  totalItems,
  itemsPerPage,
  sortOrder,
  onSortChange,
  onItemsPerPageChange,
}: PostFiltersProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="text-sm text-muted-foreground">
        Showing {startItem} - {endItem} of {totalItems}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground whitespace-nowrap">Show per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => onItemsPerPageChange(Number(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground whitespace-nowrap">Sort by:</span>
          <Select value={sortOrder} onValueChange={onSortChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}