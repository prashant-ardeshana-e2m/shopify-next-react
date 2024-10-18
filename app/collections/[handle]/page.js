import Link from 'next/link';
import { fetchCollectionProducts } from '../../../lib/collection';

export default async function CollectionPage({ params }) {
  const { handle } = params;
  const collection = await fetchCollectionProducts(handle);

  if (!collection) {
    return <div>Error fetching collection products.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">{collection.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collection.products.edges.map((product) => (
          <div key={product.node.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {product.node.images.edges[0] && (
              <img
                src={product.node.images.edges[0].node.src}
                alt={product.node.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-medium text-black">
                <Link href={`/products/${product.node.handle}`}>
                  {product.node.title}
                </Link>
              </h2>
              <p className="text-gray-600 mt-2">{product.node.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
