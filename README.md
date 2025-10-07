# 💰 Finance Tracker

A full-stack personal finance app to track budgets, categories, and transactions with a modern React UI and a Laravel API.  
It includes user authentication, currency preferences with live exchange rates, responsive pages, and handy widgets like totals and pagination.

---

## 🚀 Features

- **Authentication & Profile**
  - SPA-friendly authentication via **Laravel Sanctum**
  - `/api/me` profile endpoint, password and profile updates
  - Default currency stored on the user model and editable via `/api/profile/currency`

- **Budgets, Categories & Transactions**
  - Full CRUD for budgets and transactions
  - Category lookup with server-side filtering
  - Access control through Laravel policies
  - Pagination and UI improvements for transactions

- **Currencies & Exchange Rates**
  - Integration with **API Layer Exchange Rates Data** for live currency conversion
  - Snapshot storage and summary widgets in the dashboard

- **Frontend**
  - **React 19** with **React Router 7**
  - Reusable authentication context and API utilities
  - Responsive design, animated carousel, and clean UI across all pages

---

## 🧰 Tech Stack

| Layer | Stack |
|:------|:------|
| **Frontend** | React 19, React Router 7, React Slick (carousel) |
| **Backend** | Laravel 10, PHP 8.2+, Laravel Sanctum |
| **Database** | Any DB supported by Laravel (MySQL/PostgreSQL/SQLite) |

---

## 📁 Project Structure

```
backend/   # Laravel API (controllers, models, policies, routes, migrations)
frontend/  # React app (pages, router, components, assets)
```

Key paths:
- `backend/routes/api.php`
- `app/Http/Controllers/*`
- `app/Actions/StoreRatesSnapshot.php`
- `frontend/src/Pages/*`
- `frontend/src/features/auth/AuthContext.jsx`
- `frontend/src/lib/userApi.js`

---

## ⚙️ Getting Started

### 1️⃣ Backend (Laravel API)

```bash
cd backend
cp .env.example .env
# configure DB_* in .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

The API uses Sanctum on protected routes such as `/api/me`, `/api/budgets`, `/api/profile`, `/api/password`, and `/api/profile/currency`.

---

## 💱 Currency Conversion (Exchange Rates API)

This project uses the [API Layer Exchange Rates Data](https://api.apilayer.com/exchangerates_data/latest) service  
to fetch real-time currency exchange rates for converting between different currencies and calculating totals.

### 🔑 API Key Required

You need to obtain a free API key from [API Layer](https://apilayer.com/marketplace/exchangerates_data-api).

1. Create an account on [apilayer.com](https://apilayer.com/).
2. Go to **Dashboard → API Keys** and copy your key.
3. Add it to your `.env` file in the **Laravel backend**:

```bash
EXCHANGE_RATES_API_KEY=your_api_key_here
EXCHANGE_RATES_API_URL=https://api.apilayer.com/exchangerates_data/latest
```

### ⚙️ How It Works

- The backend fetches data from the API using the endpoint:  
  `GET https://api.apilayer.com/exchangerates_data/latest?base=USD`

- The API key is passed in the request header:

```http
apikey: your_api_key_here
```

- Exchange rates can be stored in the database or used directly for conversions.

- The Laravel action `StoreRatesSnapshot` fetches and stores current rates,  
  enabling the app to display converted totals and summaries even offline.

### 🧩 Example Laravel Code

```php
$resp = Http::withHeaders([
           'Accept' => 'application/json',
           'apikey' => $key,
       ])
           ->connectTimeout(5)
           ->timeout(20)
           ->retry(3, 500, throw: false)
           ->withOptions(['force_ip_resolve' => 'v4'])
           ->get($url, [
               'base' => strtoupper($base),
           ]);
```

### ✅ Notes

- The free API plan has a limited number of requests per month — check your quota in the dashboard.  
- Change the base currency (e.g., EUR, RUB, CZK) using the `base` query parameter.  
- This feature powers the currency selector and total summary widgets on the frontend.

---

### 2️⃣ Frontend (React SPA)

```bash
cd frontend
npm install
npm run dev   # or npm start
```

Create a `.env` file in `frontend/` if you need to set a custom API URL:

```bash
VITE_API_URL=http://127.0.0.1:8000
```

The app includes **Home**, **Dashboard**, and **Profile** pages with currency settings and summaries.

---

## 🔌 API Overview (Selected)

All routes below require authentication unless stated otherwise:

| Method | Endpoint | Description |
|:--|:--|:--|
| `GET` | `/api/me` | Returns current user and default currency |
| `PATCH` | `/api/profile` | Update user profile |
| `PATCH` | `/api/password` | Change password |
| `PATCH` | `/api/profile/currency` | Set default currency |
| `GET` / `POST` / `DELETE` | `/api/budgets` | Manage budgets |
| `GET` / `POST` / `DELETE` | `/api/transactions` | Manage transactions |
| `GET` | `/api/categories` | Get categories list |

---

## 🖼️ Screenshots

Demo images are available in `frontend/src/assets`:
- `login.jpg`
- `budget.jpg`
- `transaction.jpg`
- `currency.jpg`
- and more....

---

## 🧭 Roadmap

- Add charts & statistics page  
- CSV import/export
- Improved category management

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you’d like to add or modify.

---

## 📄 License

Licensed under the **Apache 2.0** license.  
See [LICENSE](./LICENSE) for details.
