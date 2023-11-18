const { crawlPage } = require("./ref.crawl");

async function main() {
  if (process.argv.length < 3) {
    console.log("No argument provided");
  } else if (process.argv.length > 3) {
    console.log("Too many arguments");
  } else {
    const baseURL = process.argv[2];
    console.log(`Starting crawling of ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});

    console.log(pages);
  }
}

main();
