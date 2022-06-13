/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper';
import CardList from '../CardList/cardlist';
import axios from 'axios';
import consts from '../../const.json';
import BigCard from '../CardBig/bigCard';
import './home.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const Home = () =>{

	const [slider, setSlider] = useState([]);

	useEffect(()=>{
		axios.get(`${consts.url}/titles/`, {params: {info: 'custom_info', list: 'top_boxoffice_last_weekend_10'}})
			.then(res =>{
				res.data.error? setSlider([]): setSlider(res.data.results);
			});
	},[]);


	return(
		<div>
			<div className='sliderContainer'>
				<Swiper 
					modules={[ Pagination, Autoplay, EffectFade]}
					effect={'fade'}
					loop
					grabCursor={true}
					initialSlide={1}
					slidesPerView={1}
					autoplay={{
						delay: 10000,
						disableOnInteraction: true,
					}}
					pagination={{ clickable: true }}
					watchSlidesProgress
				>
					{slider.map( item => {
						return(
							<SwiperSlide key={item.id}>
								{({ isVisible }) => (
									<BigCard item={item} isVisible={isVisible}/>
								)}
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
			<div className='home-container'>
				{consts.lists.map((el) => {
					return(
						<CardList
							key={el.title}
							title={el.title}
							list={el.list}
							mediumCard={el.mediumCard}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Home;