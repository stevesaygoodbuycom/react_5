import React, {Component} from 'react';
import { post } from 'axios';
import {Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
	hidden: {
		display: 'none'
	},
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


class CustomerAdd extends Component {
	constructor(props) {
		super(props);

		this.state = {
			file: null,
			userName: '',
			birthday: '',
			gender: '',
			job: '',
			fileName: '',
			open: false
		}
	}
	addCustomer = () => {
		const url = '/api/addCustomer';
		const formData = new FormData();
		formData.append('image', this.state.file);
		formData.append('name', this.state.userName);
		formData.append('birthday', this.state.birthday);
		formData.append('gender', this.state.gender);
		formData.append('job', this.state.job);
		formData.append('fileName', this.state.fileName);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return post(url, formData, config);
	}
	handleFormSubmit = (e) => {
		e.preventDefault();
		this.addCustomer()
			.then((response) => {
				console.log(response);
				this.props.refreshData();
				return;
				this.setState({
					file: null,
					userName: '',
					birthday: '',
					gender: '',
					job: '',
					fileName: '',
				})
			})
	}
	handFileChange = (e) => {
		this.setState({
			file: e.target.files[0],
			fileName: e.target.value
		})
	}
	handleValueChange = (e) => {
		let nextState = {}
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}

	handleClickOpen = () => {
		this.setState({
			open: true
		})
	}

	handleClickClose= () => {
		this.setState({
			file: null,
			userName: '',
			birthday: '',
			gender: '',
			job: '',
			fileName: '',
			open: false
		})
	}
	render() {
		const { classes } = this.props;

		return (
			<div>
				<Button variant="contained" color="primary" onClick={this.handleClickOpen}>
					고객 추가하기
				</Button>
				<Dialog open={this.state.open} onClose={this.handleClickClose}>
					<DialogTitle>고객 추가</DialogTitle>
					<DialogContent>
						<p><input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handFileChange}/></p>
						<label htmlFor="raised-button-file">
							<Button variant="contained" color="primary" component="span" name="file">
								{ this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
							</Button>
							<input type="hidden" name="fileName" value={this.state.fileName}/>
						</label>
						<p><TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/></p>
						<p><TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/></p>
						<p><TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/></p>
						<p><TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/></p>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가하기</Button>
						<Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(CustomerAdd);
