import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom';

const Header =()=>(
	<header>
		<h1>Wellcome to Expensify App !</h1>
		<NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink> |
		<NavLink to="/create" activeClassName="is-active"> Create</NavLink> |
		<NavLink to="/help" activeClassName="is-active"> Help</NavLink>.
	</header>

);

export default Header;