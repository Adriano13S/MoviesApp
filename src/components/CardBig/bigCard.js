import React, { useState } from 'react';
import './bigCard.css';
import { Link, useParams } from 'react-router-dom';

import MovieImage from '../../images/movie-red-black-24.png';
import PlayImage from '../../images/play-red-black-28.png';
import Stars from '../Widgets/Stars/stars';
import Actor from './bigCardActors';
import CardVideo from './bigCardVideo';
import BigCardSeasons from './bigCardSeasons';
import convertSeconds from '../Utils/convertSeconds';
import BlackImg from '../../images/black.png';

const BigCard = ({item, isVisible}) =>{

	const [episodes, setEpisodes] = useState();
	const {id:paramId} = useParams();
	if(paramId){isVisible = true;}
	const image_url = item.primaryImage ? item.primaryImage.url + '_V1_FM_UX1000_.jpg': BlackImg;

	return(
		<div className='bigCard' style={{backgroundImage : isVisible? `url(${image_url})` : 'black'}}>
			<div className='big-card-text'>
				<div className={paramId? 'big-card-text-container':'big-card-text-container home-big-container'}>
					{paramId?
						<>
							<h2>{item.titleText.text}</h2>
							{item.series &&
								<h5>
									Season {item.series.episodeNumber.seasonNumber} <span>|</span> Episode {item.series.episodeNumber.episodeNumber}
								</h5>
							}
						</> :
						<Link to={`/title/${item.id}/`}>
							<h2>
								<img src={PlayImage} alt='PlayImage'/>
								{item.titleText.text} 
							</h2>
						</Link>
					}
					<div className='big-card-details'>
						{item.runtime && <><p>{convertSeconds(item.runtime.seconds)}</p><span>|</span></>}
						{item.releaseYear && <><p>{item.releaseYear.year}</p><span>|</span></>}
						{item.ratingsSummary? <Stars stars={item.ratingsSummary.aggregateRating*10} />: <Stars stars={0} />}
					</div>
					<div className='big-card-gen'>
						{item.genres && item.genres.genres.map(el => <span key={el.id}>{el.text}</span> )}
					</div>
					<div className='big-card-plot'>
						<img src={MovieImage} alt='MovieImage'/> {item.plot? item.plot.plotText.plainText: '-'}<br/>
					</div>
					<div className='big-card-keywords'>
						{item.keywords && item.keywords.edges.map(el => <span key={el.node.text}>{el.node.text}</span> )}
					</div>
					{/* TODO: OPTIONAL - FIND BETTER SOLUTION FOR LOADING EPISODES, TO REMEBER THEN / OR ACCES THEM FROM REFRESH EPISODE */}
					{/* add to years 2000's 1990's 1980's 1970's 1960's 1950's 1900's  */}
					{episodes? 
						<div className='big-card-seasons'>
							<BigCardSeasons episodes={episodes} episodeId={item.titleType.isEpisode && item.id}/>
						</div>
						:
						<div className='big-card-cast'>
							{item.principalCast && item.principalCast[0] && item.principalCast[0].credits.map(el => <Actor key={el.name.id} actor={el}/>)}
						</div>
					}
				</div>
				{paramId && 
					<CardVideo 
						link = {item.trailer} 
						id = {item.id} 
						isSeries = {item.titleType.isSeries} 
						setEpisodes = {setEpisodes}
						series = {item.titleType.isEpisode && item.series}
					/>
				}
			</div>
		</div>
	);
};

export default BigCard;