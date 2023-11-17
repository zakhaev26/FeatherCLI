#include <SDL2/SDL.h>
#include <stdio.h>

void audioCallback(void *userdata, Uint8 *stream, int len) {
    if (len > 0) {
        SDL_memset(stream, 0, len); // Clear the audio buffer
        SDL_MixAudio(stream, userdata, len, SDL_MIX_MAXVOLUME); // Mix audio data
    }
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        return 1;
    }

    if (SDL_Init(SDL_INIT_AUDIO) < 0) {
        fprintf(stderr, "SDL initialization failed: %s\n", SDL_GetError());
        return 1;
    }

    SDL_AudioSpec wavSpec;
    Uint32 wavLength;
    Uint8 *wavBuffer;

    if (SDL_LoadWAV(argv[1], &wavSpec, &wavBuffer, &wavLength) == NULL) {
        fprintf(stderr, "Fail Loading %s\n", SDL_GetError());
        SDL_Quit();
        return 1;
    }

    wavSpec.callback = audioCallback;
    wavSpec.userdata = wavBuffer;

    if (SDL_OpenAudio(&wavSpec, NULL) < 0) {
        fprintf(stderr, "Unable to open audio", SDL_GetError());
        SDL_FreeWAV(wavBuffer);
        SDL_Quit();
        return 1;
    }

    SDL_PauseAudio(0);

    while (SDL_GetAudioStatus() == SDL_AUDIO_PLAYING) {
        SDL_Delay(100);
    }

    SDL_CloseAudio();
    SDL_FreeWAV(wavBuffer);
    SDL_Quit();

    return 0;
}
