import Link from 'next/link';

import { Logo } from '@/components/layout/logo';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { Button } from '@/components/ui/button';
import { PRIMARY_NAV } from '@/lib/data/navigation';
import { cn } from '@/lib/utils';

/**
 * Top-of-page navigation header.
 * Deep Navy background (design.md §6.Header), sticky, 64px desktop / 56px mobile.
 *
 * Sticky scroll-behaviour (slide hide/show) sera ajouté en client component
 * dans un wrapper séparé si nécessaire — pour le MVP on garde un sticky simple.
 */
export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-header w-full border-b border-white/10 bg-navy backdrop-blur-md supports-[backdrop-filter]:bg-navy/95',
        className,
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Propreté Business — Accueil"
          className="rounded-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
        >
          <Logo variant="dark" />
        </Link>

        <nav
          className="hidden md:flex md:items-center md:gap-1"
          aria-label="Navigation principale"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-button px-3 py-2 text-sm font-medium text-border-dark transition-colors duration-150 hover:text-text-ondark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outlineDark" size="sm" className="hidden md:inline-flex">
            <Link href="/newsletter">Newsletter</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
