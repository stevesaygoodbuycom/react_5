import React from 'react';
import './App.css';
import Customer from "./components/Customer";

function App() {
	const customers = [
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
	]
  return (
    <div className="App">
			{
				customers.map(obj => {
					return <Customer key={obj.id} customer={obj}/>
				})
			}
    </div>
  );
}

export default App;
