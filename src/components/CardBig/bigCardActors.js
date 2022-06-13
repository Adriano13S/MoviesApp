import React from 'react';
import './bigCardActors.css';

const Actor = ({actor}) =>{
	return(
		<div className='actor-card'>
			<div className='actor-card-container-image'>
				<img src={actor.name.primaryImage && actor.name.primaryImage.url + '_V1_UY150_CR0,150_AL_.webp'} alt=''/>
			</div>
			<div className='actor-card-name'>
				<b>{actor.name.nameText.text}</b> {actor.characters && 'as'} <span>{actor.characters && actor.characters.map(character => character.name+' ')}</span>
			</div>
		</div>
	);
};

export default Actor;