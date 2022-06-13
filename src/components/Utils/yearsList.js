const yearsList= (num) =>{
	const today = new Date();
	const years = [];
	for(let i = 0; i < num; i+=1){
		years.push(today.getFullYear() - i);
	}
	return years;
};

module.exports = yearsList;