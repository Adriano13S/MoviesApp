/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

import React, {useState, useRef, useEffect, useCallback} from 'react';
import axios from 'axios';
import FilterList from '../../AllMovies/FilterList/filterList';
import consts from '../../../const.json';
import searchLogo from '../../../images/search_icon.png';
import './search.css';

const SearchBar = ({setSearch, search}) => {
	const inputSearch = useRef();
	const [gen, setGen] = useState();
	const [year, setYear] = useState();
	const [type, setType] = useState();


	// Setup request parameters
	let params = {info: 'mini_info', limit: 21};
	if(gen){params['genre'] = gen;}
	if(year){params['year'] = year;}
	if(type){params['titleType'] = type;}

	// SEARCH BAR SET RESULTS
	const fSearch = () =>{
		const keywords = inputSearch.current.value;
		if (keywords.length > 3){
			axios.get(`${consts.url}/titles/search/title/${keywords}/`,{params:params})
				.then(res => {
					res.data.error? setSearch({results:[]}): setSearch(res.data);
				});
		}
		else{
			setSearch();
		}
	};

	// UPDATE ON YEAR/GEN SELECT
	useEffect(() => {
		search &&
			axios.get(`${consts.url}/titles/search/title/${inputSearch.current.value}/`,{params:params}).then(res => {
				res.data.error? setSearch({results:[]}): setSearch(res.data);
			});
		// eslint-disable-next-line
  }, [gen, year, type]);

	//SHOW / HIDE SEARCH BAR

	const [toggleSearch, setToggleSearch] = useState();
	const wrapperRef = useRef();

	useEffect(()=> {
		if(!toggleSearch){ 
			inputSearch.current.value = '';
			setSearch();
			setGen();
			setYear();
			setType();
		}
		// eslint-disable-next-line
  }, [toggleSearch]);

	// CLOSE SEARCH ON CLICK OUTSIDE
	useEffect(() => {
		toggleSearch &&
    document.addEventListener('click', handleClickOutside, false);
		return () => {
			document.removeEventListener('click', handleClickOutside, false);
		};
		// eslint-disable-next-line
  }, [toggleSearch]);

	const handleClickOutside = event => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			setToggleSearch(!toggleSearch);
			inputSearch.current.value = '';
		}
	};

	// On bottom scroll get next page
	const handleScroll = useCallback(() => {
		if(search.next){
			const diff = document.body.scrollHeight - window.scrollY;
			if(diff > 1000 && diff < 1100){
				window.removeEventListener('scroll', handleScroll);
				axios.get(`${consts.url}${search.next}`)
					.then(res => {
						res.data.error
							? setSearch({results:[]}):
							setSearch({
								page: +res.data.page,
								next: res.data.next,
								entries: res.data.entries,
								results: [...search.results, ...res.data.results]
							});
					});
			}
		}else{
			window.removeEventListener('scroll', handleScroll);
		}
		// eslint-disable-next-line
	}, [search]);


	useEffect(() => {
		search &&
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
		// eslint-disable-next-line
	}, [handleScroll, search]);


	return(
		<div ref={wrapperRef}>
			<div className='search'>
				<span id='search-icon' onClick={() => setToggleSearch(!toggleSearch)}>
					<img alt='searchLogo' className={toggleSearch ? 'red' : ''} src={searchLogo}></img>
				</span>
				<span className ={toggleSearch ? 'search-bar' : 'search-bar w0'}>
					<input id='search' ref={inputSearch} onChange={fSearch} type="text" placeholder="Search.."/>
				</span>
			</div>
			{search &&
				<>
					<FilterList setFilter={setGen} filter={gen} filterType={'genres'}/>
					<FilterList setFilter={setYear} filter={year} filterType={'years'}/>
					<FilterList setFilter={setType} filter={type} filterType={'types'}/>
				</>
			} 
		</div>
	);
};

export default SearchBar;