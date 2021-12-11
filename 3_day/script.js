fetch('./input.txt')
	.then(res => res.text())
	.then(data => console.log(main(data.trim().split('\n'))));

function main(data){
	return ratingFinder(data, o2criteeriaFunction) * ratingFinder(data, co2criteeriaFunction);
}

function ratingFinder(data, criteriaFunction ){
		const ratingString = data[0].split('').reduce((acc,v,i) => {
			if (acc.length === 1){
				return acc;
			}
			const columnMajorityIndicator = acc.reduce((acc,v) => {
						return v[i] === '1'? acc + 1 : acc - 1;

				},0);
			const filteringValue = criteriaFunction( columnMajorityIndicator);

			return acc.filter(v => v[i] === filteringValue); 

		},data);
	return parseInt(ratingString[0],2);

}

function o2criteeriaFunction(columnMajorityIndicator){ 
	if(columnMajorityIndicator < 0){
		return '0';
	}
	else if(columnMajorityIndicator > 0) {
		return '1';
	}
	return '1';

}

function co2criteeriaFunction(columnMajorityIndicator){ 
	if(columnMajorityIndicator < 0){
		return '1';
	}
	else if(columnMajorityIndicator > 0) {
		return '0';
	}
	return '0';
}
