// API service for Ideas endpoints
export interface ApiPost {
  id: number;
  title: string;
  content: string;
  slug: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  small_image?: Array<{
    id: number;
    url: string;
  }>;
  medium_image?: Array<{
    id: number;
    url: string;
  }>;
}

export interface ApiResponse {
  data: ApiPost[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number;
    to?: number;
    // Remove pagination wrapper yang mungkin tidak ada
  };
}


export interface Post {
  id: string;
  title: string;
  image: string;
  date: string;
  timestamp: number;
}

const API_BASE_URL = 'https://suitmedia-backend.suitdev.com/api';

// formatDate
function formatDate(dateString: string): string {
  try {
    if (!dateString) return 'Unknown Date';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long', 
      year: 'numeric',
    };
    
    return date.toLocaleDateString('id-ID', options).toUpperCase();
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Unknown Date';
  }
}

export async function fetchIdeas(
  page: number = 1,
  pageSize: number = 10,
  sortOrder: 'newest' | 'oldest' = 'newest'
): Promise<{ posts: Post[]; totalPages: number; totalItems: number }> {
  console.log('fetchIdeas called:', { page, pageSize, sortOrder });
  
  try {
    const sort = sortOrder === 'newest' ? '-published_at' : 'published_at';
    
    const params = new URLSearchParams();
    params.set('page[number]', page.toString());
    params.set('page[size]', pageSize.toString());
    params.append('append[]', 'small_image');
    params.append('append[]', 'medium_image');
    params.set('sort', sort);

    const url = `${API_BASE_URL}/ideas?${params}`;
    console.log('Fetching URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as ApiResponse;
    console.log('Raw API Response Structure:', JSON.stringify(data, null, 2));
    
    const posts: Post[] = (data.data || []).map((apiPost: ApiPost) => ({
      id: apiPost.id?.toString() || 'unknown',
      title: apiPost.title || 'No Title',
      image: apiPost.medium_image?.[0]?.url || 
             apiPost.small_image?.[0]?.url || 
             'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      date: formatDate(apiPost.published_at || ''),
      timestamp: new Date(apiPost.published_at || Date.now()).getTime(),
    }));

    
    const totalItems = data.meta?.total || posts.length;
    const totalPages = data.meta?.last_page || Math.ceil(totalItems / pageSize);

    console.log('Processed data:', { 
      postsCount: posts.length, 
      totalPages, 
      totalItems,
      currentPage: data.meta?.current_page || page
    });

    return {
      posts,
      totalPages,
      totalItems,
    };
  } catch (error) {
    console.error('fetchIdeas error:', error);
    
    if (import.meta.env.DEV) {
      console.log('🔄 Using fallback data in development');
      const { getPosts } = await import('@/data/posts');
      return getPosts(page, pageSize, sortOrder);
    } else {
      console.warn('API unavailable in production - showing empty state');
      return {
        posts: [],
        totalPages: 0,
        totalItems: 0,
      };
    }
  }
}