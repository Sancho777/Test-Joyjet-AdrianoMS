"use client";

import React from "react";
import type { Article, CartItem } from "@/types";

interface ProductListProps {
  articles: Article[];
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function ProductList({ articles, cartItems, setCartItems }: ProductListProps) {
  const addToCart = (articleId: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.article_id === articleId);
      if (existing) {
        return prev.map(item =>
          item.article_id === articleId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { article_id: articleId, quantity: 1 }];
      }
    });
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            {article.name} - ${ (article.price / 100).toFixed(2) }{" "}
            <button onClick={() => addToCart(article.id)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
