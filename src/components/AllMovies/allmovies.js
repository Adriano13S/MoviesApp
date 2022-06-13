import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/card';
import LoadingDots from '../Widgets/Loading/loadingDots';
import LoadingAnimation from '../Widgets/Loading/loading';
import FilterList from './FilterList/filterList';
import consts from '../../const.json';


const AllTitles = ({match}) => {

	const list = match.params.list;
	const listTitle = consts.lists.find((el) => el['list'] === list).title;
	
	const [titles, setTitles] = useState();
	const [gen, setGen] = useState();
	const [year, setYear] = useState();

	// Setup request parameters
	let params = {info: 'mini_info', list: list, sort: 'pos.incr'};
	if(gen){params['genre'] = gen;}
	if(year){params['year'] = year;}


	// Load first page on initial render / reset page and titles
	useEffect(() => {
		params['limit'] = 21;
		axios.get(`${consts.url}/titles/`, {params: params}).then(res => {
			res.data.error? setTitles({results:[]}) : setTitles(res.data);
		});
	// eslint-disable-next-line
	}, [gen, year, list]);

	// On bottom scroll get next page
	const handleScroll = useCallback(() => {
		if(titles.next){
			const diff = document.body.scrollHeight - window.scrollY;
			if(diff > 1000 && diff < 1100){
				window.removeEventListener('scroll', handleScroll);
				axios.get(`${consts.url}${titles.next}`).then(res => {
					res.data.error ?
						setTitles({results:[]}) :
						setTitles({
							page: +res.data.page,
							next: res.data.next,
							entries: res.data.entries,
							results: [...titles.results, ...res.data.results]
						});
				});
			}
		}else{
			window.removeEventListener('scroll', handleScroll);
		}
	}, [titles]);


	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);
	

	return(
		<>
			<FilterList setFilter={setGen} filter={gen} filterType={'genres'}/>
			<FilterList setFilter={setYear} filter={year} filterType={'years'}/>
			{titles ?
				<div className='card-list full-all'>
					<h3>{listTitle}</h3>
					{titles.results.map( movie => <Card key={movie.id} item={movie} position={true} isVisible={true}/>)}
					{titles.next && <LoadingDots />}
				</div> :
				<LoadingAnimation />}
		</>
		
	);
};

export default React.memo(AllTitles);
