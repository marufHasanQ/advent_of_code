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

function create2DArray(filler) {
    return dimention => Array(dimention[1].fill(Array(dimention[0]).fill(filler)));
}

function filterOutDiagonalCoordinates(coordinates) {
    return coordinates.filter((value,index,array) => {
        return value[0][0] === value[1][0] ||  value[0][1] === value[1][1];
    }); 
}

function getMaxCordinate(coordinates) {
    return coordinates.reduce((maxCoordinate,value,index,array) => {
        const maxX = getMaxXCoordinate(maxCoordinate[0],value);
        const maxy = getMaxYCoordinate(maxCoordinate[1],value);
        return [maxX,maxy];

    });
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

function mark2DArray(Array) {
   return coordinate => {
       const markType = getMarkType(coordinate);
       switch (markType) {
           case 'horizontal':
               return markHorizontal(array)(coordinate);
               break;
           case 'vertical':
               return markVeretical(array)(coordinate);
               
       }

   }; 

    function getMarkType(coordinate) {
        return coordinate[0][0] === coordinate[1][0]? "horizontal" : "vertical";
    }
}
