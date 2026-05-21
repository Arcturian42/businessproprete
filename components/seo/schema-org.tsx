/**
 * Server component that injects one or more JSON-LD blocks.
 * Usage:
 *   <SchemaOrg schemas={[articleSchema(...), faqPageSchema(...)]} />
 *
 * Each schema is emitted as its own <script type="application/ld+json">
 * to keep them independently extractable by crawlers.
 */
export function SchemaOrg({
  schemas,
}: {
  schemas: Array<Record<string, unknown>>;
}) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          // index-based key is stable since the parent passes a fixed array
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
