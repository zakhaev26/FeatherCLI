# Koel CLI

Koel is a command-line interface (CLI) tool designed for those who prefer a terminal-based music player experience.

> It currently provides stable functionality in Debian/Ubuntu environments, having been thoroughly tested in these platforms. Please note that it is not yet stable on Windows and other platforms, but active development is underway to broaden its compatibility.

# Features

- Utilizes a powerful C engine under the hood to play .wav files, leveraging the PortAudio standard library.

- Integrates with yt-dlp to fetch song information from YouTube using the ID returned by the YouTube API.

- Converts downloaded MP3 files to .wav format through ffmpeg conversion.
- Uses Node child processes to seamlessly spin up an instance of the executable,   providing a smooth music playback experience.

# Installation 

```bash 

# Make sure to have C Compiler and Node Runtime.

# Install PortAudio
sudo apt-get install portaudio19-dev

# Navigate to FeatherCLI/koel-cli and compile portaudio.c to make the Binary executable on your machine :

# NOTE! : Don't change the name of the binary file,dont change to destination of the executable and make sure to link portaudio.
gcc portaudio.c -o bin/portaudio -lportaudio

# After this, the executable should be ready at bin/portaudio.

# Install yt-dlp
pip install yt-dlp

# Install ffmpeg
sudo apt-get install ffmpeg

# Install Node Dependencies:
npm install
```

# Usage 

> To play a song, simply run:
node koel.js <song_name>

eg : 
```bash
    node koel.js One Dance - Drake
```

And enjoy the Music!