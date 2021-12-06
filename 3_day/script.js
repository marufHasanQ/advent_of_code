fetch('./input.txt')
	.then(res => res.text())
	.then(data => console.log(main(data.trim().split('\n'))));

function main(data){
	return data[0].split('').reduce((acc,v,i) => {
		const columnMajority = data.reduce((acc,v) => {
			return v[i] === '1'? acc + 1 : acc - 1;

		},0)

		 acc.push(columnMajority > 0 ? 1 : 0);
		return acc;

	},[]);

}

