import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseUrlStateOptions {
  defaultPage?: number;
  defaultItemsPerPage?: number;
  defaultSort?: 'newest' | 'oldest';
}

export function useUrlState({
  defaultPage = 1,
  defaultItemsPerPage = 10,
  defaultSort = 'newest',
}: UseUrlStateOptions = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam, 10) : defaultPage;
  });
  
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const itemsParam = searchParams.get('items');
    return itemsParam ? parseInt(itemsParam, 10) : defaultItemsPerPage;
  });
  
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>(() => {
    const sortParam = searchParams.get('sort');
    return (sortParam === 'newest' || sortParam === 'oldest') ? sortParam : defaultSort;
  });

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (currentPage !== defaultPage) {
      params.set('page', currentPage.toString());
    }
    
    if (itemsPerPage !== defaultItemsPerPage) {
      params.set('items', itemsPerPage.toString());
    }
    
    if (sortOrder !== defaultSort) {
      params.set('sort', sortOrder);
    }

    setSearchParams(params, { replace: true });
  }, [currentPage, itemsPerPage, sortOrder, defaultPage, defaultItemsPerPage, defaultSort, setSearchParams]);

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const updateItemsPerPage = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const updateSortOrder = (sort: 'newest' | 'oldest') => {
    setSortOrder(sort);
    setCurrentPage(1); // Reset to first page when changing sort
  };

  return {
    currentPage,
    itemsPerPage,
    sortOrder,
    updateCurrentPage,
    updateItemsPerPage,
    updateSortOrder,
  };
}