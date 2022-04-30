
    fetch('./input.txt')
.then(res => res.text())
    .then(data => console.log(   main(
                    transformInput(data.trim())
                    )));

    function transformInput(data) {
        return data
            .split("\n")
            .map(v => v.split("").map(v => Number(v)));
    } 

let exposedData;
function main(data){
    exposedData = data.map(v => v.slice());
    //    console.log(data);
    console.log (

            new Array(1000).fill(0).reduce((acc,v,i,array) =>{
                if(acc[1] === data.length*data[0].length){
                array.splice(0);
                return i;
                }

                return steps(acc)
                } ,[data,0])
            )
        //return data;
}


function surroundingOf2dArray(array) {
    return startingPosition => endingPosition => reduce => initialValue => {
        const outerLoop = (currentY,acc) => {
            if(currentY > endingPosition[1])
                return acc;
            const innerLoop = (currentX, acc) => {
                if( currentX > endingPosition[0])
                    return acc;

                //console.log('inside of surroundin', array[currentY][currentX]);
                return innerLoop(currentX +1, reduce(acc,array[currentY][currentX],[currentX,currentY],array));
            }

            const row = innerLoop(startingPosition[0],acc);
            return outerLoop(currentY + 1 , row);
        }
        return outerLoop(startingPosition[1],initialValue);

    }
}

function steps(acc) {
    acc = acc[0];
    const beforeZeroed = surroundingOf2dArray(acc)([0,0])([acc.length -1 ,acc[0].length -1])(incrementByOne)(acc);

    const afterZeroed = surroundingOf2dArray(beforeZeroed)([0,0])([beforeZeroed.length -1 ,beforeZeroed[0].length -1])(zeroing)(beforeZeroed);

    let count = surroundingOf2dArray(afterZeroed)([0,0])([afterZeroed.length -1 ,afterZeroed[0].length -1])(countZeros)(0);
    return [afterZeroed, count];
}


function countZeros(acc,v,indexs,array) {
    if(v === 0)
        return acc +1;
    return acc;
}
function zeroing(acc,v,indexs,array) {
    const [indexX,indexY] = indexs;
    if(v>9){
        acc[indexY][indexX] = 0;
        return acc;
    }
    return acc;
}

function incrementByOne(acc,v,indexs,array) {
    if(v=== undefined) return acc;
    const [indexX,indexY] = indexs;

    acc[indexY][indexX] += 1;
    if(acc[indexY][indexX] === 10){
        let [startingPosition,endingPosition] =[[indexX -1, indexY -1],[indexX +1, indexY +1]];
        startingPosition = [startingPosition[0] < 0? 0: startingPosition[0],startingPosition[1] < 0? 0: startingPosition[1]];
        endingPosition = [endingPosition[0] > acc[0].length-1?  acc[0].length-1:endingPosition[0],endingPosition[1] >  acc.length-1 ?acc.length-1  :endingPosition [1]];
        return surroundingOf2dArray(acc)(startingPosition)(endingPosition)(incrementByOne)(acc);
    }

    return acc;
}

function clone2dArray(array) {
    return array.map(v => v.slice());
}
