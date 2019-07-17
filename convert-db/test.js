
const readline = require('readline')
, fs = require('fs')

const rl = readline.createInterface({
input: fs.createReadStream('book.json')
})

const cusSplit = (data, char) => {
if(data != '' && typeof data == 'string' && data != 'n/a') 
    return data.split(char)

return ''
}

let arr = []

rl.on('line', (line) => {
line = JSON.parse(line)
    arr.push(cusSplit(line.Writers, '|'))
})


console.log(arr)


let ans = deduplicate(arr)

console.log(ans);
// Expected output: [1, 5, "a", 3, "f", "3", "b", "e"]

function deduplicate(arr) {
  let isExist = (arr, x) => {
    for(let i = 0; i < arr.length; i++) {
      if (arr[i] === x) return true;
    }
    return false;
  }

  let ans = [];
  arr.forEach(element => {
    if(!isExist(ans, element)) ans.push(element);
  });
  return ans;
}