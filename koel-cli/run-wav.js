const fs = require('fs');
const { exec } = require('child_process');

async function playWAVFile() {
    const command = './bin/portaudio audio.wav';
    await runCommand(command);
}

function runCommand(command) {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(error);
        } else {
          console.log(stdout || stderr);
        }
    });
}

playWAVFile()
