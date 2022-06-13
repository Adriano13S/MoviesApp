import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './bigCardSeasons.css';
import organizeEpisodes from '../Utils/organizeEpisodes';

const BigCardSeasons = ({episodes, episodeId}) => {

	const [openSeason, setOpenSeason] = useState();
	const seasons = organizeEpisodes(episodes);

	return(
		<div className='seasons-container'>
			{seasons && seasons.map(season => {
				return(
					// eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
					<div className='single-season' key={season[0].seasonNumber} onClick={() => setOpenSeason(season[0].seasonNumber)}>
            Season {season[0].seasonNumber}
						<div className={season[0].seasonNumber === openSeason? 'season-episodes-container': 'season-episodes-container m100'}>
							{season.map( episode => {
								return(
									<div 
										className={episodeId === episode.tconst? 'single-episode green': 'single-episode'}
										key={episode.tconst} 
									>
										<Link to={`/title/${episode.tconst}/`}>
											<div>
                        Episode {episode.episodeNumber}
											</div>
										</Link>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default BigCardSeasons;