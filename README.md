# 🧪 Full Stack Developer Assignment — Event Management System

## 🚀 Overview
This project is a **Mini Event Management System** built to demonstrate clean architecture, scalability, and best practices in both backend and frontend development.

It allows users to:
- Create and manage events  
- Register attendees (with duplicate and capacity checks)  
- View attendee lists for specific events  

Swagger API documentation is available at:  
👉 **`/api`**

---

## 🧱 Tech Stack

**Backend:**
- [NestJS](https://nestjs.com/)
- PostgreSQL (via Prisma ORM)
- Swagger (OpenAPI)
- RESTful architecture

**Frontend:**
- [Next.js 14+](https://nextjs.org/)
- [Shadcn/UI](https://ui.shadcn.com/) for UI components
- React Query for data fetching and caching

---

## ⚙️ Features Implemented
✅ Create events with validation  
✅ Register attendees (duplicate + capacity check)  
✅ Retrieve all events  
✅ Get attendee list (with pagination)  
✅ Timezone management (IST-aware)  
✅ Async service architecture  
✅ Swagger documentation at `/api`  
✅ Meaningful error handling  

---

## 🧩 API Endpoints

### 1️⃣ Create Event
**POST** `/events`
```json
{
  "name": "Tech Summit 2025",
  "location": "Mumbai",
  "start_time": "2025-12-05T10:00:00Z",
  "end_time": "2025-12-05T18:00:00Z",
  "max_capacity": 100
}
