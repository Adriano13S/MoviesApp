/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/card';
import CardMedium from '../CardMedium/cardMedium';
import consts from '../../const.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import './cardlist.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';


export default function CardList ({title, list, mediumCard}){

	const [titles, setTitles] = useState([]);

	const infoParam = mediumCard ? 'custom_info': 'mini_info';
	const breakpoints = mediumCard ? consts.breakpoints2 : consts.breakpoints1;

	const params = {info: infoParam, sort: 'pos.incr', list: list, limit: 15 };

	useEffect(() => {
		axios.get(`${consts.url}/titles/`, {params:params})
			.then(res =>{
				res.data.error? setTitles([]) : setTitles(res.data.results);
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return(
		<div className='card-list'>
			<div className='card-list-title'>
				<h3>{title}</h3>
				<Link to={{pathname:`lists/${list}`}}>view all &gt;</Link>
			</div>
			<Swiper
				modules={[Navigation, Pagination]}
				navigation
				grabCursor={true}
				pagination={{ type: 'progressbar' }}
				breakpoints={breakpoints}
				watchSlidesProgress
			>
				{titles.map((item) =>{
					return(
						<SwiperSlide key={item.id}>
							{({ isVisible }) => 
								mediumCard? 
									<CardMedium item={item} isVisible={isVisible}/>:
									<Card item={item} isVisible={isVisible}/>
							}
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
}