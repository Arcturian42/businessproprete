'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { PRIMARY_NAV } from '@/lib/data/navigation';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-text-ondark hover:bg-white/10 md:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs bg-white">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Logo variant="light" />
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1 px-6 pb-6" aria-label="Navigation principale">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex flex-col gap-1 rounded-button px-3 py-3 text-text-primary transition-colors hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span className="text-base font-semibold">{item.label}</span>
              {item.description && (
                <span className="text-xs text-text-muted">{item.description}</span>
              )}
            </Link>
          ))}
          <Link
            href="/newsletter"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center rounded-button bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            S&apos;abonner à la newsletter
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
