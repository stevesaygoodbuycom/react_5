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
		"select * from CUSTOMER A order by id desc limit 10", (err, rows, fields) => {
			console.dir(rows)
			res.send(rows);
		}
	)
})

const multer = require('multer');
const upload = multer({dest: "./upload"});
app.use('/image', express.static('./upload'));

app.post('/api/addCustomer', upload.single('image'), (req, res) => {
	let image='/image/'+req.file.filename;
	let name=req.body.name;
	let birthday=req.body.birthday;
	let gender=req.body.gender;
	let job=req.body.job;
	let fileName=req.body.fileName;
	let params = [image, name, birthday, gender, job, fileName];

	let sql = "insert into CUSTOMER (image, name, birthday, gender, job, file_name) values(?, ?, ?, ?, ?, ?)";
	connection.query(
		sql, params,
		(err, rows, fields) => {
				console.dir(rows)
				res.send(rows);
			}
	)
})

app.listen(port, () => console.error('running'));
