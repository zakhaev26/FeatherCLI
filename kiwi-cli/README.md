# Kiwi
## A tool to scrap, crawl and monitor targeted websites.

### Installation

- Clone repo
- Run `npm install -g` inside the directory
- Run `kiwi [mode] [URL]` to use. Use mode as 'crawl' and http(s) URLs now.

### Crawling:

- Recurrsively visit webpages that branch from the base url
- Stay on the same hostname to prevent crawling outside the scope
- Collect elements(links[-l], images[-i], htmlsnapshots[-s]) into a folder 

#### Functions: 

- normalizeURL : Stream down URLs to a singular URL. [https://google.com = http://google.com = www.google.com = Google.com = google.com] to avoid revisiting the same webpages again

- ExtractURLs : Extract all URLs from given HTML body and return an array of urls, append baseURL if only relative path is present

- crawlPage: Recurrsively crawl all the links in the given page and return elements encountered

#### Possible Edge Cases


