//Import module
const router = require('express').Router();
const auth = require('../auth')
const productController = require('../controllers/productControllers');

//Add Products (Admin Only)
router.post('/', auth.verify, (req, res) => {

    let userData = auth.decode(req.headers.authorization)

    productController.addProduct(userData, req.body)
        .then(result => {
            res.send(result)
        })

})

// Get All Products
router.get("/all", (req, res) => {
    productController.getAll()
        .then(result => res.send(result));
})

// Get All Active Products
router.get("/active", (req, res) => {

    productController.getAllActive()
        .then(result => {
            res.send(result)
        })

    // productController.getAllActive()
    //     .then(result => res.send(result));
})

// Get Specific Product
router.get("/:productId", (req, res) => {
    productController.getProduct(req.params.productId)
        .then(result => {
            res.send(result)
        })
})

//Update Product
router.put("/:productId", auth.verify, (req, res) => {

    let userData = auth.decode(req.headers.authorization)

    productController.updateProduct(userData, req.params.productId, req.body)
        .then(result => {
            res.send(result)
        })
})

//Archive Product set isActive to False 
router.put("/:productId/archive", auth.verify, (req, res) => {
    let userData = auth.decode(req.headers.authorization)

    productController.archiveProduct(userData, req.params.productId)
        .then(result => {
            res.send({ message: "Product has been Archive" })
        })
})

//Unarchive or Activate Product
router.put("/:productId/activate", auth.verify, (req, res) => {
    let userData = auth.decode(req.headers.authorization)

    productController.activateProduct(userData, req.params.productId)
        .then(result => {
            res.send({ message: "Product has been Activated" })
        })
})

module.exports = router;