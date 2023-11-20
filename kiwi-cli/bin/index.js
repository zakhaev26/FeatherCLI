#! /usr/bin/env node

const { crawlPage } = require("./crawl");

async function main() {
  if(process.argv.length < 4){
    console.log("Error: No arguments");
    return;
   
  }
  if(process.argv.length > 4){
    console.log("Error: Too many arguments, features under development.");
    return;
  }
  const mode= process.argv[2];
  const URL = process.argv[3];

  if(isValidURL(URL) && mode === 'crawl'){
    console.log(`Starting crawling of ${URL}`);
    console.log(await crawlPage(URL, URL, {}));
    return;
  }

  console.log("Error: Unsupported mode or URL");

}

function isValidURL(URL){
  return true;
}


/* @TODO for mode:crawl
* store invalid pages/url and dont revisit them
* Add timeout return
* Check URL validity (protocol, path, queries)
* Use yargs or some framework to create better CLI experience
*/


main();
