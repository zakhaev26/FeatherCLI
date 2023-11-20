#!/bin/bash
YT_LINK=$1
yt-dlp -x --audio-format mp3 $YT_LINK
