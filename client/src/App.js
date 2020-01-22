import React, {Component} from 'react';
import './App.css';
import Customer from "./components/Customer";
import { Table, TableHead, TableBody, TableRow, TableCell, CircularProgress } from '@material-ui/core/'
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
	},
	progress: {
		margin: theme.spacing.uint * 3,
	}
})
const customers = fetch('http://localhost:500/api/getCustomers');

class App extends Component{
	constructor(props) {
		super(props);
		this.state = {
			customers: null,
			progressCount: 0
		}
	}

	componentDidMount() {
		this.timer = setInterval(this.progress, 20);
		this.callApi()
			.then(res => {
				this.setState({customers: res})
			})
			.catch(err => {
				console.error('333333333333333333333333333333333333')
				console.error(err)
				console.error('333333333333333333333333333333333333')
			});
	}

	callApi = async () => {
		return await fetch('/api/getCustomers').then(data => data.json());
	}

	progress = () => {
		const { progressCount } = this.state;
		this.setState({ completed: progressCount >= 100 ? 0 : progressCount + 1});
	}

	render() {
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
							this.state.customers ? this.state.customers.map(obj => {
								return <Customer key={obj.id} customer={obj}/>
							}) :
								<TableRow>
									<TableCell colSpan="6" align="center">
										<CircularProgress className={styles.progress} variant="determinate" value={this.state.progressCount}/>
									</TableCell>
								</TableRow>
						}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

export default withStyles(styles)(App);
