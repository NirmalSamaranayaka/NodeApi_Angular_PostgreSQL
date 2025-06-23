# README

# Customer Care API

## Description

This API allows CustomerCare operators to reply messages from customers. Messages are collected into tickets that eventually will be resolved by the operators.

## Installation and execution

## .env

The project requires a `.env` file with the following content.

```text
PGUSER=api
PGPASSWORD=apiPassword
PGDATABASE=api
PGHOST=localhost
```

### Execution

The API can be run using Docker.

Run `docker compose up api` to run the database, the database migrations and the API.

Once the API is up and running the database can be populated by running `docker compose up seed`.

### Development

To set up the development environment Node.js v22 is required.

Run the following commands:

```bash
npm ci
docker compose up -d db
npm run migrate:up
npm run seed
```

Execute `npm run serve` to run the API.
