import { calculateCartTotals } from "@/services/cartService";
import { InputData } from "@/types";

const sampleData: InputData = {
  articles: [
    { id: 1, name: "water", price: 100 },
    { id: 2, name: "honey", price: 200 },
  ],
  carts: [
    { id: 1, items: [{ article_id: 1, quantity: 2 }, { article_id: 2, quantity: 3 }] },
    { id: 2, items: [] }
  ]
};

test("calculateCartTotals returns correct totals", () => {
  const result = calculateCartTotals(sampleData.carts, sampleData.articles, [], []);
  expect(result).toEqual([
    { id: 1, total: 800, delivery: 500, grandTotal: 1300 },
    { id: 2, total: 0, delivery: 500, grandTotal: 500 }
  ]);
});
