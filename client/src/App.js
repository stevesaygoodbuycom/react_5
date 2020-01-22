import React from 'react';
import './App.css';
import Customer from "./components/Customer";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core/'

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: '1000px'
	}
})
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

function App() {
  return (
  	<Paper className={styles.root}>
			<Table className={styles.table}>
				<TableHead>
					<TableCell>번호</TableCell>
					<TableCell>이미지</TableCell>
					<TableCell>이름</TableCell>
					<TableCell>생년월일</TableCell>
					<TableCell>성별</TableCell>
					<TableCell>직업</TableCell>
				</TableHead>
				<TableBody>
				{
					customers.map(obj => {
						return <Customer key={obj.id} customer={obj}/>
					})
				}
				</TableBody>
			</Table>
		</Paper>
  );
}

export default withStyles(styles)(App);
