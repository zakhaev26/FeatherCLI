#include<stdio.h>
#include<stdlib.h>
#include<portaudio.h>

typedef struct Data {
    const char* filename;
    FILE* file;
}paData;


int main(int argc , char* argv[]) {

    
    if(argc != 2) {
        printf("Argument count is less than 2.F*ck Off");
        exit(-1);
    }

    PaError error = Pa_Initialize();
    if(error != 0) {
        printf("Initializing Failed for PortAudio.\n");
        exit(-1);
    }

    paData data;
    
    return 0;
}