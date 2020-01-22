const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/getCustomers', (req, res) => {
	res.send([
		{
			id:1,
			image: 'https://placeimg.com/64/64/1',
			name: '유성호1',
			birth: '1973-02-08',
			gender: '남자',
			job: '부사장'
		},
		{
			id:2,
			image: 'https://placeimg.com/64/64/2',
			name: '유성호2',
			birth: '1973-02-08',
			gender: '남자',
			job: '부사장'
		},
		{
			id:3,
			image: 'https://placeimg.com/64/64/3',
			name: '유성호3',
			birth: '1973-02-08',
			gender: '남자',
			job: '부사장'
		},
	]);
})

app.listen(port, () => console.error('running'));
