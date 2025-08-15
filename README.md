# Ecommerce API

Lightweight REST API to manage products for an e-commerce backend built with Node.js, Express and MongoDB.

## Overview
- Simple CRUD for products.
- Clean separation: controllers → services → repository → Mongoose model.
- Error handling middleware included.

## Quick start
1. Install dependencies:
   npm init -y
   npm install express mongoose dotenv
2. Configure (optional):
   - Create a .env file or set environment variable DB_URI. Default: `mongodb://localhost:27017/ecommerce`
3. Start server:
   npm start
4. Default base URL:
   http://localhost:3000

## Endpoints
- GET    /products            — list products
- GET    /products/:id        — get product by id
- POST   /products            — create product (JSON body)
- PUT    /products/:id        — update product (returns updated object)
- DELETE /products/:id        — delete product (returns { message: 'Product deleted successfully' })


## Product schema
- name: string (required)
- price: number (required, >= 0)
- description: string
- inStock: boolean
- createdAt: date

demo link
https://www.awesomescreenshot.com/video/43175847?key=f9d698009151a8afd409fd68986e5795