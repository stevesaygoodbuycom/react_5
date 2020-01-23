import React, {Component} from 'react';
import { TableRow, TableCell } from '@material-ui/core/'

class Customer extends Component {
	render() {
		return (
			<TableRow>
				<TableCell>{this.props.customer.id}</TableCell>
				<TableCell><img src={this.props.customer.image} alt="profile" style={{width:60}}/></TableCell>
				<TableCell>{this.props.customer.name}</TableCell>
				<TableCell>{this.props.customer.birthday}</TableCell>
				<TableCell>{this.props.customer.gender}</TableCell>
				<TableCell>{this.props.customer.job}</TableCell>
				<TableCell><button onClick={() => {this.props.deleteCustomer(this.props.customer.id)}}>삭제</button></TableCell>
			</TableRow>
		);
	}
}

export default Customer;
