const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let name;

await rl.question('What is your name? ', (answer) => {
  name = answer;
  rl.close();
});

console.log(`Hello, ${answer}!`);
