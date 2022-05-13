const fs = require('fs/promises')

readProducts = async () => {
  try {
    const products = await fs.readFile('products.json')
    return JSON.parse(products)
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
    readProducts
}
