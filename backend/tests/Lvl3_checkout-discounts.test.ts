import { POST } from "@/app/api/checkout/route";
import type { InputData, Discount } from "@/types";

describe("Checkout API - Level 3 (Discounts)", () => {
  const articles = [
    { id: 1, name: "Caviar", price: 30000 },
    { id: 2, name: "Creme", price: 500 },
    { id: 3, name: "Bread", price: 200 }
  ];

  // Explicitly type the discounts array
  const discounts: Discount[] = [
    { article_id: 1, type: "amount", value: 5000 },
    { article_id: 2, type: "percentage", value: 20 }
  ];

  function makeRequest(payload: Partial<InputData> & { discounts?: Discount[] }) {
    return {
      json: async () => payload
    } as Request;
  }

  it("applies amount discount correctly", async () => {
    const req = makeRequest({
      articles,
      carts: [{ id: 1, items: [{ article_id: 1, quantity: 1 }] }],
      discounts
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.carts[0].total).toBe(25000);
  });

  it("applies percentage discount correctly", async () => {
    const req = makeRequest({
      articles,
      carts: [{ id: 1, items: [{ article_id: 2, quantity: 2 }] }],
      discounts
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.carts[0].total).toBe(800);
  });

  it("mixes discount and delivery rules", async () => {
    const req = makeRequest({
      articles,
      carts: [{ id: 1, items: [{ article_id: 1, quantity: 1 }, { article_id: 2, quantity: 4 }] }],
      discounts
    });

    const res = await POST(req);
    const data = await res.json();
    const cart = data.carts[0];

    expect(cart.delivery).toBe(0);
    expect(cart.grandTotal).toBe(cart.total + cart.delivery);
  });
});
