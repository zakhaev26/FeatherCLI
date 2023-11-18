const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  pages[normalizedCurrentURL] = 1;

  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  console.log(`actviely crawling ${currentURL}`);

  try {
    const res = await fetch(currentURL);
    if (res.status > 399) {
      console.log(`Error fetching ${currentURL}: status code: ${res.status}`);
      return pages;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Non HTML response: Content-type: ${contentType}}`);
      return pages;
    }

    const htmlBody= await res.text();
    console.log(htmlBody)

    const nextURLs= getURLsFromHTML(htmlBody, baseURL)

    for (const nextURL of Object.entries(nextURLs)){
        pages= await crawlPage(baseURL, nextURL, pages);    
    }
  } catch (err) {
    console.log(`Error fetching ${currentURL}: ${err.message}`);
  }

  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (const element of linkElements) {
    if (element.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(baseURL + element.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error parsing relative url: ${err.message}`);
      }
    } else {
      try {
        const urlObj = new URL(element.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error parsing relative url: ${err.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
