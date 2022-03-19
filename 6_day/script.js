//used recursion and dynamic array to solve the problem. To see the smarter solution see ./smartSolution.js
fetch('./input.txt')
    .then(res => res.text())
    .then(data => console.log( main(
        transformInput(data.trim())
    )));

function transformInput(data) {
    return data.split(",").map(v => Number(v));
} 

let dynamic = Array(257).fill();

function main(data) {
    return data.reduce((acc,v) => acc + reproduction(256)(7)(v+1),0);
}


function reproduction(endPoint) {
    return stepLength => 
        currentLength => {
            if(currentLength > endPoint) return 1;
            if (dynamic[currentLength]) return dynamic[currentLength];
            const reproductionFor80 = reproduction(endPoint)(stepLength);
            //console.log(currentLength)
            const result = reproductionFor80( currentLength + stepLength ) + reproductionFor80( currentLength + 9 );
            dynamic [currentLength] = result;
            return result;
        };
}

