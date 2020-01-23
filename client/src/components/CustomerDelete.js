import React, {Component} from 'react';
import { TableRow, TableCell } from '@material-ui/core/'
import {Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button, Typography} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles'

class CustomerDelete extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		}
	}
	handleClickOpen = () => {
		this.setState({
			open: true
		})
	}

	handleClickClose= () => {
		this.setState({
			open: false
		})
	}

	render() {
		return (
			<TableCell>
				<div>
					<Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
						삭제
					</Button>
					<Dialog open={this.state.open} onClose={this.handleClickClose}>
						<DialogTitle>고객 삭제 경고</DialogTitle>
						<DialogContent>
							<Typography gutterBottom>
								정말 삭제하시겠습니까?
							</Typography>
						</DialogContent>
						<DialogActions>
							<Button variant="contained" color="secondary" onClick={() => this.props.deleteCustomer(this.props.id)}>삭제</Button>
							<Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
						</DialogActions>
					</Dialog>
				</div>

			</TableCell>
		);
	}
}

export default CustomerDelete;
