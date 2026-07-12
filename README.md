# Car Dealership Inventory System

> A full-stack Car Dealership Inventory System built using **Spring Boot**, **React**, **PostgreSQL**, and **JWT Authentication** following **TDD**, **SOLID Principles**, and **Clean Code** practices.

## Project Overview

This project was developed as part of a Software Craftsmanship assessment. The goal was to build a secure, maintainable, and user-friendly inventory management system for a car dealership.

The backend exposes REST APIs for authentication and inventory management, while the frontend provides a responsive single-page application for users and administrators.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Spring Security
- Role-Based Authorization (ADMIN / USER)
- Protected APIs

### Vehicle Management
- Add Vehicle (Admin)
- Update Vehicle (Admin)
- Delete Vehicle (Admin)
- Restock Vehicle (Admin)
- View Vehicles
- Search Vehicles
- Purchase Vehicle
- Disable purchase when stock is zero

### Quality
- Test Driven Development (TDD)
- Clean Code
- SOLID Principles
- Layered Architecture
- DTO Validation
- Global Exception Handling

---

## Tech Stack

### Backend
- Java 25
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT
- Maven
- JUnit 5
- Mockito
- MockMvc

### Frontend
- React
- React Router
- Axios
- JavaScript
- CSS

---

## Architecture

```text
React UI
   |
Axios
   |
Spring Boot REST API
   |
Spring Security + JWT
   |
Service Layer
   |
Repository Layer
   |
PostgreSQL
```

---

## Backend Structure

```text
src/main/java
├── config
├── controller
├── dto
├── entity
├── exception
├── repository
├── security
├── service
└── util
```

## Frontend Structure

```text
src
├── api
├── components
├── context
├── layouts
├── pages
├── services
├── styles
├── utils
└── App.jsx
```

---

## Authentication Flow

1. User registers.
2. User logs in.
3. Backend validates credentials.
4. JWT token is generated.
5. Frontend stores token.
6. Token is sent in Authorization header.
7. Spring Security validates every protected request.

---

## User Roles

### USER
- Login
- View Vehicles
- Search Vehicles
- Purchase Vehicle

### ADMIN
- All USER permissions
- Add Vehicle
- Update Vehicle
- Delete Vehicle
- Restock Vehicle

---

## API Overview

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Vehicles

| Method | Endpoint |
|--------|----------|
| GET | /api/vehicles |
| GET | /api/vehicles/search |
| POST | /api/vehicles |
| PUT | /api/vehicles/{id} |
| DELETE | /api/vehicles/{id} |
| POST | /api/vehicles/{id}/purchase |
| POST | /api/vehicles/{id}/restock |

---

## Installation

### Clone

```bash
git clone <repository-url>
cd car-dealership-inventory
```

### Backend

```bash
cd backend/cardealershipinventory
mvn clean install
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file:

```properties
DB_URL=jdbc:postgresql://localhost:5432/car_dealership_db
DB_USERNAME=your_username
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
JWT_EXPIRATION=360000
```

---

## Testing

The backend follows **Test Driven Development (TDD)**.

Tests were written before implementation for authentication and core API endpoints.

Technologies used:
- JUnit 5
- Mockito
- MockMvc

Goals:
- Validate business logic
- Verify authentication flow
- Test controller endpoints
- Improve code confidence

---

## SOLID Principles

The backend was designed by applying the following principles:

- Single Responsibility Principle
- Open/Closed Principle
- Dependency Inversion Principle
- Interface Segregation where appropriate

The service layer, repository layer, DTOs, and security components were organized to keep responsibilities separate and improve maintainability.

---

## Spring Security

Implemented using:

- JWT Authentication
- Security Filter Chain
- Password Encryption (BCrypt)
- Stateless Sessions
- Role-Based Authorization

---

## Screenshots

Add screenshots here:

```text
screenshots/
├── login.png
├── register.png
├── dashboard.png
├── vehicles.png
├── add-vehicle.png
└── admin-dashboard.png
```

---

## My AI Usage

AI tools were used responsibly to improve productivity while ensuring that the final implementation, debugging, and understanding remained my own.

### ChatGPT

Used for:
- Learning Test Driven Development (TDD)
- Understanding SOLID principles
- Learning Spring Security and JWT concepts
- Understanding clean architecture
- Reviewing design decisions
- Improving code quality and documentation

Why:
ChatGPT acted as a learning and mentoring assistant, helping me understand concepts before implementing them.

### Cursor

Used for:
- Building the React frontend
- Creating reusable React components
- UI development
- Routing
- Axios integration
- Refactoring frontend code

Why:
Cursor accelerated frontend development while allowing me to review and understand every generated change.

### Codex

Used for:
- Backend implementation support
- JWT authentication
- Spring Security configuration
- Boilerplate generation
- Debugging
- TDD implementation guidance

Why:
Codex helped speed up repetitive backend development tasks while I verified, tested, and refined the generated code.

### Reflection

AI significantly improved my development workflow by reducing boilerplate work, assisting with debugging, and explaining unfamiliar concepts. Every AI-generated suggestion was reviewed, tested, and adapted before being incorporated into the final project.

---

## Future Improvements

- Vehicle image upload
- Pagination
- Advanced filtering
- Sorting
- Dashboard analytics
- Email notifications
- Docker deployment
- CI/CD pipeline
- Refresh Tokens
- Cloud deployment

---

## Author

**Koyani Gaurav**

B.Tech Computer Engineering Student

---

## License

This project was created for educational and assessment purposes.
