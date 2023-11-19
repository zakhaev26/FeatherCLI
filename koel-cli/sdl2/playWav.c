#include <stdio.h>
#include <SDL2/SDL.h>

int main() {
   
    if (SDL_Init(SDL_INIT_AUDIO) != 0) {
        fprintf(stderr, "Error initializing SDL: %s\n", SDL_GetError());
        return 1;
    }

   
    const char *wavFile = "output.wav";
    SDL_AudioSpec wavSpec;
    Uint32 wavLength;
    Uint8 *wavBuffer;

    if (SDL_LoadWAV(wavFile, &wavSpec, &wavBuffer, &wavLength) == NULL) {
        fprintf(stderr, "Error loading WAV file: %s\n", SDL_GetError());
        SDL_Quit();
        return 1;
    }

    
    SDL_AudioDeviceID audioDevice;
    if (SDL_OpenAudioDevice(NULL, 0, &wavSpec, NULL, 0) != 0) {
        fprintf(stderr, "Error opening audio device: %s\n", SDL_GetError());
        SDL_FreeWAV(wavBuffer);
        SDL_Quit();
        return 1;
    }

   
    SDL_QueueAudio(audioDevice, wavBuffer, wavLength);
    SDL_PauseAudioDevice(audioDevice, 0);  

   
    SDL_Delay((wavLength / wavSpec.channels) / wavSpec.freq * 1000);

    
    SDL_CloseAudioDevice(audioDevice);
    SDL_FreeWAV(wavBuffer);
    SDL_Quit();

    return 0;
}
