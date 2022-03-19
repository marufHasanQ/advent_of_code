fetch('./input.txt')
    .then(res => res.text())
    .then(data => console.log( main(
        transformInput(data.trim())
    )));

function transformInput(data) {
    return data.split(",").map(v => Number(v));
} 

function main(data) {
    return data.reduce((acc,v) => acc + reproduction(80)(7)(v+1),0);
}


function reproduction(endPoint) {
    return stepLength => 
        currentLength => {
            if(currentLength > endPoint) return 1;
            const reproductionFor80 = reproduction(endPoint)(stepLength);
            //console.log(currentLength)
            return reproductionFor80( currentLength + stepLength ) + reproductionFor80( currentLength + 9 );
        };
}

