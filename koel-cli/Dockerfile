# importing gcc compiler in env
FROM gcc:latest

# app dir creation
WORKDIR /app

# copy all the files 
COPY . /app

# install portaudio 
RUN apt-get update && apt-get install -y portaudio19-dev

# making executable
RUN gcc -o player portAudio.c -lportaudio

# run executable 
CMD ["./player"]


