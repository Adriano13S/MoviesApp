import React from 'react';
import { Link } from 'react-router-dom';
import Stars from '../Widgets/Stars/stars';
import BlackImg from '../../images/black.png';
import './cardMedium.css';

const CardMedium = ({item, isVisible}) => {
  
	const image_url = item.primaryImage ? item.primaryImage.url + '_V1_UY868_CR0,0,570,268_AL_.jpg': BlackImg;

	return(
		<div className='card-medium'>
			<Link to={`/title/${item.id}/`} className='card-medium'>
				<div className='card-medium-image' style={{backgroundImage : isVisible? `url(${image_url})` : 'black'}}></div>
				<div className='card-medium-text'>
					<div className='card-medium-title'>
						{item.titleText.text}
						<span>|</span> 
						{item.releaseYear && item.releaseYear.year}
					</div>
					{item.ratingsSummary? <Stars stars={item.ratingsSummary.aggregateRating*10} />: <Stars stars={0} />}
					<div className='card-medium-gen'>
						{item.genres && item.genres.genres.map(el => <span key={el.id}>{el.text}</span> )}
					</div>
					<div className='card-medium-keywords'>
						{item.keywords && item.keywords.edges.map(el => <span key={el.node.text}>{el.node.text}</span> )}
					</div>
					<div className='card-medium-cast'>
						{item.principalCast && item.principalCast[0] && item.principalCast[0].credits.map(el =>
							<div key={el.name.id} >
								{el.name.nameText.text}
							</div>
						)}
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CardMedium;
