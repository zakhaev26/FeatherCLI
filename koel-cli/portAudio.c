#include <stdio.h>
#include <stdlib.h>
#include <portaudio.h>

#define SAMPLE_RATE 100000
#define FRAMES_PER_BUFFER 899

typedef struct {
    const char* filename;
    FILE* file;
} paData;

static int audioCallback(const void* inputBuffer, void* outputBuffer,
                          unsigned long framesPerBuffer,
                          const PaStreamCallbackTimeInfo* timeInfo,
                          PaStreamCallbackFlags statusFlags,
                          void* userData) {
    paData* data = (paData*)userData;
    (void)inputBuffer;

    size_t bytesRead = fread(outputBuffer, sizeof(short), framesPerBuffer, data->file);

    if (bytesRead < framesPerBuffer) {
        fseek(data->file, 0, SEEK_SET);
        fread(outputBuffer + bytesRead, sizeof(short), framesPerBuffer - bytesRead, data->file);
    }

    return paContinue;
}

int main(int argc, char* argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <path/to/wav/file>\n", argv[0]);
        return 1;
    }

    PaError err = Pa_Initialize();
    if (err != 0) {
        fprintf(stderr, "PortAudio initialization failed: %s\n", Pa_GetErrorText(err));
        return 1;
    }

    paData data;
    data.filename = argv[1];
    data.file = fopen(data.filename, "rb");

    if (!data.file) {
        fprintf(stderr, "Failed to open WAV file: %s\n", data.filename);
        Pa_Terminate();
        return 1;
    }

    PaStream* stream;
    err = Pa_OpenDefaultStream(&stream, 0, 1, paInt16, SAMPLE_RATE, FRAMES_PER_BUFFER, audioCallback, &data);

    if (err != paNoError) {
        fprintf(stderr, "Failed to open stream: %s\n", Pa_GetErrorText(err));
        fclose(data.file);
        Pa_Terminate();
        return 1;
    }

    err = Pa_StartStream(stream);

    if (err != paNoError) {
        fprintf(stderr, "Failed to start stream: %s\n", Pa_GetErrorText(err));
        Pa_CloseStream(stream);
        fclose(data.file);
        Pa_Terminate();
        return 1;
    }

    printf("Press Enter to quit...\n");
    getchar();

    err = Pa_StopStream(stream);
    if (err != paNoError) {
        fprintf(stderr, "Failed to stop stream: %s\n", Pa_GetErrorText(err));
    }

    err = Pa_CloseStream(stream);
    if (err != paNoError) {
        fprintf(stderr, "Failed to close stream: %s\n", Pa_GetErrorText(err));
    }

    fclose(data.file);
    Pa_Terminate();

    return 0;
}
