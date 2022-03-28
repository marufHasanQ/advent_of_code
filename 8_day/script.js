fetch('./input.txt')
    .then(res => res.text())
    .then(data => console.log( main(
        transformInput(data.trim())
    )));

function transformInput(data) {
    return data
        .split("\n")
        .map(v => v.split("|")
            .map(v => v.split(" ")
                .filter(v => v !== "")));
} 


const indexToVlaueMap = new Map([[0,1],
    [1,7],
    [2,4],
    [9,8],

]);
function main(data){

    const sortData = (data) =>
        data.map(v => [
            v[0]
            .sort((a,b) => a.length - b.length)
            .map(v => new Set(v))
            ,v[1].map(v => new Set(v))
        ]);


    const getInputMapped = data =>
        data.map ( v => [mapInputToValue(indexToVlaueMap)(v[0])
            ,v[1]])


    const dataInputMapped = getInputMapped(sortData(data));

    const getResultArray = (data) => {
        return data.map( value => value[1]
            .reduce((acc,v) => acc + String( getValueFromInputMap(value[0])(v)),"")) ;
    }

    return (getResultArray(dataInputMapped).reduce((acc,v) => acc + Number (v),0));
    /* 
     * 2 is 1,
     * 3 is 7,
     * 4 is 4,
     * 7 is 8,
     * */
    /*

*/

}

function getValueFromInputMap(map) {
    return value =>{
        const checkEquals = setA =>
            setB => setA.size === setB.size && setIntersectio(setA)(setB).size === setB.size;
        const temp =  v => new Set([[...v[0]],[...value]]).size === Math.min(value.size,v[0].length);
        return [...map].find(v => checkEquals(v[0])(value))[1];
    } 
}

function mapInputToValue(indexToVlaueMap) {
    return data =>{

        let mappedData = data.map((v,i) => {
            if(indexToVlaueMap.get(i)){
                return [v,indexToVlaueMap.get(i)];

            }
            return v;
        });

        mappedData = mappedData.map(v => {

            //if it is 9 intersection with 4 should be 4
            if (v.size === 6 && setIntersectio(v)(mappedData[2][0]).size === 4){
                return [v , 9]
            }
            //if it is 0 intersection with 1 should be 2
            else if (v.size === 6 && setIntersectio(v)(mappedData[0][0]).size === 2){

                return [v, 0]
            }

            else if (v.size === 6 && setIntersectio(v)(mappedData[0][0]).size === 1){

                return [v, 6]
            }
            //if it is 3 intersection with 1 should be 2
            else if (v.size === 5 && setIntersectio(v)(mappedData[0][0]).size === 2){

                return [v, 3]
            }

            //if it is 5 intersection with 4 should be 3
            else if (v.size === 5 && setIntersectio(v)(mappedData[2][0]).size === 3){

                return [v, 5]
            }

            else if (v.size === 5 && setIntersectio(v)(mappedData[2][0]).size === 2){

                return [v, 2]
            }
            return v;
        });

        return new Map(mappedData);
    }
}

function setIntersectio(setA) {
    return setB => new Set([...setA].filter(v => setB.has(v)));
}
