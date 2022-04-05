let dataGlobal;
let paddedData;
    fetch('./input.txt')
.then(res => res.text())
    .then(data => {
            dataGlobal = transformInput(data.trim());
            console.log( "ok", main(
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
    paddedData = transformInputForP2(data);
    console.log(paddedData);
    return getLowestBasinSize(paddedData) ( getLowestValueArray(paddedData)(1)).sort((a,b) =>  b - a).slice(0,3).reduce ((acc, v) => acc * v,1);
    //.map(v =>  paddedData[v[1]] [v[0]]   + 1).reduce((acc,v) => acc +v);
    //.reverse().reduce((acc,v) => acc + paddedData[v[1]][v[0]] ,0);
}


function getLowestValueArray(data) {
    return (radius) => data.reduce((rows,value,indexy,array) => {
            return [...rows,...( value.reduce((lowest,value,indexx,array) => {
                        return (value !== -100 && checkLowest(data)(1)([indexx  ,indexy  ]))  ?  [...lowest, [indexx,indexy]] : lowest ;
                        },[]))];
            },[]);
}

function checkLowest(data) {
    return radius => position =>  getSurroundingArray(data)(radius)(position)
        .filter((v,i) => i % 2 === 1 && v !== -100)
        .every(v => v > data[position[1]][position[0]]);

}

function getLowestBasinSize (data){
    return (LowestValueArray) => {
        return LowestValueArray.reduce((basinSizes, v) => [...basinSizes,getBasinSize(data)(v)],[]);    
    }
}

function getBasinSize(data) {
    return coordinate => {
        if( data.at(coordinate[1]).at(coordinate[0]) === -5 || data.at(coordinate[1]).at(coordinate[0]) === 9 || data.at(coordinate[1]).at(coordinate[0])=== -100){
            return 0;
        }
        data[coordinate[1]][ coordinate[0]] = -5;

        const getSurrounding = getSurroundingArrayP2(data)(1)(coordinate)
            .filter((v,i) => i % 2 === 1 && v !== -100);
        return getSurrounding.reduce((sizeArray,v) => sizeArray + getBasinSize(data)(v),0) + 1;
    }

}

function getSurroundingArrayP2(data) {
    return radius => position =>
    {
        const loop = (array) => currenty => {

            if( currenty > position[1] + radius )
                return array;

            const innerLoop = array => currentx => {
                if ( currentx > position[0] + radius)
                    return array;
                // if(data [currenty] [currentx] !== -100)
                array.push( [currentx, currenty]);


                return innerLoop(array)(currentx + 1);
            }
            const innerLoopValue = innerLoop([])(position[0] - radius);

            return loop([...array,...innerLoopValue])(currenty+1);

        }
        return loop([])(position[1] - radius);
    }
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
                array.push( data [currenty] [currentx]);


                return innerLoop(array)(currentx + 1);
            }
            const innerLoopValue = innerLoop([])(position[0] - radius);

            return loop([...array,...innerLoopValue])(currenty+1);

        }
        return loop([])(position[1] - radius);
    }
}
