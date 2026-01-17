# Scalable URL Shortener Microservice

A production-ready RESTful API service developed to handle URL shortening operations with high performance and reliability. This project demonstrates backend engineering best practices, including **MVC architecture**, **database indexing**, **robust error handling**, and **REST standards**.

## 🚀 Engineering Highlights

This project was built to showcase proficiency in backend development and API design:

- **Architecture**: Immersed in a clean **Model-View-Controller (MVC)** pattern to separate concerns and ensure maintainability.
- **Database Optimization**: Utilized **MongoDB** indexing on `shortCode` fields to ensure O(1) read performance for redirection lookups.
- **Collision Handling**: Implemented a collision-check mechanism using non-blocking asynchronous logic to ensure global uniqueness of generated short codes.
- **RESTful Standards**: Strict adherence to HTTP methods (POST, GET, PUT, DELETE) and status codes (201 Created, 204 No Content, 404 Not Found, 400 Bad Request).
- **Input Validation**: Middleware implementation for robust request body validation and JSON syntax error handling to prevent server crashes.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (NoSQL) with Mongoose ODM
- **Utilities**: Nanoid (ID Generation), Dotenv (Env Management), CORS (Security)
- **Tooling**: Thunder Client (API Testing), Nodemon (Development)

## ⚡ Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (Running locally or Atlas URI)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/url-shortener-api.git
    cd url-shortener-api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory:

    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/urlshortener
    BASE_URL=http://localhost:5000
    ```

4.  **Run the application:**

    ```bash
    # Development mode (with auto-reload)
    npm run dev

    # Production mode
    npm start
    ```

## 🔌 API Reference

### 1. Shorten a URL

Accepts a long URL and returns a unique short code.

- **Endpoint**: `POST /shorten`
- **Payload**:
  ```json
  {
    "url": "https://www.linkedin.com/in/yourprofile"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "id": "64b1f...",
    "url": "https://www.linkedin.com/in/yourprofile",
    "shortCode": "x7z9Aa",
    "createdAt": "..."
  }
  ```

### 2. Retrieve URL Metadata

Resolves a short code to the original URL and tracks access statistics.

- **Endpoint**: `GET /shorten/:shortCode`
- **Response (200 OK)**:
  ```json
  {
    "url": "https://www.linkedin.com/in/yourprofile",
    "shortCode": "x7z9Aa",
    "createdAt": "..."
  }
  ```

### 3. Update Short Link

Modifies the destination of an existing short URL.

- **Endpoint**: `PUT /shorten/:shortCode`
- **Payload**: `{"url": "https://new-destination.com"}`

### 4. Delete Short Link

Removes the URL mapping from the database.

- **Endpoint**: `DELETE /shorten/:shortCode`
- **Response**: `204 No Content`

### 5. Get Analytics

View the number of times a link has been accessed.

- **Endpoint**: `GET /shorten/:shortCode/stats`
- **Response**:
  ```json
  {
    "shortCode": "x7z9Aa",
    "accessCount": 42
  }
  ```

## 🔮 Future Enhancements (Roadmap)

To further scale this application, the following features are planned:

- **Redis Caching**: To reduce database hits for popular URLs.
- **Rate Limiting**: To prevent abuse and DoS attacks.
- **Docker Support**: Containerization for consistent deployment environments.
- **Auth Middleware**: API Key authentication for user-specific link management.
