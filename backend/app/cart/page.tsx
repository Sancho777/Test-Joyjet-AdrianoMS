"use client";

import React, { useState, useEffect } from "react";
import type { Article, CartItem, CartTotal, Discount, Cart } from "@/types";

export default function CartPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<CartTotal | null>(null);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [allCarts, setAllCarts] = useState<CartTotal[]>([]);
  const [currentCartId, setCurrentCartId] = useState<number>(1);

  // Load articles and discounts
  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch("/data.json");
      const data = await res.json();
      setArticles(data.articles);
      setDiscounts(data.discounts || []);
    }
    fetchArticles();
  }, []);

  const getDiscountedPrice = (articleId: number, basePrice: number) => {
    const discount = discounts.find(d => d.article_id === articleId);
    if (!discount) return basePrice;
    if (discount.type === "amount") return Math.max(0, basePrice - discount.value);
    if (discount.type === "percentage") return Math.round(basePrice * (1 - discount.value / 100));
    return basePrice;
  };

  const addToCart = (articleId: number) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.article_id === articleId);
      return existing
        ? prev.map(i =>
            i.article_id === articleId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...prev, { article_id: articleId, quantity: 1 }];
    });
  };

  const removeFromCart = (articleId: number) =>
    setCartItems(prev => prev.filter(i => i.article_id !== articleId));

  const incrementQuantity = (articleId: number) =>
    setCartItems(prev =>
      prev.map(i =>
        i.article_id === articleId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );

  const decrementQuantity = (articleId: number) =>
    setCartItems(prev =>
      prev
        .map(i =>
          i.article_id === articleId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter(i => i.quantity > 0)
    );

  const checkout = async () => {
    if (!cartItems.length) return alert("Cart is empty!");

    const payload = {
      articles,
      carts: [{ id: currentCartId, items: cartItems }],
      discounts,
    };

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setCartTotal(data.carts[0]);
    setAllCarts(data.carts);
  };

  const switchCart = (cartId: number) => {
    const selectedCart = allCarts.find(c => c.id === cartId);
    if (!selectedCart) return;
    setCurrentCartId(cartId);
    // Map back to cartItems to allow editing quantities
    // This is a placeholder: in real app, cartItems should be saved per cart
    setCartItems(cartItems);
    setCartTotal(selectedCart);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Products */}
      <div className="flex-1 p-8 bg-gradient-to-b from-indigo-100 to-purple-100 border-r border-indigo-200 shadow-inner">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">
          🛍️ Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => {
            const discountedPrice = getDiscountedPrice(article.id, article.price);
            const hasDiscount = discountedPrice < article.price;

            return (
              <div
                key={article.id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition border border-indigo-100 relative"
              >
                {hasDiscount && (
                  <span className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    SALE
                  </span>
                )}
                <h2 className="text-xl font-semibold text-gray-800 capitalize">
                  {article.name}
                </h2>

                <div className="mt-2">
                  {hasDiscount ? (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400 line-through">
                        ${(article.price / 100).toFixed(2)}
                      </span>
                      <span className="text-lg font-semibold text-rose-600">
                        ${(discountedPrice / 100).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-medium text-indigo-600">
                      ${(article.price / 100).toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(article.id)}
                  className="mt-4 w-full rounded-xl bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="md:w-1/3 bg-white border-l border-indigo-200 p-8 sticky top-0 h-screen overflow-y-auto shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          🛒 Your Cart
        </h2>

        {/* Optional Cart Switcher */}
        {allCarts.length > 1 && (
          <div className="mb-4 flex space-x-2">
            {allCarts.map(c => (
              <button
                key={c.id}
                onClick={() => switchCart(c.id)}
                className={`px-3 py-1 rounded-xl font-semibold ${
                  c.id === currentCartId
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Cart {c.id}
              </button>
            ))}
          </div>
        )}

        {cartItems.length === 0 ? (
          <p className="text-gray-600 italic">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map(item => {
              const article = articles.find(a => a.id === item.article_id);
              if (!article) return null;

              const discountedPrice = getDiscountedPrice(article.id, article.price);
              const hasDiscount = discountedPrice < article.price;

              return (
                <li
                  key={item.article_id}
                  className="flex items-center justify-between bg-indigo-50 rounded-xl p-3 border border-indigo-100 shadow-sm"
                >
                  <div>
                    <p className="font-medium text-gray-800 capitalize">
                      {article.name}
                    </p>
                    {hasDiscount ? (
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through">
                          ${(article.price * item.quantity / 100).toFixed(2)}
                        </span>
                        <span className="text-sm text-rose-600 font-medium">
                          ${(discountedPrice * item.quantity / 100).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm text-indigo-600 font-medium">
                        ${(article.price * item.quantity / 100).toFixed(2)}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementQuantity(item.article_id)}
                      className="px-3 py-1 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold transition"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-gray-800 font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementQuantity(item.article_id)}
                      className="px-3 py-1 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.article_id)}
                      className="ml-2 text-red-500 hover:text-red-600 transition"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-8 border-t border-indigo-200 pt-4">
          {cartTotal ? (
            <>
              <p className="text-lg font-medium text-gray-700">
                Subtotal:{" "}
                <span className="text-indigo-600">
                  ${(cartTotal.total / 100).toFixed(2)}
                </span>
              </p>
              <p className="text-lg font-medium text-gray-700">
                Delivery:{" "}
                <span className="text-indigo-600">
                  ${(cartTotal.delivery / 100).toFixed(2)}
                </span>
              </p>
              <p className="text-xl font-bold text-indigo-700 mt-2">
                Total: ${(cartTotal.grandTotal / 100).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">
              Proceed to checkout to calculate total
            </p>
          )}

          <button
            onClick={checkout}
            disabled={cartItems.length === 0}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
