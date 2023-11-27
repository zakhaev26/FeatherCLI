const axios = require('axios');

async function main(stringName){	
	const options = {
		method: 'GET',
		url: 'https://youtube138.p.rapidapi.com/search/',
		params: "one dance",
		headers: {
			'X-RapidAPI-Key': '1fb3058e08mshe7795233ed4a67cp14c898jsn303c84881795',
			'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
		}
	};

	try {
		const response = await axios.request(options);
		const ID = response.data.contents[0].video;
		return ID;
	} catch (error) {
		console.error(error);
	}
}


main("One Dance");

