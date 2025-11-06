import { POST } from "@/app/api/checkout/route";

describe("Checkout API", () => {
  const articles = [
    { id: 1, name: "Test", price: 2000 },
    { id: 2, name: "Item", price: 4000 },
  ];

  it("applies correct delivery fees", async () => {
    const req = {
      json: async () => ({
        articles,
        carts: [
          { id: 1, items: [{ article_id: 1, quantity: 1 }] }, // $20
          { id: 2, items: [{ article_id: 2, quantity: 2 }] }, // $80
          { id: 3, items: [{ article_id: 2, quantity: 3 }] }, // $120
        ],
      }),
    } as any;

    const res = await POST(req);
    const data = await res.json();

    expect(data.carts[0].delivery).toBe(1000);
    expect(data.carts[1].delivery).toBe(500);
    expect(data.carts[2].delivery).toBe(0);
  });
});
