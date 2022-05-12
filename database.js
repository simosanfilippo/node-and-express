var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            weight string, 
            price integer, 
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO product (name, weight, price) VALUES (?,?,?)'
                db.run(insert, ["Latte",10,2])
                db.run(insert, ["Cioccolato",5,1])
            }
        });  
    }
});


module.exports = db