const { normalizeURL, getURLsFromHTML } = require("./ref.crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://blog.some.com/path/";
  const actual = normalizeURL(input);
  const expected = "blog.some.com/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML: absolute urls", () => {
  const htmlBody = `
    <html>
        <a href="https://github.com/majorbruteforce">
            Social
        </a>
    </html>
    `;
  const baseURL = "https://github.com";

  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = ["https://github.com/majorbruteforce"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML: relative urls", () => {
  const htmlBody = `
    <html>
        <a href="/majorbruteforce">
            Social
        </a>
    </html>
    `;
  const baseURL = "https://github.com";

  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = ["https://github.com/majorbruteforce"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML: invalids", () => {
  const htmlBody = `
    <html>
        <a href="majorbruteforce">
            Invalid/Broken
        </a>
    </html>
    `;
  const baseURL = "https://github.com";

  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});

