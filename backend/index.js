const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const User = require("./models/User");

dotenv.config();

const app = express();

// Allow CORS for frontend domain
app.use(
  cors({
    origin: "https://3-w-assignment-frontend-beta.vercel.app", // Frontend URL
    methods: "GET,POST", // Allowed HTTP methods
    credentials: true, // If you need to send cookies
  })
);

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Replace with your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Replace with your Cloudinary API secret
});

// File Upload Configuration (using memory storage)
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Routes
// Root Route
app.get("/", (req, res) => {
  res.send("Backend is up and running!");
});

// Handle Form Submission with File Uploads
app.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    const { name, socialMediaHandle } = req.body;

    // Upload images to Cloudinary
    const imageUploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "uploads" }, // Replace with your desired folder name
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url); // Get the secure URL of the uploaded image
          }
        ).end(file.buffer);
      });
    });

    const imagePaths = await Promise.all(imageUploadPromises);

    // Save user with image URLs in MongoDB
    const user = new User({
      name,
      socialMediaHandle,
      images: imagePaths, // Store Cloudinary URLs in the database
    });
    await user.save();

    res.status(200).send("Form submitted successfully!");
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
    res.status(500).send("Failed to submit form.");
  }
});

// Get Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Failed to fetch users.");
  }
});

// Admin Login
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  }
  res.json({ success: false });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
