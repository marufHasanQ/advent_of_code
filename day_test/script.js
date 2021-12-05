//import {pass} from './2nd.js';
let temp = 'oe';
//alert(pass);
fetch('./input.txt')
	.then(res => res.text())
	.then(data => console.log(data.split('\n')));
console.log(temp);
