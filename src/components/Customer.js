import React, {Component} from 'react';

class Customer extends Component {
	render() {
		return (
			<div>
				<CustomerProfile customer={this.props.customer}/>
				<CustomerInfo customer={this.props.customer}/>
			</div>
		);
	}
}

class CustomerProfile extends Component {
	render() {
		return (
			<div>
				<img src={this.props.customer.image} alt="profile"/>
				<h2>({this.props.customer.id})</h2>
				<h2>{this.props.customer.name}</h2>
			</div>
		)
	}
}

class CustomerInfo extends Component {
	render() {
		return (
			<div>
				<h2>{this.props.customer.birth}</h2>
				<h2>{this.props.customer.job}</h2>
			</div>
		)
	}
}

export default Customer;
