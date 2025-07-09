# Phoenix Gadget API

A secure RESTful API for managing a secret agent gadget inventory, built with Node.js, Express, Sequelize, and PostgreSQL.

**Deployed API:** [Phoenix Gadget API](https://phoenix-gadget-api-zqab.onrender.com)

**API Documentation:** [View on Postman](https://www.postman.com/navigation-engineer-92001223/workspace/my-web-dev/collection/39574165-194303ec-1fd1-44b2-af78-8ac10dfd7976?action=share&creator=39574165)

---

## Features

- **User Authentication**: Register, login, and logout with JWT-based authentication.
- **Gadget Inventory Management**: Create, update, list, and soft-delete gadgets.
- **Status Filtering**: Retrieve gadgets by status (`Available`, `Deployed`, `Destroyed`, `Decommissioned`).
- **Self-Destruct**: Mark gadgets as destroyed via a dedicated endpoint.
- **Secure Endpoints**: All gadget routes are protected and require authentication.

---

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT, HTTP-only cookies

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/anmolkhurana490/Phoenix-Gadget-API.git
    cd Phoenix_Gadget_API
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure environment variables**

    Create a `.env` file in the root directory:
    ```
    DB_NAME=your_db_name
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_HOST=localhost
    DB_PORT=5432
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```

4. **Start the server**
    ```bash
    npm start
    ```
    The server runs on [http://localhost:5000](http://localhost:5000).

---

## API Endpoints

### Authentication

- `POST /auth/register`  
  Register a new user.  
  **Body:** `{ "email": "agent@agency.com", "password": "secret" }`

- `POST /auth/login`  
  Login and receive an auth token (set as HTTP-only cookie).  
  **Body:** `{ "email": "agent@agency.com", "password": "secret" }`

- `GET /auth/logout`  
  Logout and clear the auth token.

### Gadgets (Protected)

All `/gadgets` endpoints require a valid `AuthToken` cookie.

- `GET /gadgets`  
  List all gadgets.

- `GET /gadgets?status=Available`  
  List gadgets filtered by status.

- `POST /gadgets`  
  Create a new gadget.  
  **Body:** `{ "status": "Available" }` (name is auto-generated)

- `PUT /gadgets/:id`  
  Update gadget details.

- `DELETE /gadgets/:id`  
  Soft-delete (decommission) a gadget.

- `POST /gadgets/:id/self-destruct`  
  Mark a gadget as destroyed.

---

## Project Structure

```
Phoenix_Gadget_API/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── gadgetController.js
├── middlewares/
│   └── AuthMiddleware.js
├── models/
│   ├── gadget.js
│   ├── user.js
│   └── queries.sql
├── routes/
│   ├── authRouter.js
│   └── gadgetRouter.js
├── main.js
├── package.json
└── .env (not committed)
```

---

## Notes

- Passwords are stored in plaintext for demonstration. **Do not use in production.** Use hashing (e.g., bcrypt) for real applications.
- All gadget names are randomly generated codenames.
- Only authenticated users can access gadget endpoints.

---

## License

ISC

---

## Author

Anmol Khurana
