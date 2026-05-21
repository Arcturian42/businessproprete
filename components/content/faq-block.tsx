import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqPageSchema, type FaqEntry } from '@/lib/schema/faq-page';
import { cn } from '@/lib/utils';

export type FaqBlockProps = {
  title?: string;
  entries: FaqEntry[];
  className?: string;
  /** When true, emits a FAQPage JSON-LD script. Default: true. */
  includeSchema?: boolean;
};

/**
 * FAQ accordion + FAQPage Schema.org JSON-LD.
 * Per docs/13-seo-technical-impl.md and design.md §6.FAQBlock.
 */
export function FaqBlock({
  title = 'Questions fréquentes',
  entries,
  className,
  includeSchema = true,
}: FaqBlockProps) {
  if (entries.length === 0) return null;

  return (
    <section
      aria-labelledby="faq-heading"
      className={cn('mx-auto max-w-3xl py-12', className)}
    >
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageSchema(entries)),
          }}
        />
      )}
      <h2
        id="faq-heading"
        className="text-2xl font-bold text-text-primary md:text-3xl"
      >
        {title}
      </h2>
      <Accordion type="single" collapsible className="mt-6 w-full">
        {entries.map((entry, index) => (
          <AccordionItem key={entry.question} value={`item-${index}`}>
            <AccordionTrigger>{entry.question}</AccordionTrigger>
            <AccordionContent>{entry.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
