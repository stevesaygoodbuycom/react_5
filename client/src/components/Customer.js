import React, {Component} from 'react';
import { TableRow, TableCell } from '@material-ui/core/'

class Customer extends Component {
	render() {
		return (
			<TableRow>
				<TableCell>{this.props.customer.id}</TableCell>
				<TableCell><img src={this.props.customer.image} alt="profile"/></TableCell>
				<TableCell>{this.props.customer.name}</TableCell>
				<TableCell>{this.props.customer.birth}</TableCell>
				<TableCell>{this.props.customer.gender}</TableCell>
				<TableCell>{this.props.customer.job}</TableCell>
			</TableRow>
		);
	}
}

export default Customer;
