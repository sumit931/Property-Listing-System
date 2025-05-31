# Property Listing System Backend

A robust backend system for managing property listings, user authentication, and property recommendations. Built with Node.js, Express, and MongoDB.

## Features

- 🔐 User Authentication (Register/Login)
- 🏠 Property Management
  - Create, Read, Update, Delete properties
  - Advanced property search with filters
  - Property recommendations
  - Favorite properties management
- 🚀 Performance Optimizations
  - Redis caching for frequently accessed data
  - Efficient database queries
- 🔒 Security
  - JWT-based authentication
  - Password hashing
  - Input validation
  - CORS protection

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Cache:** Redis
- **Authentication:** JWT
- **Validation:** Joi
- **Other Tools:**
  - bcryptjs (Password hashing)
  - ioredis (Redis client)
  - cors (Cross-origin resource sharing)

## Project Structure

```
├── api/                    # API routes and controllers
│   ├── auth/              # Authentication endpoints
│   ├── listingProperty/   # Property listing management
│   ├── favProperty/       # Favorite properties
│   └── recommendProperty/ # Property recommendations
├── config/                # Configuration files
├── helper/               # Helper functions and utilities
├── middlewares/          # Custom middleware
├── models/               # Database models
├── server.js            # Application entry point
└── db.js                # Database connection
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login

### Property Management
- `GET /listingProperty/property` - Get all properties with filters
- `POST /listingProperty/property` - Create new property
- `PUT /listingProperty/property/:id` - Update property
- `DELETE /listingProperty/property/:id` - Delete property
- `GET /listingProperty/my-properties` - Get user's properties

### Reference Data
- `GET /listingProperty/city` - Get all cities
- `GET /listingProperty/state` - Get all states
- `GET /listingProperty/property-type` - Get property types
- `GET /listingProperty/property-tag` - Get property tags
- `GET /listingProperty/amenity` - Get amenities

### Favorites
- `GET /favProperty` - Get user's favorite properties
- `POST /favProperty/:propertyId` - Add property to favorites
- `DELETE /favProperty/:propertyId` - Remove property from favorites

### Recommendations
- `GET /recommendProperty` - Get property recommendations

## Setup and Installation

1. Clone the repository
```bash
git clone <repository-url>
cd property-listing-backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

4. Start the server
```bash
npm start
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `REDIS_HOST` - Redis host (default: 127.0.0.1)
- `REDIS_PORT` - Redis port (default: 6379)

## Caching Strategy

The system implements Redis caching for:
- Property listings with filters
- User's properties
- Reference data (cities, states, property types, etc.)
- Property recommendations

## Security Features

- JWT-based authentication
- Password hashing using bcrypt
- Input validation using Joi
- CORS protection
- Error handling middleware

## Error Handling

The system includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Database errors
- General server errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 