export interface AudioData {
    status: 'processing' | 'done';
    audio_data?: number[];
    sample_rate?: number;
}

export type AudioChunk = {
    data: Float32Array;
    sampleRate: number;
};