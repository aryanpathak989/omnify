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

### 1️⃣ User Authentication

#### Signup
curl --location 'http://localhost:4000/auth/signup'
--header 'Content-Type: application/json'
--header 'X-API-Key: {{token}}'
--data-raw '{
"firstName":"Raja",
"lastName":"Pathak",
"password":"Aryan@12345",
"email":"aryan@sustvest.com"
}'



#### Login

curl --location 'http://localhost:4000/auth/login'
--header 'Content-Type: application/json'
--header 'X-API-Key: {{token}}'
--header 'Cookie: access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjQ5OWU2Yi1iMmRhLTQzYmEtOTk3My00MDg3ZTEyZTNkZGMiLCJpYXQiOjE3NjA0NjUyMTAsImV4cCI6MTc2MDQ2NjExMH0.n7SSBuEIKTwE8Hd9MlXY9mciJwqM8zKNDb-h7X5SyPk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjQ5OWU2Yi1iMmRhLTQzYmEtOTk3My00MDg3ZTEyZTNkZGMiLCJpYXQiOjE3NjA0NjUyMTAsImV4cCI6MTc2MTA3MDAxMH0.95y7lNCDjpRF2d3WBNCV9RroePw8b5PEm4R7lfPajOA'
--data-raw '{
"password":"Aryan@12345",
"email":"aryan@sustvest.com"
}'



### 2️⃣ Events

#### Create Event
**POST** `/events`

curl --location 'http://localhost:4000/events'
--header 'Content-Type: application/json'
--header 'X-API-Key: {{token}}'
--header 'Cookie: access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjQ5OWU2Yi1iMmRhLTQzYmEtOTk3My00MDg3ZTEyZTNkZGMiLCJpYXQiOjE3NjA0NjUyMTAsImV4cCI6MTc2MDQ2NjExMH0.n7SSBuEIKTwE8Hd9MlXY9mciJwqM8zKNDb-h7X5SyPk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjQ5OWU2Yi1iMmRhLTQzYmEtOTk3My00MDg3ZTEyZTNkZGMiLCJpYXQiOjE3NjA0NjUyMTAsImV4cCI6MTc2MTA3MDAxMH0.95y7lNCDjpRF2d3WBNCV9RroePw8b5PEm4R7lfPajOA'
--data '{
"name":"Music Event",
"location":"Banglore",
"startTime":"12:00:00",
"endTime":"13:00:00",
"max_capacity":30
}'


#### Get All Events
curl --location 'http://localhost:4000/events'
--header 'X-API-Key: {{token}}'
--header 'Cookie: access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjQ5OWU2Yi1iMmRhLTQzYmEtOTk3My00MDg3ZTEyZTNkZGMiLCJpYXQiOjE3NjA0NjUyMTAsImV4cCI6MTc2MDQ2NjExMH0.n7SSBuEIKTwE8Hd9MlXY9mciJwqM8zKNDb-h7X5SyPk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjQ5OWU2Yi1iMmRhLTQzYmEtOTk3My00MDg3ZTEyZTNkZGMiLCJpYXQiOjE3NjA0NjUyMTAsImV4cCI6MTc2MTA3MDAxMH0.95y7lNCDjpRF2d3WBNCV9RroePw8b5PEm4R7lfPajOA'


---

### 3️⃣ Attendees

#### Register Attendee for an Event
curl --location 'http://localhost:4000/events/10a19188-2eb4-4098-b825-2f5fff351f30/register'
--header 'Content-Type: application/json'
--header 'X-API-Key: {{token}}'
--header 'Cookie: access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjQ5OWU2Yi1iMmRhLTQzYmEtOTk3My00MDg3ZTEyZTNkZGMiLCJpYXQiOjE3NjA0NjUyMTAsImV4cCI6MTc2MDQ2NjExMH0.n7SSBuEIKTwE8Hd9MlXY9mciJwqM8zKNDb-h7X5SyPk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjQ5OWU2Yi1iMmRhLTQzYmEtOTk3My00MDg3ZTEyZTNkZGMiLCJpYXQiOjE3NjA0NjUyMTAsImV4cCI6MTc2MTA3MDAxMH0.95y7lNCDjpRF2d3WBNCV9RroePw8b5PEm4R7lfPajOA'
--data-raw '{
"name":"Aryan Dubey",
"email":"AryanPathak@gmail.com"
}'


#### Get All Attendees for an Event
curl --location 'http://localhost:4000/events/10a19188-2eb4-4098-b825-2f5fff351f30/attendees'
--header 'X-API-Key: {{token}}'
--header 'Cookie: access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjQ5OWU2Yi1iMmRhLTQzYmEtOTk3My00MDg3ZTEyZTNkZGMiLCJpYXQiOjE3NjA0NjUyMTAsImV4cCI6MTc2MDQ2NjExMH0.n7SSBuEIKTwE8Hd9MlXY9mciJwqM8zKNDb-h7X5SyPk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjQ5OWU2Yi1iMmRhLTQzYmEtOTk3My00MDg3ZTEyZTNkZGMiLCJpYXQiOjE3NjA0NjUyMTAsImV4cCI6MTc2MTA3MDAxMH0.95y7lNCDjpRF2d3WBNCV9RroePw8b5PEm4R7lfPajOA'