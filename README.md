# Joyjet Technical Interview Project

This repository contains two separate tasks — one for **Backend** and one for **Frontend** — developed for the Joyjet technical interview process.

---

## 📂 Project Structure

.
├── backend/ # Backend API challenge (Level 1–3)

├── frontend/ # Frontend quiz application challenge

└── README.md # This file

---

## 🧠 Overview

### 🖥️ Frontend Task

The **Frontend** folder contains a test designed to evaluate knowledge in modern front-end development using **React**, **Vue.js**, or **Angular** (depending on your chosen stack).

#### **Requirements**

- Develop a **Quiz Application** where users can:
  - Create quizzes, questions, and answers.
  - Each quiz can have multiple questions.
  - Each question can have multiple answers (at least 4), with one being correct.
  - When selecting a quiz, display all its questions and answers.
  - When answering a question, indicate whether the chosen answer is correct.
- Use **npm** or **yarn** for dependency management.
- Choose a UI theme (e.g., **Bootstrap**, **Foundation**, etc.).
- Use third-party libraries as needed.
- Decide how to store the data (local storage, database, JSON, etc.).

#### **Nice-to-haves**

- Use of **Redux** (or equivalent state management library).
- Modular and reusable components.
- Unit or functional tests.
- Clean, well-documented code.

📘 **Note:** Detailed setup and execution instructions are included in the `frontend/README.md` file.

---

### ⚙️ Backend Task

The **Backend** folder contains a multi-level API challenge that simulates part of an **e-commerce system**.
Each level builds upon the previous one.

#### **Level 1 – Basic Cart Checkout**

Customers can:

- Add articles to a virtual cart.
- Checkout their cart contents.
- Get the order delivered the next day.

The API should:

- Receive a payload like `data.json`.
- Respond with an output like `output.json`.
- Sum article prices to calculate the total charge.

---

#### **Level 2 – Delivery Fee Calculation**

Delivery cost depends on the total cart value:

- The more the customer spends, the less they pay for delivery.
- Handle varying delivery fees based on cart totals.

---

#### **Level 3 – Discounts**

Some products have discounts:

- **Fixed discounts** — e.g., get €50 off a €300 product (pay €250).
- **Percentage discounts** — e.g., get 20% off a €5 product (pay €4).

The API should:

- Apply discounts accurately to the final price.
- Maintain the same `data.json` → `output.json` structure.

---

#### **General Notes**

- Prices are expressed in **cents**.
- The payload can include one or more carts.
- Articles act as a **map** for your price and discount calculations.
- Ensure clean structure, **unit tests**, and **good documentation** describing how the project works and how to run it.

📘 **Note:** Detailed setup and execution instructions are included in the `backend/README.md` file.

---

## 🧩 Summary

Each folder contains:

- Source code for the respective challenge.
- A dedicated `README.md` file with setup, execution, and test instructions.
