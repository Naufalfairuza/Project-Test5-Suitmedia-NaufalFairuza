import bannerImage from '@/assets/ideas-banner.jpg';
import { useEffect, useState } from 'react';

interface BannerProps {
  title: string;
  subtitle: string;
  image?: string;
}

export function Banner({ title, subtitle, image = bannerImage }: BannerProps) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${image})`,
          transform: `translateY(${offsetY * 0.5}px)`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div
        className="relative z-10 flex items-center justify-center h-full text-center text-white px-4"
        style={{
          transform: `translateY(${offsetY * 0.2}px)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
      
      {/* Slanted Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16 lg:h-20"
          fill="currentColor"
        >
          <path
            d="M0,60 L1200,0 L1200,120 L0,120 Z"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  );
}