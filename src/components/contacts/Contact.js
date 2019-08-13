import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Consumer } from '../../context';

class Contact extends Component {
	state = {
		showContactInfo: false,
	};
	onShowClick = e => {
		this.setState({ showContactInfo: !this.state.showContactInfo });
	};

	onDeleteClick = async (id, dispatch) => {
		try {
			await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
			dispatch({ type: 'DELETE_CONTACT', payload: id });
		} catch (e) {
			dispatch({ type: 'DELETE_CONTACT', payload: id });
		}
	};

	render() {
		const {
			contact: { email, phone, name, id },
		} = this.props;
		const { showContactInfo } = this.state;

		return (
			<Consumer>
				{value => {
					const { dispatch } = value;
					return (
						<div className="card card-body mb-3">
							<h4>
								{name}
								<i
									onClick={this.onShowClick}
									className={
										showContactInfo ? 'fas fa-sort-up' : 'fas fa-sort-down'
									}
								/>
								<i
									onClick={this.onDeleteClick.bind(this, id, dispatch)}
									className="fas fa-times"
								/>

								<Link to={`contact/edit/${id}`}>
									<i className="fas fa-pencil-alt" />
								</Link>
							</h4>
							{showContactInfo && (
								<ul className="list-group">
									<li className="list-group-item">Email: {email}</li>
									<li className="list-group-item">Phone: {phone}</li>
								</ul>
							)}
						</div>
					);
				}}
			</Consumer>
		);
	}
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default Contact;
