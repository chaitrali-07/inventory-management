const express = require("express");
const multer = require("multer");
const pool = require("./db");
const { storage } = require("./appwriteClient");

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const { name, category, quantity, price, created_by } = req.body;

    if (!file) return res.status(400).send("No file uploaded");

    // Upload to Appwrite Storage
    const bufferStream = require("streamifier").createReadStream(file.buffer);
    const response = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID,
      "unique()", // Unique ID
      bufferStream,
      file.mimetype
    );

    // Generate a public URL
    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${response.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    // Save to DB
    const result = await pool.query(
      `INSERT INTO products (name, category, quantity, price, image_url, created_by)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, category, quantity, price, fileUrl, created_by]
    );

    res.status(201).json({ product: result.rows[0] });
  } catch (err) {
    console.error("Upload failed:", err.message);
    res.status(500).send("File upload failed.");
  }
});

module.exports = router;
