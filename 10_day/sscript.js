
fetch('./input.txt')
    .then(res => res.text())
    .then(data => console.log(   main(
        transformInput(data.trim())
    )));

function transformInput(data) {
    return data
        .split("\n")
        .map(v => v.split(""));
} 

const errorArray =  '(),[],{},<>'.split(',').map( v => v.split(''));
const errorScore= new Map([[')',3],
    [']',57],
    ['}',1197],
    ['>',25137]

]);


let exposedData;

function main(data){
    exposedData = data;
    const getScoreOfLine = getTotalLineScore(errorArray);
    console.log('inside main');

    console.log('rec',data.reduce((acc,v) => acc + rec(v)(0)([]),0));
    //data.filter( v => rec(v)(0)([]) !== 0)
    //const totalScore = data.reduce( (acc, v) => acc + getScoreOfLine(v),0)  
    //   return totalScore;
}

function rec(line) {
    return index => openParenthesisStack =>{
        if(index >= line.length){
            return 0;
        }
        const currentSymoble =line.at(index);
        console.log(currentSymoble,openParenthesisStack);
        //very over-convulated way to get the the list of parenthesis that open a block
        const parenthesisPair ='(),[],{},<>'.split(',').map( v => v.split(''));
        const openParenthesis =  parenthesisPair.map( v => v[0]);

        const isCurrentSymboleAOpenPerenthesis = openParenthesis.includes( currentSymoble);

        if(isCurrentSymboleAOpenPerenthesis){
            openParenthesisStack.unshift(currentSymoble);
            return rec(line)(index +1)(openParenthesisStack);
        }

        const doesCloseParenthesisMatchLatestOpenPerenthesis = parenthesisPair.find( v => v[1]=== currentSymoble).at(0) === openParenthesisStack[0];

        if(doesCloseParenthesisMatchLatestOpenPerenthesis){
            openParenthesisStack.shift();
            return rec(line)(index +1)(openParenthesisStack);
        }
        return errorScore.get(currentSymoble);



    };
}



