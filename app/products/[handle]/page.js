"use client"; // This marks the entire file as a Client Component

import { fetchProductDetails } from '../../../lib/product';
import { useState } from 'react';

export default async function ProductPage({ params }) {
  const { handle } = params;
  const product = await fetchProductDetails(handle);

  if (!product) {
    return <div>Error fetching product details.</div>;
  }

  return <ProductDetails product={product} />;
}

// Separate the client-side part into its own Client Component
function ProductDetails({ product }) {
  "use client"; // Enables client-side rendering for this component
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      {product.images.edges[0] && (
        <img
          src={product.images.edges[0].node.src}
          alt={product.title}
          className="w-full h-64 object-cover mb-4"
        />
      )}
      <p className="text-xl text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-semibold mb-4">Price: ${product.priceRange.minVariantPrice.amount}</p>

      {/* Quantity Selector */}
      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="mr-4">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 text-center border border-gray-300 rounded"
        />
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
