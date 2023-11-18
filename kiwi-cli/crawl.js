const {JSDOM} = require('jsdom');


function extractURLs(htmlBody){
    const dom= new JSDOM(htmlBody);
    const urls= dom.window.document.querySelectorAll('a');
    for(const url in urls){
        console.log(url)
    }

}

function normalizeURL(urlString){
    const URLObject= new URL(urlString);
    let singularURL= URLObject.hostname + URLObject.pathname;
    if (singularURL.slice(0,4) === 'www.'){
        singularURL = singularURL.slice(4)
    }
    if (singularURL.slice(-1) === '/'){
        singularURL= singularURL.slice(0,-1)
    }
    return singularURL;
}

async function get(){
    const body = await fetch("https://github.com")
    const htmlBody= await body.text();
    console.log(htmlBody)
    console.log(extractURLs(htmlBody));
}

get();