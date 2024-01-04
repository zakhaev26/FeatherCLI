<center>

![FeatherCLI](./assets/logo.png)
<br/>
<br/>
<h3>Our Submission for MLH Monthlong Hackathon.</h3>
</center>

## Inspiration

Our inspiration for this project draws from various sources – our daily interactions with CLI tools, a *DEEP* appreciation for their utility, and a desire to create something that developers can incorporate into their comfort zone: the Terminal :D. The journey began when we stumbled upon "TyperacerCLI" ([https://github.com/p-society/TyperacerCLI](https://github.com/p-society/typeracer-cli/)), a community project crafted by our former university seniors during their college days. Intrigued by the idea of such tools, we made this project as a learning experience, eager to contribute our own take on enhancing the CLI tools.

## What it does

- KoelCLI: Enjoy music right from the terminal with KoelCLI. Simply type the song's name, and let the music play – a hassle-free way to integrate music into your coding sessions.

[![Watch the video](https://img.youtube.com/vi/0TwvaOjp4gs/0.jpg)](https://www.youtube.com/watch?v=0TwvaOjp4gs)

- HawkCLI: HawkCLI is your go-to CLI for touch typing from the terminal. Inspired by the above mentioned project, it brings a touch typing experience to your command line with features like WPM Measurement,etc.
Working Demo : 

[![Watch the video](https://img.youtube.com/vi/zEWDtVMtaLQ/0.jpg)](https://www.youtube.com/watch?v=zEWDtVMtaLQ)


- KiwiCLI: Kiwi crawls websites, presenting all the links in a neat JSON format for your convenience.
Working Demo :

[![Watch the video](https://img.youtube.com/vi/LPypxhC4BCE/0.jpg)](https://www.youtube.com/watch?v=LPypxhC4BCE)

# How we built it

## KoelCLI
We utilized an API for fetching the YouTube video ID of the requested song through web scraping. This ID served as input for YT-DLP, helping us to obtain the corresponding MP3 file. To enhance sound quality, reduce lossy compressions, and decrease network usage by 75-90%, we employed ffmpeg to convert the MP3 file to WAV format.

This WAV File was then fed to the Portaudio-based C Engine and played the music. This multi-step process ensured an optimal audio experience for users interacting with KoelCLI.

The implementation of KoelCLI was accomplished using Node.js. The CLI uses child processes for each command,this modular and efficient approach contributes to the overall functionality and user experience of KoelCLI.

### Installation in Debian Based command line

```bash 

# CURRENTLY STABLE IN DEB/WSL Environments ONLY!
# Make sure to have C Compiler and Node Runtime.


# Clone the repo
git clone https://github.com/zakhaev26/FeatherCLI.git

# Change directory to koel
cd koel-cli

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


# Installation on Arch Based command line (worked for one machine)

```bash
# CURRENTLY STABLE IN DEB/WSL Environments ONLY!
# Make sure to have C Compiler and Node Runtime.


# Clone the repo
git clone https://github.com/zakhaev26/FeatherCLI.git

# Change directory to koel-cli
cd koel-cli

# Install PortAudio
sudo pacman -S portaudio

# Compile portaudio.c to make the binary executable on your machine
gcc portaudio.c -o bin/portaudio -lrt -lasound -ljack -lpthread -lportaudio

# Install yt-dlp
pip install yt-dlp

# Install ffmpeg
sudo pacman -S ffmpeg

# Install Node Dependencies
npm install

# Install necessary alsa libraries (using yay or another AUR helper if needed):
  alsa-lib
  alsa-tools
  alsa-utils
this part is too big to instruct, i'm guessing you can do since you're an arch user ;)

# Edit the ALSA configuration file (can mess up your audio drivers, can't confirm; If that happens, just reinstall alsa libs by sudo pacman -S command):
  sudo nano /usr/share/alsa/alsa.conf
Change the values of default.ctl and default.pcm on lines 105 and 106 to your sound card's ID.
Comment out lines 352, 353, and 354 by adding a "#" character before 'p'.
Write the changes and save.

# Navigate to Koel-CLI directory and use!
```
### Usage 

> To play a song, simply run:
node koel.js <song_name>

eg : 
```bash
    node koel.js One Dance - Drake
```

And enjoy the Music!

## KiwiCLI : 
The tool recurrsively crawls webpages untill it exhausts all URLs with the same domain name. The aim is to turn it into a complete web scraping, monitoring and crawling tool as it evolves in the future

It checks for two cases while recurring crawling : 
- If the hostname of site to be crawled is the same as the base URL
- If the URL has already been visited

### Installation

```bash

# Clone the repo
git clone https://github.com/zakhaev26/FeatherCLI.git

# Change directory to kiwi
cd kiwi-cli

# Install dependencies
npm i

# Install the tool globally to run from anywhere
npm install -g

# Run using the command. Use mode as crawl
kiwi [mode] [URL]

```

## HawkCLI :

HawkCLI is like a Typeracer game for your command line. It uses InkJS to make things look nice and runs on Node.js, which makes it work well. The cool part is that it can calculate how fast you type even without the internet. So, you can enjoy a fun typing challenge right from your command line without needing to be online.Currently it supports Offline Version.

### Installation on Debian Based command Line

```bash
# Clone the repo
git clone https://github.com/zakhaev26/FeatherCLI.git

# Change directory to hawk
cd hawk-cli

# Install dependencies
npm i

# Make the build 
npm install

# Change directory to dist
cd dist

# Run using the command.
node hawk-cli.js.
```

## Challenges we ran into

Environment challenges posed significant hurdles during the development of our CLI tool. Notably, differences in the behavior of C binaries on Windows and certain NPM libraries breaking in Linux proved to be BIG obstacles. This discrepancy made it challenging for our team members to ensure the cross platform functioning of the CLI tools.

The installation of libraries presented a particular hardship on Windows compared to Linux, resulting in KoelJS being more stable in WSL/Debian environments. However, we are actively working to achieve cross-platform compatibility, aiming to provide a consistent experience for users regardless of their operating system.

Beyond these technical challenges,Developing a CLI tool involves more than just writing good code; it demands an understanding of the intricacies unique to command line interfaces. Despite these challenges , we feel good about the MVP progress thus far. (We made it in just a week,skipping college classes and our Exams are from next week XD)

## Accomplishments that we're proud of
-By using FFMPEG to convert MP3 to WAV in Host OS instead of downloading the whole WAV file over network, We reduced network usage by 75-90%.
- Developing a music player engine in C was a notable achievement, emphasizing speed and efficiency. This accomplishment underscores our commitment to creating a powerful and responsive music-playing experience within the terminal.

- Our WebCrawler is capable of crawling ENTIRE webpages. This functionality is immensely useful for developers and users seeking a overview of the links present on a website, enhancing the efficiency of web-related tasks.

- Implementing Touch Typing in the terminal was a challenging feat,but we made it possible. This accomplishment showcases our dedication to pushing the boundaries of what's achievable in the terminal environment, providing users with an engaging and skill-enhancing typing experience.

- One of our most cherished accomplishments is being able to implement something inspired by our seniors. It's a humbling experience that fills us with pride. Building on the foundation they laid with the TyperacerCLI project has been a tribute to their work. 

- Doing this all in 1 Week coz smh we got to know about the hackathon very late :):

## What we learned
- Making a Audio Engine in C.We could have used something like JS as it's ecosystem provides a HUGE Abstraction and makes things work.But we wanted to build something and know it internally.C and portaudio,SDL helped us make it.Even if not 100%,We had a great time learning about linkers,libs in C and much more.
- Internals behind making a good CLI Tools.
- Bash Scripting
- NodeJS Child Processes.
- Some more NPM Libraries :p

## What's next for FeatherCLI

Looking ahead,The introduction of new CLI tools and enhancements to existing ones are some of our plans in our leisure time : 

### New CLI Tools:

- FalconCLI: A tool for file upload and retrieval from Cloud Provider Storages such as AWS S3 and Azure Blob Storage.

- RavenCLI: Envisioned as a WhatsApp-like chatting system as a service, RavenCLI aims to bring convenient communication within the terminal.

### Enhancements to Current CLI Tools: 

- HawkCLI Online Mode: We plan to introduce an online mode for HawkCLI, expanding its functionality and providing users with more options for typeracing with peers.

- Kiwi as a Service: Kiwi will undergo a transformation into a web tool, web scraping, monitoring, logging, and crawling functionalities to meet evolving needs.
    
- KoelJS Audio Control: Enhancements to KoelJS will focus on providing users with extensive control over audio playback, including features like rewind and pause.We aim to implement local music sharing between peers via local network streaming and explore cloud streaming options to minimize time delays. The goal is to create a faster and more efficient video ID scraper for an enhanced user experience.
