import React from 'react';
import { Link } from 'react-router-dom';
import movieImg from '../../images/movie-placeholder.png';
import './card.css';


const Card = ({item, position, isVisible}) => {

	const image_url = item.primaryImage ? item.primaryImage.url + '_V1_UY368_CR0,0,245,368_AL_.jpg': movieImg;

	return(
		<div className='card'>
			<Link to={`/title/${item.id}/`} className='card'>
				{position && <div className='card-position'>{item.position}</div>}
				<div className='card-image' style={{backgroundImage : isVisible? `url(${image_url})` : 'black'}}></div>
				<div className='card-text'>
					{item.titleText.text} <br/>
					{item.releaseYear && item.releaseYear.year}
				</div>
			</Link>
		</div>
	);
};

export default Card;