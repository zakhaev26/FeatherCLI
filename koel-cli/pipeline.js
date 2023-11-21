const { exec } = require('child_process');
const axios = require('axios');
const fs = require('fs');

async function getYouTubeVideoID() {
	const options = {
		method: 'GET',
		url: 'https://youtube138.p.rapidapi.com/search/',
		params: { q: ' Stressed Out Lyrics' },
		headers: {
			'X-RapidAPI-Key': 'ba4e9ba179mshc69623caa396691p186ac5jsn49df3ab96d0d',
			'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
		}
	};

	try {
		const response = await axios.request(options);
		const ID = response.data.contents[0].video.videoId;
		return ID;
	} catch (error) {
		console.error(error);
	}
}

async function downloadYouTubeVideo(videoID) {
	const command = `yt-dlp -x --audio-format mp3 -o 'audio.mp3' https://www.youtube.com/watch?v=${videoID}`;
	await runCommand(command);
}

async function playWAVFile() {
	const command = './bin/portaudio audio.wav';
	await runCommand(command);
}

async function convertMP3toWAV() {
	const command = "ffmpeg -i audio.mp3 audio.wav"
	await runCommand(command);
}

function runCommand(command) {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(error);
			} else {
				resolve(stdout || stderr);
			}
		});
	});
}

async function cleanCacheAudio() {
	const command = `
	if [ -e *.mp3 ]; then
		echo "Deleting .mp3 files..."
		rm *.mp3
	else
        echo "No .mp3 files found. Nothing to delete."
	fi 
    if [ -e *.wav ]; then
		echo "Deleting cached .wav files"
		rm *.wav
    else
    	echo "No .wav files present"
    fi
	`
	await runCommand(command);
}

async function main() {
	try {

		const videoID = await getYouTubeVideoID();
		console.log(`YouTube Video ID: ${videoID}`);

		await cleanCacheAudio();

		await downloadYouTubeVideo(videoID);
		console.log("Audio Processing Done!")

		await convertMP3toWAV();
		console.log("Player Ready!")
		await playWAVFile();
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

main();
