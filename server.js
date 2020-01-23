const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fs = require('fs');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: conf.host,
	database: conf.database,
	user: conf.user,
	password: conf.password,
	port: conf.port
})
connection.connect();

app.get('/api/getCustomers', (req, res) => {
	connection.query(
		"select * from CUSTOMER A", (err, rows, fields) => {
			console.dir(rows)
			res.send(rows);
		}
	)
})

app.listen(port, () => console.error('running'));
