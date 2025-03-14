# Travel Website Backend

This is the backend for the Travel Website application, built with Node.js, Express.js, and MongoDB.

## Features

- User authentication and authorization
- Destination management
- Booking system
- Review system
- Admin dashboard

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/travel-website
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=90d
   NODE_ENV=development
   ```
   Note: Replace `your_jwt_secret_key_here` with a secure random string.

## Database Setup

1. Make sure MongoDB is running on your local machine or you have a MongoDB Atlas connection string.
2. To seed the database with initial data:
   ```
   node data/import-dev-data.js --import
   ```
3. To delete all data from the database:
   ```
   node data/import-dev-data.js --delete
   ```

## Running the Application

1. Start the backend server:
   ```
   npm run server
   ```
2. For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/v1/users/signup` - Register a new user
- `POST /api/v1/users/login` - Login user

### Users

- `GET /api/v1/users/me` - Get current user profile
- `PATCH /api/v1/users/updateMe` - Update current user profile
- `DELETE /api/v1/users/deleteMe` - Delete current user
- `PATCH /api/v1/users/updateMyPassword` - Update current user password

### Destinations

- `GET /api/v1/destinations` - Get all destinations
- `GET /api/v1/destinations/:id` - Get a specific destination
- `POST /api/v1/destinations` - Create a new destination (admin only)
- `PATCH /api/v1/destinations/:id` - Update a destination (admin only)
- `DELETE /api/v1/destinations/:id` - Delete a destination (admin only)
- `GET /api/v1/destinations/top-5` - Get top 5 destinations
- `GET /api/v1/destinations/category/:category` - Get destinations by category

### Bookings

- `GET /api/v1/bookings` - Get all bookings (admin only)
- `GET /api/v1/bookings/:id` - Get a specific booking
- `POST /api/v1/bookings` - Create a new booking
- `PATCH /api/v1/bookings/:id` - Update a booking
- `DELETE /api/v1/bookings/:id` - Delete a booking
- `GET /api/v1/bookings/my-bookings` - Get current user's bookings
- `POST /api/v1/bookings/guest-booking` - Create a booking without authentication

### Reviews

- `GET /api/v1/reviews` - Get all reviews
- `GET /api/v1/reviews/:id` - Get a specific review
- `POST /api/v1/reviews` - Create a new review
- `PATCH /api/v1/reviews/:id` - Update a review
- `DELETE /api/v1/reviews/:id` - Delete a review
- `GET /api/v1/destinations/:destinationId/reviews` - Get all reviews for a destination
- `POST /api/v1/destinations/:destinationId/reviews` - Create a review for a destination

## Frontend Integration

To connect the frontend to this backend:

1. Update the API calls in the frontend components to use the backend endpoints.
2. For the booking form, update the form submission to send data to `/api/v1/bookings/guest-booking`.
3. For destination filtering, use the `/api/v1/destinations/category/:category` endpoint.

## Error Handling

The API returns appropriate status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Security

- JWT authentication
- Password encryption
- Role-based access control
- Input validation
- Rate limiting (to be implemented)

## License

This project is licensed under the MIT License.