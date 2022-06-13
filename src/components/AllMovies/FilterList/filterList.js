import React from 'react';
import consts from '../../../const.json';
import yearsList from '../../Utils/yearsList';
import './filterList.css';

const FilterList = ({setFilter, filter, filterType}) => {

	const filterList = filterType === 'years'? yearsList(13): consts[filterType];

	const handleClick = (el) =>{
		if(el === filter){
			setFilter();
		}else{
			setFilter(el);
		}
	};

	return(
		<div className={`filter ${filterType}`}>
			{filterList.map( (el, i) => 
				<button key={i} 
					className={el === filter ? `button btn-filter ${el}-filter`: 'button'} 
					onClick={() => handleClick(el)}
				>
					{el}
				</button>
			)}
		</div>
	);
};

export default React.memo(FilterList);