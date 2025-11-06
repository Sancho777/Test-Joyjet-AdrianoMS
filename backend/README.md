# Backend Project

<https://test-joyjet-adriano-ms-ehf4.vercel.app/cart>

## 🛒 E-Commerce Checkout API (Level 1)

This project is part of the **Joyjet Technical Test — Backend Level 1**.
It implements a simple **e-commerce checkout API** using **Next.js (App Router)** and **TypeScript**.

The API receives a JSON payload containing articles and shopping carts, then calculates the **total price** for each cart based on the sum of item prices × quantity.

---

## 📁 Project Structure

├─ app/

│ └─ api/

│ └─ checkout/

│ └─ route.ts # API endpoint logic

├─ services/

│ └─ cartService.ts # Core calculation logic

├─ types/

│ └─ index.d.ts # TypeScript definitions

├─ tests/

│ └─ cartService.test.ts # Unit tests for service layer

├─ jest.config.mjs # Jest config (ESM)

├─ package.json

└─ tsconfig.json

---

## 🚀 How to Run the App

```bash
git clone git@bitbucket.org:<you>/joyjet-quiz.git
cd backend
```

### 1️⃣ Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Once running, the API will be available at:

```bash
http://localhost:3000/api/checkout
```

### Request Format (POST /api/checkout)

The endpoint expects a JSON payload like:

```json
{
  "articles": [
    { "id": 1, "name": "water", "price": 100 },
    { "id": 2, "name": "honey", "price": 200 },
    { "id": 3, "name": "mango", "price": 400 },
    { "id": 4, "name": "tea", "price": 1000 }
  ],
  "carts": [
    {
      "id": 1,
      "items": [
        { "article_id": 1, "quantity": 6 },
        { "article_id": 2, "quantity": 2 },
        { "article_id": 4, "quantity": 1 }
      ]
    },
    {
      "id": 2,
      "items": [
        { "article_id": 2, "quantity": 1 },
        { "article_id": 3, "quantity": 3 }
      ]
    },
    {
      "id": 3,
      "items": []
    }
  ]
}

```

## Response Format

```json
{
  "carts": [
    { "id": 1, "total": 2000 },
    { "id": 2, "total": 1400 },
    { "id": 3, "total": 0 }
  ]
}
```

## How to Test with PowerShell

You can test the endpoint locally using PowerShell’s built-in HTTP tools.

From the project root (./), run:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/checkout" `
  -Method POST `
  -ContentType "application/json" `
  -InFile ".\data.json"
  ```

This command:

Sends the content of data.json to the /api/checkout endpoint.

Returns the calculated totals directly in the terminal.

## 💾 (Optional) Save the response to output.json

```bash
Invoke-RestMethod -Uri "http://localhost:3000/api/checkout" `
  -Method POST `
  -ContentType "application/json" `
  -InFile ".\data.json" |
  ConvertTo-Json -Depth 10 > ".\backend_tasks\level1\output.json"
```

## 🖥️ Testing the API on macOS / Linux

You can send a POST request to the checkout API using `curl` directly from the terminal.

From the project root (./), run:

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d @data.json
```

## Running Unit Tests

The core calculation logic is covered by Jest unit tests.

Run all tests with:

```bash
npm test
```

## 🌐 Level 2: Frontend

- Page: `/cart`
- Displays product list
- Users can add items to the cart
- Checkout button calls `/api/checkout`
- Displays total returned from backend

## How it Works

- The `/api/checkout` endpoint calculates totals and delivery based on spending.
- The frontend (`/cart`) displays products, manages cart items, and calls the API.

### Delivery Fee Rules

| Cart Subtotal | Delivery Fee |
|---------------:|-------------:|
| < $50          | $10          |
| $50–$100       | $5           |
| ≥ $100         | Free         |

### Level 3 — Discounts

Two kinds of discounts are supported:

- **amount**: fixed price reduction
- **percentage**: proportional reduction

Discounts are applied per item before calculating totals and delivery.

Example article:

```json
{ "id": 1, "price": 10000, "discount": { "type": "percentage", "value": 10 } }
```

## 🧩 Tech Stack

- Next.js (App Router)

- TypeScript

- Jest + ts-jest for unit tests

- ESM Modules

- PowerShell / curl for manual testing
