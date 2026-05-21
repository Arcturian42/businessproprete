import Link from 'next/link';

export const metadata = {
  title: 'Page introuvable',
  description: 'La page demandée n\'existe pas ou a été déplacée.',
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm uppercase tracking-wide text-brand">404</p>
        <h1 className="mt-4 text-3xl font-bold text-text-primary">
          Page introuvable
        </h1>
        <p className="mt-3 text-text-secondary">
          La page que vous cherchez n&apos;existe pas, a été déplacée, ou est
          temporairement indisponible.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-button bg-brand px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-dark"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/guides"
            className="inline-flex h-11 items-center rounded-button border border-border-light px-6 text-sm font-semibold text-text-primary transition-colors duration-150 hover:bg-surface-alt"
          >
            Consulter les guides
          </Link>
        </div>
      </div>
    </main>
  );
}
