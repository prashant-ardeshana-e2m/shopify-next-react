import Link from 'next/link';
import { fetchCollections } from '../../lib/collections';

export default async function CollectionsPage() {
  const collections = await fetchCollections();

  if (!collections) {
    return <div>Error fetching collection details.</div>;
  }

  return (
    <div>
      <h1>Collections</h1>
      <div>
        {collections.edges.map((collection) => (
          <div key={collection.node.id}>
            <h2>
              <Link href={`/collections/${collection.node.handle}`}>
                {collection.node.title}
              </Link>
            </h2>
            <p>{collection.node.description}</p>
            {collection.node.image && (
              <img src={collection.node.image.src} alt={collection.node.title} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
