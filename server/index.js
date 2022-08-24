const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'M@rquefen87',
    database: 'inventorymanagement',
})

app.post('/create', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;

    db.query(
        'INSERT INTO inventory (name, price, quantity) VALUES (?,?,?)', 
        [name, price, quantity]);
        (err, result) => {
            if(err){
                console.log(err);
            }else {
                console.log('values inserted')
            }
        }
})

app.get('/product', (req, res) => {
    db.query(
        'SELECT * FROM inventory',
        (err, result) => {
            if(err){
                console.log(err);
            }else {
                res.send(result);
            }
        })
})

app.listen(3001, () => {
    console.log('running');
})