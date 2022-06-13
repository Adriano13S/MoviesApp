import React, { useState } from 'react'; 
import axios from 'axios';
import Card from '../Card/card';
import Nav from '../Nav/nav';
import PageFooter from '../Footer/pageFooter';
import Search from '../Widgets/Search/search';
import consts from '../../const.json';

axios.defaults.headers = consts.headers;

const Layout = ({children}) =>{
	const[search, setSearch] = useState();

	return(
		<div className='container'>
			<Nav/>
			<Search setSearch={setSearch} search={search} />
			{search ? 
				<div className='card-list full-search'>
					{search.results.map(movie => <Card key={movie.id} item={movie} isVisible={true}/>)}
				</div>
				:
				<>
					{children}
				</>
			}
			<PageFooter />
		</div>
	);
};

export default Layout;