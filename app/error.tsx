'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm uppercase tracking-wide text-brand">500</p>
        <h1 className="mt-4 text-3xl font-bold text-text-primary">
          Une erreur s&apos;est produite
        </h1>
        <p className="mt-3 text-text-secondary">
          Nous n&apos;avons pas pu charger cette page. Réessayez ou contactez-nous
          si le problème persiste.
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex h-11 items-center rounded-button bg-brand px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-dark"
        >
          Réessayer
        </button>
      </div>
    </main>
  );
}
