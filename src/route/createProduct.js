const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const imageUrl = req.file.path;
  res.status(200).json({ imageUrl });
});

// Handle product creation
app.post("/products", (req, res) => {
  const {
    name,
    description,
    imageUrl,
    additionalImageUrls,
    price,
    brandName,
    category,
    gender,
    isInStock,
    productCode,
    productionDate,
  } = req.body;

  // Perform validation and create product logic here
  // For demonstration purposes, let's just log the received data
  console.log(req.body);

  res.status(200).json({ message: "Product created successfully!" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
