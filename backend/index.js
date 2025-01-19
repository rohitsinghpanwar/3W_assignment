const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("uploads")); // Serve uploaded files

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes

// POST: Submit Form Data
app.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    const { name, socialMediaHandle } = req.body;
    const imagePaths = req.files.map((file) => file.filename);

    const user = new User({
      name,
      socialMediaHandle,
      images: imagePaths,
    });

    await user.save();
    res.status(200).send("Form submitted successfully!");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Failed to submit form.");
  }
});

// GET: Fetch All Form Data
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
  
    // Load admin credentials from .env
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      return res.json({ success: true });
    }
    res.json({ success: false });
  });
  

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
