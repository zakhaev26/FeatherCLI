#! /usr/bin/env node

const { crawlPage } = require("./crawl");

async function main() {
  if(process.argv.length < 3){
    throw new Error("No arguments");
   
  }
  if(process.argv.length > 3){
    throw new Error("Too many arguments, features under development.");
  }
 
  const URL = process.argv[2];
  console.log(await crawlPage(URL, URL, {}));
}

main();
