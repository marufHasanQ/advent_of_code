fetch('./input.txt')
    .then(res => res.text())
    .then(data => console.log( main(
        transformInput(data.trim())
    )));

function transformInput(data) {
    return data.split(",").map(v => Number(v));
} 


function main(data) {
    const sortedData = data.sort((a, b) => a - b);
    console.log(data,sortedData);
    console.log("ans",calculateLowestFuel(sortedData));

    const middlePosition = Math.floor((Math.max(...sortedData)+ Math.min(...sortedData))/2);
    const left = calculateFuel(sortedData)(middlePosition - 1);
    const right = calculateFuel(sortedData)(middlePosition + 1);
    const middle =calculateFuel(sortedData)(middlePosition);
    return;
}
function calculateLowestFuel(data) {
    const fuelCost = (i,l,acc) => {
        if (i > l){
            return acc;
        } 
        const cost = calculateFuel(data)(i);
        acc = cost < acc? cost : acc;
        return fuelCost(i +1, l, acc);

    }
    return fuelCost(Math.min(...data),Math.max(...data) ,Infinity);
}

function calculateFuel(data) {
    return position =>   data.reduce((acc,v) => acc + sum(Math.abs (position - v)),0) ; 
}


function sum(number) {
    if( !number ) return 0;
    return number + sum(number - 1); 
}
