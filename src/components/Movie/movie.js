import React,{useState,useEffect} from 'react';
import axios from 'axios';
import consts from '../../const.json';
import BigCard from '../CardBig/bigCard';
import './movie.css';

axios.defaults.headers = consts.headers;

const Movie = ({match}) =>{

	const [movie, setMovie] = useState();

	useEffect(() =>{
		axios.get(`${consts.url}/titles/${match.params.id}/`, {params:{info: 'custom_info'}})
			.then(res =>{
				setMovie(res.data.results);
			});
	}, [match.params.id]);

	return(
		<div className='movie-big-container'>
			{ movie && <BigCard item={movie} /> }
		</div>
	);
};

export default Movie;
