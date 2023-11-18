const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (const element of linkElements) {
    if (element.href.slice(0, 1) === "/") {
        try{
            const urlObj = new URL(baseURL + element.href);
            urls.push(urlObj.href);
        } catch(err){
            console.log(`Error parsing relative url: ${err.message}`)
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
};
