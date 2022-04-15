
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

const errorArray = new Map( '(),[],{},<>'.split(',').map( v => v.split('')));
const errorScore= new Map([[')',3],
    [']',57],
    ['}',1197],
    ['>',25137]

]);

const perenthesisList = '([{<'.split('');
let exposedData;

function main(data){
    exposedData = data;

    console.log('rec',data.reduce((acc,v) => acc + rec(v)(0)([]),0));
    const temp = data.reduce((acc, v) => {
        acc.push( rec(v)(0)([]))
        return acc;
    },[])
        .filter( v => typeof(v) === 'object')
        .map( v => v
            .reduce((acc, v) => acc*5 + perenthesisList.findIndex(value => value === v) + 1, 0))
        .sort((a,b) => a-b)
    ;
    console.log(temp.at(temp.length/2));
}

function rec(line) {
    return index => openParenthesisStack =>{
        if(index >= line.length){
            return openParenthesisStack;
        }
        const currentSymoble = line.at(index);
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
    }
}



