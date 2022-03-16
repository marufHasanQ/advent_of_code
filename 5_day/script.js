let dataa ;
fetch('./input.txt')
    .then(res => res.text())
    .then(data => console.log(main(
        transformInput((data.trim()))
    )));

function transformInput(data) {
    return data.split("\n").map((value,index,array) => {
        return value.split(' -> ').map(v => v.split(',').map(v => Number(v)));
    });
}

function main(data) {
    dataa = filterOutDiagonalCoordinates(data);
    let array2d = create2DArray(0)(getArrayDimention(getMaxCordinate(dataa)));
    return countDuplicate(mark2DArray(array2d)(dataa)); 
}

function create2DArray(filler) {
    return dimention => Array(dimention[1]).fill().map(v =>Array(dimention[0]).fill(filler));
}

function getArrayDimention(maxCoordinate) {
    return [maxCoordinate[0]+1,maxCoordinate[1]+1];
}

function filterOutDiagonalCoordinates(coordinates) {
    return coordinates.filter((value,index,array) => {
        return (value[0][0] === value[1][0] ||  value[0][1] === value[1][1]) || (Math.abs(value[0][0] -value[1][0]) === Math.abs( value[0][1] -value[1][1]));
    }); 
}

function getMaxCordinate(coordinates) {
    return coordinates.reduce((maxCoordinate,value,index,array) => {
        const maxX = getMaxXCoordinate(maxCoordinate[0])(value);
        const maxy = getMaxYCoordinate(maxCoordinate[1])(value);
        return [maxX,maxy];

    },[0,0]);
    function getMaxXCoordinate(CurrentMaxXcoordinate) {
        return coordinate => {
            return Math.max(CurrentMaxXcoordinate,Math.max(coordinate[0][0],coordinate[1][0]));
        };
    }
    function getMaxYCoordinate(CurrentMaxYcoordinate) {
        return coordinate => {
            return Math.max(CurrentMaxYcoordinate,Math.max(coordinate[0][1],coordinate[1][1]));
        };
    }
}

function mark2DArray(array2D) {
    return coordinateList => {

        return coordinateList.reduce((array2D,coordinates) => {

            array2D[coordinates[0][1]][coordinates[0][0]] ++;
            while(coordinates[0][0] !== coordinates[1][0] || coordinates[0][1] !== coordinates[1][1]){
                let currentX = coordinates[0][0] + ( coordinates[0][0] <  coordinates[1][0] ? 1: coordinates[0][0] ===  coordinates[1][0] ? 0: -1);
                let currentY = coordinates[0][1] + ( coordinates[0][1] <  coordinates[1][1] ? 1: coordinates[0][1] ===  coordinates[1][1] ? 0: -1);
                array2D[currentY][currentX] ++;
                coordinates[0] =[currentX,currentY];

            }
            return array2D;

        },array2D);

    }; 
}

function countDuplicate(array2D) {
    return array2D.reduce((collumn,value,index,array) => {
        return collumn + value.reduce((row,value,index,array) => {
            return row+ (value>1?1:0);
        },0);
    },0);
}
