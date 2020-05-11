/**
 * Copyright - DocsApp
 */

import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import {Badge} from 'react-bootstrap'

const Style = StyleSheet.create({
	HeaderContainer: {
		position: 'fixed',
		height: '60px',
		boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
		width: '100%',
		background: '#fff',
		top: '0',
		zIndex: '100',
		animationDuration: '0.5s',
		animationFillMode: 'both',
		backgroundColor: '#05a62b',
	},
	Profile: {
		float: 'right',
		lineHeight: '60px',
		paddingRight: '30px',
		fontWeight: '500',
		color: '#fff',
		textDecoration: 'none',
		':hover': {
			textDecoration: 'none'
		},
		':focus': {
			textDecoration: 'none'
		}
	},
	LogoContainer: {
		height: '100%'
	},
	LogoImage: {
		height: '60%',
		width: 'auto',
		position: 'absolute',
		top: '20%'
	}
});

export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);
	}

	logout() {

	}

	goHome() {

	}


	render() {
		try {

			let domain = "Operations";
			let username = this.props.userData.employeename

			return (
				<div className={css(Style.HeaderContainer)}>
					<a className={`${css(Style.LogoContainer)} left`}>

					</a>
					<div className={css(Style.Profile)}>
						{username}&nbsp; | &nbsp;
						Your Leave Balance <Badge variant="light">{this.props.userData.leavebalance}</Badge>
						<span className="sr-only">unread messages</span>&nbsp; | &nbsp;
						<a style={{ color: "white" }} onClick={this.logout}>Logout</a>
					</div>
				</div>
			);
		} catch (e) {
			//NOT LOGGED IN
			return (
				<div />
			);
		}
	}

}