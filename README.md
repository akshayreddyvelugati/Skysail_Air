# ✈️ Skysail - Air Travel Website

**Skysail** is a premium, modern air travel web application designed to streamline the flight booking experience for passengers and provide robust management tools for airline administrators. Developed using **React 18**, **Vite**, **Node.js**, and **PostgreSQL**, it features a responsive, mobile-first design with smooth animations powered by **Framer Motion** and styled using **styled-components**.

---

## 🔍 Project Overview

Skysail allows users to:

- Search, book, and manage flight reservations through a seamless 5-step booking flow.
- Choose seats using an interactive seat map.
- Access a digital boarding pass with a downloadable ticket.
- Contact support and access helpful pages like Terms & Conditions and Privacy Policy.

Administrators are empowered to:

- Manage airports, airplanes, crew, flights, and passengers.
- Use CRUD operations on a dedicated admin dashboard.

---

## 🎯 Features

### 👤 Passenger Interface

- **Home Page**: Hero banner, popular destinations, and service cards.
- **Flight Booking Flow**:
  1. Flight search (trip type, airport, date, class, passengers)
  2. Search results (sortable flight cards)
  3. Passenger details form
  4. Seat selection (interactive map with seat types)
  5. Boarding pass generation and download
- **Contact Page**: Form, support details, and FAQs.
- **Responsive Design**: Mobile-first, with aviation-themed UI.

### 🔐 Admin Dashboard

- **Login**: Static credentials for access.
- **Dashboard Modules**:
  - Dashboard Home (analytics)
  - Airport Manager
  - Airplane Manager
  - Flight Schedule Manager
  - Crew Manager
  - Passenger Manager
- Full **CRUD** support with validation.

---

## 💻 Tech Stack

| Area        | Tech Used                              |
|-------------|-----------------------------------------|
| Frontend    | React 18, Vite, React Router v6         |
| Styling     | styled-components, Framer Motion        |
| Backend     | Node.js                                 |
| Database    | PostgreSQL (via PgAdmin)                |
| Dev Tools   | VS Code                                 |
| UI Theme    | Aviation Blue (#1A365D), Sky Blue (#0A66C2), white/grey |

---

## 🚫 Limitations

- ❌ No real-time flight tracking
- ❌ No payment gateway integration
