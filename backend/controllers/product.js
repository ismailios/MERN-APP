const { validationResult } = require("express-validator");
const { Error } = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/user");
const { clearImage } = require("../util/file");

exports.getProducts = (req, res, next) => {
  const currentPage = req.params.page || 1;
  let perPage = 2;
  let totalItems;

  Product.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Product.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((products) => {
      if (!products) {
        const err = new Error("Load Products Failed !");
        err.statusCode = 404;
        throw err;
      }

      res.status(200).json({
        message: "Product Loaded Successfully",
        totalProducts: totalItems,
        currentPage: currentPage,
        nbPages: Math.ceil(totalItems / perPage),
        PerPage: perPage,
        products: products,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addProduct = (req, res, next) => {
  if (!req.file) {
    const error = new Error("no file uploaded");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const price = req.body.price;
  //REPLACE JUST FOR WINDOWS
  const image = req.file.path.replace("\\", "/");
  const description = req.body.description;
  let userOut;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const product = new Product({
    title: title,
    price: price,
    image: image,
    description: description,
    user: req.userId,
  });

  product
    .save()
    .then((product) => {
      User.findById(req.userId).then((user) => {
        if (!user) {
          const error = new Error("User not found");
          error.statusCode = 422;
          throw error;
        }
        userOut = user;
        user.products.push(product);
        return user.save();
      });
    })
    .then((result) => {
      res.status(200).json({
        message: "Product Created Successfully",
        product: product,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        const err = new Error("Product not found");
        err.statusCode = 404;
        throw err;
      }

      if (product.user.toString() !== req.userId) {
        const err = new Error("Not Authorized");
        err.statusCode = 403;
        throw err;
      }

      clearImage(product.image);
      return Product.findByIdAndRemove(productId);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.products.pull(productId);
      return user.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Product Deleted Successfully",
      });
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editProduct = (req, res, next) => {
  const productId = req.params.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  let productup;
  let image = req.body.image;

  if (req.file) {
    image = req.file.path.replace("\\", "/");
  }
  if (!image) {
    const err = new Error("No file uploaded !!");
    err.statusCode = 404;
    throw err;
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Validation failed !!");
    err.statusCode = 404;
    throw err;
  }

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        const err = new Error("Product Not Found");
        err.statusCode = 404;
        throw err;
      }
      if (product.user.toString() !== req.userId) {
        const err = new Error("Not Authorized");
        err.statusCode = 403;
        throw err;
      }

      if (image != product.image) {
        clearImage(product.image);
      }

      product.title = updatedTitle;
      product.description = updatedDescription;
      product.price = updatedPrice;
      product.image = image;
      product = product;
      productup = product;
      return product.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Product updated Succesfully",
        product: productup,
      });
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
