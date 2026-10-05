const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "HARIYO backend is running successfully!"
  });
});

app.get("/api/products", (req, res) => {
  res.json([
    {
      id: "hariyo-essential-tee",
      name: "HARIYO Essential Tee",
      price: 18000
    },
    {
      id: "hariyo-oversized-hoodie",
      name: "HARIYO Oversized Hoodie",
      price: 35000
    },
    {
      id: "hariyo-signature-dress",
      name: "HARIYO Signature Dress",
      price: 42000
    },
    {
      id: "hariyo-relaxed-trousers",
      name: "HARIYO Relaxed Trousers",
      price: 28000
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`HARIYO backend running on port ${PORT}`);
});
