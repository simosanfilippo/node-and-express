const express = require('express');
const router = express.Router();

const fsController = require ('./server.js')

// Home page route
router.get('/', async (req, res) => {
  const products = await fsController.readProducts()
  res.status(200).json(products)
});

// single product route
router.get('/:productId', async (req, res) => {
  const products = await fsController.readProducts()
  for (singleproduct of products){  
    if (singleproduct.id == req.params.productId){
        res.status(200).json(singleproduct)
    }  
  }
  res.status(204).end()
});

module.exports = router;