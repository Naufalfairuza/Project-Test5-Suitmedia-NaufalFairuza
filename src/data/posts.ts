// Mock data for posts - replace with API calls later
export interface Post {
  id: string;
  title: string;
  image: string;
  date: string;
  timestamp: number;
}

// Backup data jika server API down, Development fallback
//Testing purposes tanpa API depedency
export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Kenali Tingkatan Influencers berdasarkan Jumlah Followers',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    date: '5 SEPTEMBER 2022',
    timestamp: 1662336000000,
  },
  {
    id: '2',
    title: 'Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer Marketing yang Tepat',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    date: '5 SEPTEMBER 2022',
    timestamp: 1662336000000,
  },
  {
    id: '3',
    title: 'Kenali Tingkatan Influencers berdasarkan Jumlah Followers untuk Meningkatkan Brand Awareness',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    date: '5 SEPTEMBER 2022',
    timestamp: 1662336000000,
  },
  {
    id: '4',
    title: 'Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer Marketing yang Tepat untuk Bisnis Anda',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    date: '5 SEPTEMBER 2022',
    timestamp: 1662336000000,
  },
  {
    id: '5',
    title: 'Tips Memilih Platform Media Sosial yang Tepat untuk Strategi Digital Marketing',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    date: '3 SEPTEMBER 2022',
    timestamp: 1662163200000,
  },
  {
    id: '6',
    title: 'Cara Mengukur ROI dari Kampanye Influencer Marketing',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    date: '1 SEPTEMBER 2022',
    timestamp: 1661990400000,
  },
  {
    id: '7',
    title: 'Mengenal Lebih Dalam tentang Content Marketing Strategy',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    date: '30 AUGUST 2022',
    timestamp: 1661817600000,
  },
  {
    id: '8',
    title: 'Brand Activation: Strategi Ampuh untuk Meningkatkan Brand Engagement',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    date: '28 AUGUST 2022',
    timestamp: 1661644800000,
  },
  {
    id: '9',
    title: 'Social Media Analytics: Cara Mengukur Performa Konten Anda',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    date: '25 AUGUST 2022',
    timestamp: 1661385600000,
  },
  {
    id: '10',
    title: 'Video Marketing Trends yang Wajib Diketahui di Tahun 2022',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    date: '22 AUGUST 2022',
    timestamp: 1661126400000,
  },
  {
    id: '11',
    title: 'Membangun Personal Branding di Era Digital',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    date: '20 AUGUST 2022',
    timestamp: 1660953600000,
  },
  {
    id: '12',
    title: 'Customer Journey Mapping untuk Strategi Marketing yang Efektif',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    date: '18 AUGUST 2022',
    timestamp: 1660780800000,
  },
  {
    id: '13',
    title: 'E-commerce Marketing: Tips Meningkatkan Penjualan Online',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    date: '15 AUGUST 2022',
    timestamp: 1660521600000,
  },
  {
    id: '14',
    title: 'SEO vs SEM: Mana yang Lebih Efektif untuk Bisnis Anda?',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    date: '12 AUGUST 2022',
    timestamp: 1660262400000,
  },
  {
    id: '15',
    title: 'Digital Transformation: Mengapa Penting untuk Bisnis Modern',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    date: '10 AUGUST 2022',
    timestamp: 1660089600000,
  },
];

export function getPosts(
  page: number = 1,
  itemsPerPage: number = 10,
  sortOrder: 'newest' | 'oldest' = 'newest'
): { posts: Post[]; totalPages: number; totalItems: number } {
  // Sort posts
  const sortedPosts = [...mockPosts].sort((a, b) => {
    return sortOrder === 'newest' 
      ? b.timestamp - a.timestamp 
      : a.timestamp - b.timestamp;
  });

  // Paginate
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const posts = sortedPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPages: Math.ceil(mockPosts.length / itemsPerPage),
    totalItems: mockPosts.length,
  };
}