const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", /*verifyTokenAndAdmin,*/ async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", /*verifyTokenAndAdmin,*/  async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct)
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id",/*verifyTokenAndAdmin,*/ async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id",  async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get(`/search`, async (req, res) => {
  const { q, type } = req.query;

  try {
    let products;

    // Build the query based on the provided parameters
    const query = {};
    
    if (q) {
      query.$or = [
        { categories: { $in: [q] } },
        { title: { $regex: new RegExp(q, "i") } },
        { color: { $regex: new RegExp(q, "i") } },
      ];
    }

    // Determine the limit based on the 'type' parameter
    let limit = 2;
    if (type === 'less') {
      limit = 8;
    } else if (type === 'more') {
      limit = 15;
    }

    // Execute the query with the limit
    products = await Product.find(query).limit(limit);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;