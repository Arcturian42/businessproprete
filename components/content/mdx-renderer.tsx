import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { ATenirBox } from '@/components/content/a-tenir-box';
import { AttentionBox } from '@/components/content/attention-box';
import { BlufBox } from '@/components/content/bluf-box';
import { CtaBox } from '@/components/content/cta-box';
import { DataHighlightBox } from '@/components/content/data-highlight-box';
import { FaqBlock } from '@/components/content/faq-block';
import { cn } from '@/lib/utils';

/**
 * Custom components exposed to MDX content authors.
 * Authors can write:
 *
 *   <BlufBox>En 2025 le salaire minimum d'un agent...</BlufBox>
 *   <ATenirBox>Trois points à retenir...</ATenirBox>
 *   <FaqBlock title="FAQ" entries={[{ question, answer }, ...]} />
 *
 * Native HTML tags (h2, h3, table, blockquote, etc.) are also
 * restyled here so MDX prose matches design.md without needing
 * @tailwindcss/typography.
 */
const components: MDXRemoteProps['components'] = {
  h2: (props) => (
    <h2
      {...props}
      className={cn(
        'mt-12 scroll-mt-24 text-2xl font-bold text-text-primary md:text-3xl',
        props.className,
      )}
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className={cn(
        'mt-8 scroll-mt-24 text-xl font-semibold text-text-primary',
        props.className,
      )}
    />
  ),
  h4: (props) => (
    <h4
      {...props}
      className={cn('mt-6 text-lg font-semibold text-text-primary', props.className)}
    />
  ),
  p: (props) => (
    <p
      {...props}
      className={cn('mt-4 text-base leading-relaxed text-text-secondary', props.className)}
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      className={cn(
        'mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-text-secondary',
        props.className,
      )}
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className={cn(
        'mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-text-secondary',
        props.className,
      )}
    />
  ),
  a: (props) => (
    <a
      {...props}
      className={cn(
        'text-brand underline-offset-2 transition-colors hover:text-brand-dark hover:underline',
        props.className,
      )}
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className={cn(
        'mt-6 border-l-4 border-brand bg-surface px-5 py-3 text-base italic text-text-primary',
        props.className,
      )}
    />
  ),
  table: (props) => (
    <div className="mt-6 overflow-x-auto">
      <table {...props} className="w-full border-collapse text-sm" />
    </div>
  ),
  thead: (props) => <thead {...props} className="bg-surface-alt" />,
  th: (props) => (
    <th
      {...props}
      className={cn(
        'border border-border-light px-3 py-2 text-left text-sm font-semibold text-text-primary',
        props.className,
      )}
    />
  ),
  td: (props) => (
    <td
      {...props}
      className={cn(
        'border border-border-light px-3 py-2 align-top text-sm text-text-secondary',
        props.className,
      )}
    />
  ),
  code: (props) => (
    <code
      {...props}
      className={cn(
        'rounded bg-surface-alt px-1.5 py-0.5 font-mono text-[0.9em] text-text-primary',
        props.className,
      )}
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className={cn(
        'mt-6 overflow-x-auto rounded-card bg-navy-deep p-5 font-mono text-sm text-text-ondark',
        props.className,
      )}
    />
  ),
  hr: (props) => <hr {...props} className="my-10 border-border-light" />,
  // Custom callouts exposed to MDX authors:
  BlufBox,
  ATenirBox,
  AttentionBox,
  DataHighlightBox,
  CtaBox,
  FaqBlock,
};

/**
 * NOTE on next-mdx-remote version: pinned to ^5 (not ^6) on purpose.
 *
 * GHSA-g4xw-jxrg-5f6m affects v5 by allowing arbitrary code execution
 * when rendering UNTRUSTED MDX content. Our threat model excludes that:
 * every MDX file is committed under /content/ by editorial authors —
 * there is no user-uploaded MDX surface anywhere in the app.
 *
 * Upgrade to v6 was attempted (commits in chat history) and broke the
 * custom-component prop forwarding used by BlufBox / FaqBlock & co
 * during RSC serialization. Re-evaluate when v6 stabilises that API.
 */
export function MdxRenderer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'append' }],
          ],
        },
      }}
    />
  );
}
