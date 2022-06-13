const convertSeconds = (value) => {
	const sec = parseInt(value, 10); // convert value to number if it's string
	let hours   = Math.floor(sec / 3600); // get hours
	let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
	// add 0 if value < 10; Example: 2 => 02
	if (minutes < 10) {minutes = '0'+minutes;}
	if(minutes === '00'){
		return hours + ' h';
	}
	if(hours === 0){
		return minutes + ' min';
	}
	return hours + ' h - ' + minutes + ' min'; // Return is HH : MM : SS
};

export default convertSeconds;
