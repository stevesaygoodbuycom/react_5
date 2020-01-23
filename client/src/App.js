import React, {Component} from 'react';
import './App.css';
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import { Table, TableHead, TableBody, TableRow, TableCell, CircularProgress } from '@material-ui/core/'
import { Paper } from '@material-ui/core/'

import {AppBar, Toolbar, IconButton, Typography, InputBase} from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
	root: {
		width: '100%',
		minWidth: 1080
	},
	paper: {
		marginLeft: 18,
		marginRight: 18,
	},
	tableHead: {
		fontSize: 18
	},
	menu: {
		marginTop: 15,
		marginBottom: 15,
		display: 'flex',
		justifyContent: 'center'
	},
	progress: {
		margin: theme.spacing.uint * 3,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200,
			},
		},
	},
})

class App extends Component{
	constructor(props) {
		super(props);
		this.state = {
			customers: null,
			progressCount: 0,
			searchKeyword: ''
		}
	}

	componentDidMount() {
		this.timer = setInterval(this.progress, 20);
		this.refreshData();
	}

	refreshData = () => {
		this.callApi()
			.then(res => {
				this.setState({customers: res})
			})
			.catch(err => {
				console.error(err)
			});
	}

	callApi = async () => {
		return await fetch('/api/getCustomers').then(data => data.json());
	}

	progress = () => {
		const { progressCount } = this.state;
		this.setState({ completed: progressCount >= 100 ? 0 : progressCount + 1});
	}

	deleteCustomer = (id) => {
		const url = '/api/customers/' + id;
		fetch(url, {
			method: 'DELETE'
		}).then(
			this.refreshData()
		);
	}
	handleValueChange = (e) => {
		let nextState = {}
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}
	render() {
		const { classes } = this.props;
		const cellList = ["번호", "이미지", "이름", "생년월일", "성별", "직업", "설정"];

		const filteredComponents = (data) => {
			data = data.filter((c) => {
				return c.name.indexOf(this.state.searchKeyword)>=0
			});
			return data.map( (obj) => {
				return <Customer key={obj.id} customer={obj} deleteCustomer={this.deleteCustomer}/>
			});
		}
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="open drawer"
						>
							<MenuIcon />
						</IconButton>
						<Typography className={classes.title} variant="h6" noWrap>
							고객 관리 시스템
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
								name="searchKeyword"
								value={this.state.searchKeyword}
								onChange={this.handleValueChange}
							/>
						</div>
					</Toolbar>
				</AppBar>
				<div className={classes.menu}>
					<CustomerAdd refreshData={this.refreshData}/>
				</div>
				<Paper className={classes.paper}>
					<Table className={classes.table}>
						<TableHead>
							{
								cellList.map((data) => <TableCell className={classes.tableHead}>{data}</TableCell>)
							}
						</TableHead>
						<TableBody>
							{
								this.state.customers ?
									filteredComponents(this.state.customers) :
									<TableRow>
										<TableCell colSpan="6" align="center">
											<CircularProgress className={styles.progress} variant="determinate"
																				value={this.state.progressCount}/>
										</TableCell>
									</TableRow>
							}
						</TableBody>
					</Table>
				</Paper>
			</div>
		);
	}
}

export default withStyles(styles)(App);
