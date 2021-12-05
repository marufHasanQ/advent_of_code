fetch('./input.txt')
	.then(res => res.text())
	.then(data => console.log(main(data.trim().split('\n').map(v => Number(v)))));

function main(data){
	let previousSum = 100000;
	alert(data, data.length);
	return	data.reduce(function(acc,v,i,a){
		const currentSum = a.slice(i,i+3).reduce((acc,v) => acc + v);

		if(currentSum > previousSum){
			previousSum = currentSum;
			return acc+1;
		}
		previousSum = currentSum;
		return acc; 
	
	},0);
}
