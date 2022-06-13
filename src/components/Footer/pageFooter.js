import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './pageFooter.css';

const PageFooter = () => {

	const {pathname} = useLocation();
  
	return(
		<footer className={pathname.includes('/tt')? 'footer-title' : ''}>
			<div className='footer-butons-container'>
				<Link to='/terms/'><div className='footer-button'>Terms</div></Link>
				<Link to='/contact/'><div className='footer-button'>Contact</div></Link>
				<Link to='/request/'><div className='footer-button'>Request</div></Link>
			</div>
			<div className='footer-links-container'>
				<div className='footer-links-title'>
					<p>Links</p>
				</div>
				<div className='footer-links-list'>
					<Link to='/lists/most_pop_movies'><div className='footer-link'>Most Popular Movies</div></Link>
					<Link to='/lists/top_boxoffice_200'><div className='footer-link'>Top Box Office</div></Link>
					<Link to='/lists/top_rated_250'><div className='footer-link'>Top Rated Movies</div></Link>
					<Link to='/lists/top_rated_lowest_100'><div className='footer-link'>Top Lowest Rated</div></Link>
					<Link to='/lists/most_pop_series'><div className='footer-link'>Most Popular Series</div></Link>
					<Link to='/lists/top_rated_series_250'><div className='footer-link'>Top Rated Series</div></Link>
				</div>
			</div>
		</footer>
	);
};

export default PageFooter;
