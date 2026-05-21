import { Sparkles } from 'lucide-react';

import { NewsletterForm } from '@/components/content/newsletter-form';
import { cn } from '@/lib/utils';

/**
 * Empty-state for hubs whose content is being actively curated.
 * Lets visitors subscribe to the newsletter while we ship content.
 */
export function ComingSoonBlock({
  title,
  description,
  source,
  className,
}: {
  title: string;
  description?: string;
  source: string;
  className?: string;
}) {
  return (
    <section
      className={cn('bg-surface py-16 md:py-20', className)}
      aria-label="Contenu en cours de publication"
    >
      <div className="container mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-card bg-brand-light text-brand"
          aria-hidden="true"
        >
          <Sparkles className="h-7 w-7" />
        </span>
        <h2 className="mt-6 text-2xl font-bold text-text-primary">{title}</h2>
        {description && (
          <p className="mx-auto mt-3 max-w-xl text-base text-text-secondary">
            {description}
          </p>
        )}
        <div className="mx-auto mt-8 max-w-md">
          <NewsletterForm source={source} />
          <p className="mt-3 text-xs text-text-muted">
            Soyez prévenu·e à la publication. Désinscription en un clic.
          </p>
        </div>
      </div>
    </section>
  );
}
