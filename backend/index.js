const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const cors = require("cors");
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

    // Convert uploaded files to base64 strings
    const imageBuffers = req.files.map((file) => ({
      filename: file.originalname,
      buffer: file.buffer.toString("base64"), // Store buffer as base64 string
    }));

    // Save user with image buffers (or filenames) in MongoDB
    const user = new User({
      name,
      socialMediaHandle,
      images: imageBuffers, // Store buffer or file name
    });
    await user.save();

    res.status(200).send("Form submitted successfully!");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Failed to submit form.");
  }
});

// Get Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    // If you need to send base64 data to frontend
    users.forEach((user) => {
      user.images = user.images.map((image) => ({
        ...image,
        base64: image.buffer, // Send base64 string to frontend
      }));
    });

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
