# User Management Dashboard

This project is a User Management Dashboard that allows administrators to view users' data such as username, social media handle, and uploaded images. The images are stored in Cloudinary, and their URLs are saved in MongoDB. The application is built using React for the frontend, Node.js with Express for the backend, MongoDB for database management, and Cloudinary for image storage.

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Image Storage**: Cloudinary

## Features

- **Admin Dashboard**: An admin can log in to the dashboard and view a list of users.
- **User Data**: The users' information (username, social media handle) and images are fetched from the backend and displayed on the dashboard.
- **Image Storage**: Users can upload images, which are then stored in Cloudinary, and the URLs of the images are saved in MongoDB.
- **Toggle Image Visibility**: The admin can toggle between showing the first image and all uploaded images for each user.
- **Loading and Data States**: Displays a loading message while data is being fetched, and "No data available" if there are no users in the database.

## Getting Started

### Prerequisites

To run this project locally, you need the following:

- Node.js (LTS version)
- MongoDB (local instance or cloud service like MongoDB Atlas)
- Cloudinary Account (for storing images)

### Admin Credentials
- Username: admin
- Password: admin@123


