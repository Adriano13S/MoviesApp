import React from 'react';
import './loading.css';

const LoadingAnimation = ()=>{

	return(
		<div className='loadingContainer'>
			<div className="preloader">
				<div className="preloader__square"></div>
				<div className="preloader__square"></div>
				<div className="preloader__square"></div>
				<div className="preloader__square"></div>
			</div>
		</div>
	);
};

export default LoadingAnimation;