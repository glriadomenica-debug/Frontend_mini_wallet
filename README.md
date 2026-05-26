# Mini Wallet Frontend

Modern frontend application for Mini Wallet System built using React, TypeScript, Tailwind CSS, and Axios.

---

# Preview

Mini Wallet is a simple digital wallet application that allows users to:

- Login securely
- View wallet balance
- Top up balance
- Transfer money to another user
- View recent transaction history

The application is designed with a clean modern UI/UX using soft colors and responsive layouts.

---

# Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM
- React Toastify

---

# Features

## Authentication
- Login system
- Token-based authentication
- Auto save token using localStorage
- Logout feature

## Dashboard
- User profile info
- Wallet balance card
- Responsive design
- Soft gradient UI

## Top Up
- Popup modal topup
- Update balance automatically
- Transaction history updated instantly

## Transfer
- Transfer using:
  - Username
  - Phone number
- Prevent self transfer
- Validation system
- Real-time balance update

## Transaction History
- Show incoming/outgoing transactions
- Green color for income
- Red color for expense
- Transaction timestamps
- Currency formatting (IDR)

---

# Installation

Clone repository:

```bash
git clone https://github.com/glriadomenica-debug/Frontend_mini_wallet.git
```

Go to project folder:

```bash
cd Frontend_mini_wallet
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend application will run on:

```bash
http://localhost:5173
```

---

# Required Packages

If some packages are missing, install them manually:

```bash
npm install axios
npm install react-router-dom
npm install react-toastify
npm install tailwindcss @tailwindcss/vite
```

---

# Project Structure

```bash
src/
│
├── assets/
│
├── components/
│   ├── modals/
│   │   ├── topupModal.tsx
│   │   └── transferModal.tsx
│
├── layouts/
│   ├── dashboard/
│   └── login/
│
├── pages/
│   ├── auth/
│   │   └── login/
│   └── dashboard/
│
├── routes/
│
├── App.tsx
└── main.tsx
```

---

# Main Pages

## Login Page
Modern login form with responsive UI.

## Dashboard
Displays:
- User information
- Wallet balance
- Top up button
- Transfer button
- Recent transactions

---

# API Integration

Frontend connected with Laravel backend API.

Base URL:

```bash
http://localhost:8000/api
```

Endpoints used:

| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/login | Login |
| GET | /balance | Get wallet balance |
| POST | /topup | Top up balance |
| POST | /transfer | Transfer balance |
| GET | /transactions | Transaction history |

---

# Authentication

Token stored in localStorage:

```js
localStorage.setItem("token", token);
```

Authorization header:

```js
Authorization: Bearer token
```

---

# Responsive Design

The application is responsive for:
- Mobile
- Tablet
- Desktop

Built using Tailwind responsive utilities:
- sm
- md
- lg

---

# UI/UX Concept

Design style:
- Soft emerald gradient
- Minimal modern layout
- Rounded cards
- Smooth hover animations
- User-friendly interface

---

# Future Improvements

- Register page
- Profile settings
- Dark mode
- Search transactions
- Pagination
- Upload avatar
- QR payment

---

# Author

Gloria Domenica

GitHub:
https://github.com/glriadomenica-debug
