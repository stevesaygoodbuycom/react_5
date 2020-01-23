import React, {Component} from 'react';
import { TableRow, TableCell } from '@material-ui/core/'
import CustomerDelete from "./CustomerDelete";

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
				<CustomerDelete deleteCustomer={this.props.deleteCustomer} id={this.props.customer.id}>삭제</CustomerDelete>
			</TableRow>
		);
	}
}

export default Customer;
