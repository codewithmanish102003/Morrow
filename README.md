# Morrow ✳

> *For all the moments in between.*

A luxury editorial e-commerce experience crafted with React, Vite, and modern CSS. Fully responsive, highly interactive, and **100% frontend-driven** with client-side state persistence (`localStorage`) — no backend configuration required.

---

## ✨ Features

- **Editorial Commerce Design**: Inspired by high-end design studios with typography, subtle animations, and curated grids.
- **100% Frontend-Driven**: Cart, Wishlist, Customer Orders, Saved Addresses, Profile, and Catalog state persist seamlessly in your browser's `localStorage`.
- **Live Catalog & Filtering**:
  - Live search overlay with instant results.
  - Multi-faceted shop filters: Category, Price range slider, Availability, Sizes, and Colors.
  - Sorting: Featured, Best Sellers, Price: Low to High / High to Low, Newest.
- **Product Details & Gallery**:
  - Multi-angle image thumbnails with full-screen zoom preview.
  - Size & Color selection with inventory state.
  - Quick Add to Bag and Wishlist toggle.
- **Shopping Bag & Checkout**:
  - Quantity counter and complimentary shipping progress bar ($100+ threshold).
  - **Guest Checkout**: Anyone can place orders without mandatory login.
  - Order confirmation screen (`/order-success`) with complete itemized receipt and delivery summary.
- **Customer Account & Demo Login**:
  - 1-Click **Demo Customer Login** (`eleanor@example.com`) to preview real orders, address book, and profile editing.
  - Global popup **Auth Modal** for Sign In, Sign Up, Google Auth, and Password Reset.
- **Dedicated Extra Routes**:
  - `/wishlist`: Live heart-saved collection with direct add to bag.
  - `/order-tracking`: Live order status timeline lookup by Order Reference ID.
  - `/faq`: Luxury accordion for shipping, returns, sizing, and materials.
  - `/about`, `/contact`, `/policies`.

---

## 🚀 How to Run

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

### 2. Start Development Server

Run the local Vite development server:

```bash
npm run dev
```

Once started, open your browser and navigate to:

```
http://localhost:5173/
```

*(Vite supports Hot Module Replacement — edits will reflect instantly in the browser without reloading.)*

---

## 📦 Production Build & Preview

To generate an optimized production build:

```bash
npm run build
```

To preview the built production app locally:

```bash
npm run preview
```

---

## 🧭 Routes Overview

| Route | Description |
|---|---|
| `/` | Homepage (Campaign Hero, Curated Categories, Seasonal Edit, Latest Drops) |
| `/shop` | Full collection catalog with multi-filter toolbar & sorting |
| `/category/:slug` | Category-specific collections (`clothing`, `seasonal`, `beverages`) |
| `/product/:slug` | Single product detail page with zoom gallery, variants, and reviews |
| `/cart` | Shopping bag with item breakdown and shipping calculation |
| `/checkout` | Fast checkout with guest option & auto-fill |
| `/order-success` | Itemized order confirmation & receipt |
| `/wishlist` | Saved pieces with header count badge |
| `/order-tracking` | Order tracking by reference ID with step timeline |
| `/faq` | Frequently asked questions & size guide |
| `/account` | Customer dashboard (Orders, Wishlist, Addresses, Profile) |
| `/about` | Brand story & philosophy |
| `/contact` | Customer care inquiry form |
| `/policies` | Shipping, returns, privacy, and terms |
| `/reset-password` | Interactive password update flow |
| `*` | Custom 404 page |

---

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router DOM 6
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Notifications**: Sonner Toasts
- **Fonts**: Playfair Display, DM Sans, Manrope (via Google Fonts)

---

## 📄 License

Private & proprietary project for Morrow Studio.
