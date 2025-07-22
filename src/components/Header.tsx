import SuitmediaLogo from '@/assets/SuitMediaLogo.png';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Ideas', href: '/' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-header transition-transform duration-300 ease-smooth',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div
        className={cn(
          'bg-primary/95 backdrop-blur-sm shadow-header transition-all duration-300 ease-smooth',
          lastScrollY > 50 && 'bg-primary/90'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-header">
            <Link to="/" className="flex items-center">
            <img 
            src={SuitmediaLogo} 
            alt="Suitmedia Logo" 
            className="h-8 w-auto max-w-[120px] object-contain brightness-0 invert" 
            style={{ 
              display: 'block',
              minHeight: '32px',
              minWidth: '80px'
            }}
            onLoad={() => console.log('Logo loaded and visible')}
            onError={() => console.error('Logo error')}
  />
</Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 relative',
                    location.pathname === item.href && 'text-primary-foreground font-medium after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary-foreground'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}