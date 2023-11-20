const cheerio = require("cheerio");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }
  pages[normalizedCurrentURL] = 1;

  console.log(`crawling: ${currentURL}`);

  try {
    const res = await fetch(currentURL);
    if (res.status >= 400) {
      console.log(`Error fetching: status code: ${res.status}`);
      return pages;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Error: Invalid Content-Type: ${contentType}`);
      return pages;
    }

    const htmlBody = await res.text();
    const nextURLs = extractURLs(htmlBody, baseURL);
    for (const nextURL of nextURLs)
    {
        pages= await crawlPage(baseURL, nextURL, pages);
    }
    
  } catch (err) {
    console.log(`Error fetching URL: ${err.message}`);
  }
  return pages;
}

function extractURLs(htmlBody, baseURL) {
  const $ = cheerio.load(htmlBody);
  const urls = [];
  const linkElements = $("a");
  linkElements.each((index, element) => {
    const href = $(element).attr("href");

    if (href.slice(0, 1) === "/") { //Check if URL is relative
      try {
        const urlObj = new URL(baseURL + href); //Prevents invalid URL appends
        urls.push(urlObj.href);
      } catch (err) {
        console.log(
          `Error parsing URL: ${baseURL + href} (relative path): ${
            err.message
          }  `
        );
      }
    } else { //if URL is absolute
      try {
        const urlObj = new URL(href); //Prevents invalid URLs
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error parsing URL: ${href} (absolute path): ${err.message}`);
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


module.exports = {
  normalizeURL,
  extractURLs,
  crawlPage,
};
