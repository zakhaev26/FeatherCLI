const cheerio = require("cheerio");

function crawlPage(baseURL, currentURL, pages) {
  const normalizedCurrentURL = normalizeURL(currentURL);
}

function extractURLs(htmlBody, baseURL) {
  const $ = cheerio.load(htmlBody);
  const urls = [];
  const linkElements = $("a");
  linkElements.each((index, element) => {
    const href = $(element).attr("href");

    if (href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(baseURL + href); //Prevents invalid URL appends
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error parsing relative path: ${err.message}`);
      }
    } else {
        try{
            const urlObj = new URL(href); //Prevents invalid URL appends
            urls.push(urlObj.href);
        }catch(err){
            console.log(`Error parsing absolute path: ${err.message}`);
        }
    }

  });

  return urls;
}

function normalizeURL(urlString) {
  const URLObject = new URL(urlString);
  let singularURL = URLObject.hostname + URLObject.pathname;
  if (singularURL.slice(0, 4) === "www.") {
    singularURL = singularURL.slice(4);
  }
  if (singularURL.slice(-1) === "/") {
    singularURL = singularURL.slice(0, -1);
  }
  return singularURL;
}

// async function get(){
//     const body= await fetch('https://github.com');
//     const htmlBody= await body.text();
//     console.log(extractURLs(htmlBody, 'https://github.com'))
// }

// get();

module.exports = {
  normalizeURL,
  extractURLs,
  crawlPage,
};
