import { Banner } from '@/components/Banner';
import { Header } from '@/components/Header';
import { Pagination } from '@/components/Pagination';
import { PostCard } from '@/components/PostCard';
import { PostFilters } from '@/components/PostFilters';
import { useUrlState } from '@/hooks/useUrlState';
import { fetchIdeas, type Post } from '@/services/api';
import { useEffect, useState } from 'react';


const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);


  const {
    currentPage,
    itemsPerPage,
    sortOrder,
    updateCurrentPage,
    updateItemsPerPage,
    updateSortOrder,
  } = useUrlState({
    defaultPage: 1,
    defaultItemsPerPage: 10,
    defaultSort: 'newest',
  });


  // Fetch data when URL state changes
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const result = await fetchIdeas(currentPage, itemsPerPage, sortOrder);
        setPosts(result.posts);
        setTotalPages(result.totalPages);
        setTotalItems(result.totalItems);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };


    loadPosts();
  }, [currentPage, itemsPerPage, sortOrder]);


  return (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-header">
      <Banner
        title="Ideas"
        subtitle="Where all our great things begin"
      />
        
        <div className="container mx-auto px-4 py-12">
          <PostFilters
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            sortOrder={sortOrder}
            onSortChange={updateSortOrder}
            onItemsPerPageChange={updateItemsPerPage}
          />


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {loading ? (
              // Loading skeleton
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <div key={index} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                  <div className="aspect-[4/3] bg-muted animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
                    <div className="space-y-2">
                      <div className="h-4 bg-muted animate-pulse rounded" />
                      <div className="h-4 bg-muted animate-pulse rounded w-4/5" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>


          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={updateCurrentPage}
          />
        </div>
      </main>
    </div>
  );
};


export default Index;