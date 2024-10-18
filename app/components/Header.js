"use client"; // Ensures client-side interactivity

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart.reduce((total, item) => total + item.quantity, 0));
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
      {/* Left Side: Logo + Links */}
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          LOGO
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link href="/collections" className="text-gray-700 hover:text-black">
            Collections
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-black">
            Blog
          </Link>
          <Link href="/about-us" className="text-gray-700 hover:text-black">
            About Us
          </Link>
        </nav>
      </div>

      {/* Right Side: Login + Cart */}
      <div className="flex items-center space-x-6">
        <Link href="/login" className="text-gray-700 hover:text-black">
          Login
        </Link>
        <Link href="/cart" className="relative text-gray-700 hover:text-black">
          Cart
          {cartItems > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
              {cartItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
