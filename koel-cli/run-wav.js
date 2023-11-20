const fs = require('fs');
const { exec } = require('child_process');

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

playWAVFile()