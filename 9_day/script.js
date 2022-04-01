let dataGlobal;
    fetch('./input.txt')
.then(res => res.text())
    .then(data => {
            dataGlobal = transformInput(data.trim());
            console.log( main(
                        dataGlobal
                        ))
            });

function transformInput(data) {
    return data
        .split("\n")
        .map(v => v.split("")
                .map(v => Number(v))) ;
} 

function transformInputForP2(data) {

    const addedArray = Array (data[0].length + 2).fill(-100);
    const paddedData =[addedArray,...data.map( v =>[-100,...v,-100]),addedArray];
    return paddedData; 
}

function main(data){
    const paddedData = transformInputForP2(data);
    console.log(paddedData);
    return getLowestValueArray(paddedData)(1)
        .map(v => v + 1)
        .reverse().reduce((acc,v) => acc + v);
}

function getLowestValueArray(data) {
    return (radius) => data.reduce((rows,value,indexy,array) => {
            return [...rows,...( value.reduce((lowest,value,indexx,array) => {
                        return (value !== -100 && checkLowest(data)(1)([indexx  ,indexy  ]))  ?  [...lowest, value] : lowest ;
                        },[]))];
            },[]);
}

function checkLowest(data) {
    return radius => position =>  getSurroundingArray(data)(radius)(position)
        .filter((v,i) => i % 2 === 1 && v !== -100)
        .every(v => v > data[position[1]][position[0]]);

}

function getSurroundingArray(data) {
    return radius => position =>
    {
        const loop = (array) => currenty => {

            if( currenty > position[1] + radius )
                return array;

            const innerLoop = array => currentx => {
                if ( currentx > position[0] + radius)
                    return array;
                // if(data [currenty] [currentx] !== -100)
                array.push(data [currenty] [currentx]);


                return innerLoop(array)(currentx + 1);
            }
            const innerLoopValue = innerLoop([])(position[0] - radius);

            return loop([...array,...innerLoopValue])(currenty+1);

        }
        return loop([])(position[1] - radius);
    }
}
