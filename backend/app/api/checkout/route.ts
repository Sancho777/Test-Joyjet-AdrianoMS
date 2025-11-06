import { NextResponse } from "next/server";
import type { Article, CartItem, Discount, InputData, CartTotal } from "@/types";

export async function POST(req: Request) {
  const { articles, carts, discounts }: InputData & { discounts?: Discount[] } = await req.json();

  if (!articles || !carts) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const articleMap = new Map<number, Article>(articles.map(a => [a.id, a]));
  const discountMap = new Map<number, Discount>((discounts || []).map(d => [d.article_id, d]));

  const responseCarts: CartTotal[] = carts.map(cart => {
    let total = 0;

    cart.items.forEach((item: CartItem) => {
      const article = articleMap.get(item.article_id);
      if (!article) return;

      let finalPrice = article.price;

      const discount = discountMap.get(article.id);
      if (discount) {
        if (discount.type === "amount") {
          finalPrice = Math.max(0, article.price - discount.value);
        } else if (discount.type === "percentage") {
          finalPrice = Math.round(article.price * (1 - discount.value / 100));
        }
      }

      total += finalPrice * item.quantity;
    });

    // Determine delivery fee based on total
    // You could pass delivery fees in payload or hardcode logic here
    let delivery = 0;
    if (total <= 1000) delivery = 800;
    else if (total <= 2000) delivery = 400;
    else delivery = 0;

    return {
      id: cart.id,
      total,
      delivery,
      grandTotal: total + delivery,
    };
  });

  return NextResponse.json({ carts: responseCarts });
}
