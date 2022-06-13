import React from 'react';
import './stars.css';

const Stars = ({stars}) => {
	return(
		<div className='star'>
			<div className='rating' style={{width: stars + '%'}}>
				<span>&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</span>
			</div>
		</div>
	);
};

export default Stars;