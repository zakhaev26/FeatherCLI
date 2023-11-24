const axios = require('axios');

async function main(stringName){
const options = {
  method: 'GET',
  url: 'https://youtube-v2.p.rapidapi.com/search/',
  params: {
    query: stringName
  },
  headers: {
    'X-RapidAPI-Key': 'ba4e9ba179mshc69623caa396691p186ac5jsn49df3ab96d0d',
    'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}

main("One Dance");
