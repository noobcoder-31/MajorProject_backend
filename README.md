# Travel Genie - Backend

This is the backend part of the Travel Genie tour planning web application, built using Node.js, Express.js, and MongoDB. The backend provides a RESTful API for handling user authentication, fetching destination data, managing attractions, hotels, restaurants, and facilitating other app functionalities.

## Features

- **User Authentication**: Handles user registration, login, and password reset functionality.
- **Destination Management**: CRUD operations for managing destinations, including adding, updating, and deleting destinations.
- **Attraction Management**: CRUD operations for managing attractions associated with destinations.
- **Hotel and Restaurant Management**: CRUD operations for managing hotels and restaurants near destinations.
- **Review and Rating Management**: Handles the creation, updating, and retrieval of user reviews and ratings for destinations, hotels, and restaurants.
- **Travel Package Management**: Handles the creation, updating, and retrieval of travel packages based on user preferences and budget.
- **Blog Management**: CRUD operations for managing travel blogs and articles.

## Getting Started

To run the backend locally, follow these steps:

1. Clone the repository
2. Navigate to the `backend` directory: `cd backend`
3. Install dependencies: `npm install`
4. Set up the MongoDB database and configure the connection string in the `.env` file
5. Start the backend server: `npm start`
6. The backend API should now be running at `http://localhost:5000/api`

Make sure to update the `REACT_APP_API_BASE_URL` environment variable in the frontend with the appropriate URL for your backend API.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose

## Learn More

You can learn more about the technologies used in this project from the following resources:

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

Feel free to customize and enhance the project according to your needs!
