import React from 'react';
import consts from '../../const.json';
import LinkNav from './navLinks';
import './nav.css';

const Nav = () => {
	return(
		<nav>
			{consts.navLinks.map( (el, i) =>
				<LinkNav
					name= {el.name} 
					to= {el.to} 
					role= {el.role} 
					key= {i}
				/> 
			)}
		</nav>
	);
};

export default Nav;