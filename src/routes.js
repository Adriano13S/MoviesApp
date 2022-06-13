import React, {useEffect} from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Layout from './components/Layout/layout';
import Home from './components/Home/home';
import Movie from './components/Movie/movie';
import AllTitles from './components/AllMovies/allmovies';
import Contact from './components/Footer/contact';
import Terms from './components/Footer/terms';
import Request from './components/Footer/request';


const AppRoutes = () =>{

	const locnow = useLocation();

	//Use location to scroll to top on page change
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [locnow]);

	return(
		<Layout>
			<Switch>
				<Route path="/" exact component={Home}/>
				<Route path="/title/:id/" exact component={Movie}/>
				<Route path="/lists/:list" exact component={AllTitles}/>
				<Route path="/contact/" exact component={Contact}/>
				<Route path="/terms/" exact component={Terms}/>
				<Route path="/request/" exact component={Request}/>
				<Route path="*" component={Home}/>
			</Switch>
		</Layout>
	);
};
    
export default AppRoutes;
