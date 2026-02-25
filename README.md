# Pepperment API

A Node.js + MongoDB backend application with API key management and
migration support using migrate-mongo.

## Features

-   API Key generation & validation
-   Expiration date support for API keys
-   MongoDB database integration
-   Database migrations using migrate-mongo
-   Environment-based configuration
-   Clean project structure

------------------------------------------------------------------------

## 🛠 Tech Stack

-   Node.js
-   Express.js
-   MongoDB
-   migrate-mongo
-   dotenv

------------------------------------------------------------------------

##  Project Structure

pepperment/ │ ├── utils/ ├── services/ ├── migrations/ \# Database migration files ├── models/ \#
Mongoose models ├── routes/ \# API routes ├── controllers/ \# Business
logic ├── migrate-mongo-config.cjs \# Migration configuration ├── .env
\# Environment variables ├── package.json └── README.md

------------------------------------------------------------------------

## Installation

``` bash
git clone https://github.com/OladitiSodiq/Peppermint.git
cd pepperment
npm install
```

------------------------------------------------------------------------

## Environment Variables

Create a `.env` file in the root directory:

PORT=5000\
MONGO_URI=mongodb://localhost:27017/pepperment

------------------------------------------------------------------------

##  Database Migration

### Create a New Migration

npx migrate-mongo create add-expiration-to-apikey -f
migrate-mongo-config.cjs

### Run Migrations

npx migrate-mongo up -f migrate-mongo-config.cjs

### Rollback Last Migration

npx migrate-mongo down -f migrate-mongo-config.cjs

### Check Migration Status

npx migrate-mongo status -f migrate-mongo-config.cjs

------------------------------------------------------------------------

## Run the Application

npm start

or

npm run dev

------------------------------------------------------------------------

##  API Key Expiration Logic

-   Each API key can include an `expiresAt` field.
-   If `expiresAt` is `null`, the key does not expire.
-   Expired keys are automatically rejected by middleware.

------------------------------------------------------------------------

## Rate Limiting

- To prevent abuse and ensure fair usage, the API implements per-user rate limiting.

- Policy

- Each authenticated user can make 5 requests per hour

- The rate limit window resets automatically after 1 hour

- If the limit is exceeded, the API returns: Rate Limit Exceeded


## Audit Logging

- All authenticated requests are logged for monitoring and traceability
- View Audit Logs {{url}}/audit/logs

##  License

MIT License
