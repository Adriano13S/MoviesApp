import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Iframe from 'react-iframe';
import { Link } from 'react-router-dom';
import './bigCardVideo.css';

const CardVideo = ({link, id, isSeries, setEpisodes, series}) => {
	const [url, setUrl] = useState();
	const y_link = link && link+'?controls=0';
  
	useEffect(() =>{
		if(series){
			setUrl(`https://v2.vidsrc.me/embed/${series.series.id}/${series.episodeNumber.seasonNumber}-${series.episodeNumber.episodeNumber}/`);
		}
	},[series]);
  

	const getEpisodes = (id) =>{
		axios.get(`https://moviesdatabase.p.rapidapi.com/titles/series/${id}`)
			.then( res => {
				res.data.error? setEpisodes([]): setEpisodes(res.data.results);
			});
	};

	return(
		<div className='cardVideo'>
			{isSeries?
				<>
					<button className='button movie-btn' onClick={()=> getEpisodes(id)}>Seasons</button>
					<button className='button trailer-btn' onClick={() => setUrl(y_link)}>Watch Trailer</button>
				</> :
				series?
					<>
						{series.previousEpisode && 
          <Link to={`/title/${series.previousEpisode.id}/`}><button className='button movie-btn'>GoTo Previous</button>
          </Link>
						}
						{/* <button className='button movie-btn' onClick={() => 
          setUrl(`https://v2.vidsrc.me/embed/${series.series.id}/${series.episodeNumber.seasonNumber}-${series.episodeNumber.episodeNumber}/`)}>
          Watch Episode
        </button> */}
						{series.nextEpisode && 
          <Link to={`/title/${series.nextEpisode.id}/`}><button className='button trailer-btn'>GoTo Next</button>
          </Link>
						}
					</> :
					<>
						<button className='button movie-btn' onClick={() => setUrl(`https://v2.vidsrc.me/embed/${id}`)}>
            Watch v1
						</button>
						<button className='button movie-btn' onClick={() => setUrl(`https://hls.hdv.fun/imdb/${id}?raj=2`)}>
            Watch v2
						</button>
						<button className='button trailer-btn' onClick={() => setUrl(y_link)}>
            Watch Trailer
						</button>
					</>
			}
			<div className='video'>
				{ url &&
					<Iframe
						width="750px"
						height="450px"
						id="videoFrame"
						display="initial"
						position="relative"
						allow="fullscreen"
						frameBorder="0"
						src={url}
					/>
				}       
			</div>
		</div>
	);
};

export default React.memo(CardVideo);