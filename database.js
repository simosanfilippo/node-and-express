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
            price integer
        )`,
        (err) => {
            if (err) {
                console.log("errore ")
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO product (name, price) VALUES (?,?)'
                db.run(insert, ["Latte",20])
                db.run(insert, ["Cioccolato",10])
            }
        });  
    }
});


module.exports = db