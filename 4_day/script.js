
//let importFunction = require('./experimentImport.js');
    fetch("./input.txt")
.then((res) => res.text())
    .then((data) => console.log(main(data.trim().split("\n\n"))));

    function main(data) {
        let [randomNumbers,...boards] = data;
        randomNumbers = randomNumbers.split(",").map( v => Number(v));

        boards = transformTo2DArray(boards); 
        const firstBoard = part2(randomNumbers)(boards);
        return firstBoard;

    }

function transformTo2DArray(gameBoards) {
    return gameBoards.map((value,index,array) => {
            return value.split("\n").map((value,index,array) => {
                    return value.split(' ').filter((value,index,array) => {
                            return value !== '';
                            }).map((value,index,array) => {
                                return Number(value);
                                });;
                    });
            });
}

function getBoard(randomNumbers) {
    return boards =>{
        return randomNumbers.slice().reduce((boards,value,index,array) => {
                boards= markboards(boards)(value);
                //       console.log('boards',boards, markboards(boards)(value));
                const solvedBoard = checkBoards(boards);

                const isSolved = ((solvedBoard) => {
                        return solvedBoard ? true : false;
                        })(solvedBoard);

                if (isSolved) {
                boards = scoreCalculator(value)(solvedBoard);
                array.splice(1);
                }

                return boards;
                },boards);
    }
}

function part2(randomNumbers) {
    return boards =>{
        return randomNumbers.slice().reduce(([boards,stack],value,index,array) => {
                boards= markboards(boards)(value);
                const solvedBoards = checkBoards(boards);
                const isSolved = ((solvedBoard) => {
                        return solvedBoards.length ? true : false;
                        })(solvedBoards);

                if (isSolved) {
                stack = scoreCalculator(value)(solvedBoards.at(-1));
                boards = deleteIteams(boards)(solvedBoards);
                }

                return [boards,stack];
                },[boards,0]);
    }
}
function checkBoards(boards) {
    return boards.reduce((solvedBoards,value,index,array) => {
            if( checkOneboard(value)) solvedBoards.push(value);
            return solvedBoards;
            },[]); 
    function checkOneboard(board) {
        //check horizontaly on every row of the board to see if it is solved
        let isSolvedHorizontal = board.some(value => value.every(value => value === -100));
        //check vertically on every collumn of the board to see if it is solved
        let isSolvedVertical = board[0].some((value, index) => board.every(value => value[index] === -100));
        return isSolvedVertical || isSolvedHorizontal;

    }

}

function markboards(boards) {
    return (number) => {
        return boards.map((value,index,array) => {
                return (markOneBoard(value))(number);
                }); 
    }

    function markOneBoard(board) {
        return number => board.map((value,index,array) => {
                return  value.map((value,index,array) => {
                        return value === number ? -100 : value;
                        });
                });
    }

}

function scoreCalculator (value){
    return boards => {
        //to calculate the score, sum all the value of the board that is unmarked
        const sum = boards.reduce((acc,v) => acc + v.reduce((acc,v) => acc+(v === -100? 0: v),0),0)
            return sum * value;

    }
}
function deleteIteams(boards){
    return iteams =>{
        iteams.forEach(iteam => boards.splice(boards.findIndex(board => board === iteam),1));
        return boards;
    }
}
