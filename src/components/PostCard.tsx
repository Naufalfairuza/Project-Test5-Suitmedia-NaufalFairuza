import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Post {
  id: string;
  title: string;
  image: string;
  date: string;
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', post.image);
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error('Image failed to load:', post.image);
    setImageError(true);
  };

  return (
    <article className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        {!imageError ? (
          <img
            src={post.image}
            alt={post.title}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-muted-foreground text-sm mb-2">Image not available</div>
              <div className="text-xs text-muted-foreground break-all">
                {post.image}
              </div>
            </div>
          </div>
        )}
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
      </div>
      
      <div className="p-4">
        <time className="text-sm text-muted-foreground mb-2 block">
          {post.date}
        </time>
        <h3 className="text-foreground font-medium leading-tight line-clamp-3">
          {post.title}
        </h3>
      </div>
    </article>
  );
}