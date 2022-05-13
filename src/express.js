const express = require('express')
const app = express();

const port = 8080
app.listen(port, () => console.log(`listening on ${port}`))

const productsRoute = require('./products.js');
app.use('/api/products/', productsRoute);

var db = require("./database.js")

app.get("/api/prodottiDB", (req, res, next) => {
    var sql = "select * from product"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});