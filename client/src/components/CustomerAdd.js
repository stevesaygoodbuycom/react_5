import React, {Component} from 'react';
import { post } from 'axios';

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
	render() {
		return (
			<div>
				<form onSubmit={this.handleFormSubmit}>
					<h1>고객 추가</h1>
					<p>프로필이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handFileChange}/></p>
					<p>이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/></p>
					<p>생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/></p>
					<p>성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/></p>
					<p>직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/></p>
					<p><button type="submit">추가하기</button></p>
				</form>
			</div>
		);
	}
}

export default CustomerAdd;
