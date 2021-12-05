fetch('./input.txt')
	.then(res => res.text())
	.then(data => console.log(main(data.trim().split('\n').map(v => v.split(' ')))));

function main(data){
	const temp = data.map(v => [v[0], Number(v[1])])
		.reduce((acc,v) => {
			if (v[0] == 'up')
			acc[2] -= v[1];
			if (v[0] == 'down')
			acc[2] += v[1];
			if (v[0] == 'forward'){
			acc[1] += v[1];
			acc[0] += acc[2]*v[1];}

			return acc;


		},[0,0,0])  
	;
	return temp[0]*temp[1];
}
