const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const productController = require("../controllers/product");
const isAuth = require("../middleware/is-auth");

router.get("/products", isAuth, productController.getProducts);
router.post(
  "/product",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("The title must be more than 5 caractere"),
    body("price").isNumeric().withMessage("The price must be a number"),
    body("description")
      .trim()
      .isLength({ min: 5 })
      .withMessage("The description must be more than 5 caractere"),
  ],
  isAuth,
  productController.addProduct
);

router.put(
  "/product/:productId",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("The title must be more than 5 caractere"),
    body("price").isNumeric().withMessage("The price must be a number"),
    body("description")
      .trim()
      .isLength({ min: 5 })
      .withMessage("The description must be more than 5 caractere"),
  ],
  isAuth,
  productController.editProduct
);

router.delete("/product/:productId", isAuth, productController.deleteProduct);

module.exports = router;
