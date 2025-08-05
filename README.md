# 📝 Mini Blog App

A full-stack **Blog Management Application** built using **NestJS** for the backend and **Vue 3** for the frontend.

---

## 🧠 Project Overview

The Mini Blog App allows users to **read blog posts** and provides an **admin interface** (no login required) to **create, edit, and delete posts**. It demonstrates core CRUD operations, clean UI/UX, RESTful API design, and modern full-stack development principles.

---

## 🚀 How It Works

### 🖥️ Frontend (Vue 3)

- **Public Interface:**
  - View all blog posts in a list
  - Click to view full post details

- **Admin Interface:**
  - Create new blog posts using a form
  - Edit or delete existing posts
  - Basic form validation on create/update

> Optional enhancements (if implemented):
> - Pagination, search, filtering
> - PrimeVue and Tailwind CSS styling
> - JWT-based authentication for protected routes

---

### 🧪 Backend (NestJS)

- **Blog Post Model includes:**
  - `id`, `title`, `content`, `author`, `createdAt`, `updatedAt`

- **REST API Endpoints:**
  - `POST /posts` – Create post
  - `GET /posts` – Get all posts
  - `GET /posts/:id` – Get a single post
  - `PUT /posts/:id` – Update a post
  - `DELETE /posts/:id` – Delete a post

- Uses **Controllers**, **Services**, and **DTOs** with validation for clean structure and maintainability.

---

## 🧰 Tech Stack

### Frontend
- Vue 3
- Vue Router
- Tailwind CSS *(optional)*
- PrimeVue *(optional)*

### Backend
- NestJS
- TypeScript
- PostgreSQL or any database of choice
- Class-validator (for DTO validation)

---

## 📦 Setup Instructions

### 🔧 Backend (NestJS)

# Clone the repo
cd backend
npm install

# Set environment variables (example in .env.example)
# e.g., DATABASE_URL, JWT_SECRET

# Run the server
npm run start:dev
