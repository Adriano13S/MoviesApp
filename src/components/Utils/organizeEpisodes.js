const organizeEpisodes = (array) => {
	const arrays = [];
	array.map(obj => {
		if(arrays.length){
			for(let i = 0; i < arrays.length; i+=1) {
				if(obj.seasonNumber === arrays[i][0].seasonNumber){
					arrays[i].push(obj);
					break;
				}else{
					if(i === arrays.length -1){
						arrays.push([obj]);
						break;
					}
				}
			}
		}else{
			arrays.push([obj]);
		}
		return arrays;
	});

	//ORDERED VARIANT (IF EPISODES ARE IN ORDER)
	// let season = []
	// let counter = 1
	// array.map((obj) => {
	//   // console.log(obj)
	//   if(obj.seasonNumber === counter){
	//     season.push(obj)
	//   }else{
	//     arrays.push(season)
	//     season = []
	//     counter +=1
	//   }
	// })
	return arrays;
};

export default organizeEpisodes;