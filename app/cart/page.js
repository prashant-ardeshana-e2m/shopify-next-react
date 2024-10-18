"use client"; // Ensures client-side rendering

import { useState, useEffect } from 'react';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  // Load cart from local storage
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
  }, []);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-xl text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-lg font-medium">{item.title}</h2>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-lg">${item.price}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right">
            <p className="text-2xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
