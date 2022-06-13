import React from 'react';
import { Link } from 'react-router-dom';

const linkNav = (props) =>{
	return(
		<Link 
			className='nav-links'
			to={props.to}
			onClick={props.onClick}
		>
			<div className={`nav-button ${props.role}`}>
				{props.name}
			</div>
		</Link>
	);
};

export default linkNav;
