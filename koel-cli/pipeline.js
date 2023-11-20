const { exec } = require('child_process');
const axios = require('axios');
const fs = require('fs');

async function getYouTubeVideoID() {
	const options = {
		method: 'GET',
		url: 'https://youtube138.p.rapidapi.com/search/',
		params: {q: 'Red Bull Symphonic'},
		headers: {
		  'X-RapidAPI-Key': 'ba4e9ba179mshc69623caa396691p186ac5jsn49df3ab96d0d',
		  'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
		}
	  };
	  
	  try {
		  const response = await axios.request(options);
		  const ID=response.data.contents[0].video.videoId;
		  return ID;
		} catch (error) {
		  console.error(error);
	  }
}

async function downloadYouTubeVideo(videoID) {  
  const command = `yt-dlp -x --audio-format -o 'audio.mp3' mp3 https://www.youtube.com/watch?v=${videoID}`;
  await runCommand(command);
}

async function convertMP3toWAV() {
  const command = 'ffmpeg -i audio.mp3 audio.wav';
  await runCommand(command);
}

async function playWAVFile() {
  const command = './bin/portaudio audio.wav';
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

async function main() {
  try {
    
	const videoID = await getYouTubeVideoID();
    console.log(`YouTube Video ID: ${videoID}`);
    await downloadYouTubeVideo(videoID);
    await playWAVFile();

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
