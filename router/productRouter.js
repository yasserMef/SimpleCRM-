const express = require("express")
const router = express.Router()
const {createProductValidator} = require("../util/validator/productValidator")
const {createProduct,getProducts,updateProduct,getOneProduct,deleteProduct} = require("../controlers/productControler")
router.route("/").post(createProductValidator,createProduct).get(getProducts)
router.route("/:id").get(getOneProduct).put(updateProduct).delete(deleteProduct)
module.exports = router