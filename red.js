//let arg = ["Elena", "creste", "o mandra", "floare", "albastra", "floare", "albastra", "floare",];

let text = 'Elena creste o mandra floare albastra albastra floare albastra floare';

let arg = text.split(' ');

let bigram = n => {return Array(n).fill(0).reduce((arr,_,i)=>{
    arr.push((i>1)?arg[i-2].concat(" ", arg[i-1]):i);
    return arr;
    },[]);
    
};

let arr = bigram(arg.length+1);

arr.splice(0,2);

console.log(arr);

let count = arr => {
  return arr.reduce((total, colloc) => {
    total[colloc] ? total[colloc]++ : total[colloc] = 1;
    return total;
  }, {});
};

const map = new Map(Object.entries(count(arr)));

var mapDesc = new Map([...map.entries()].sort((x,y)=>y[1]-x[1]));

console.log(mapDesc);