declare module 'web-audio-analyser' {
    interface AnalyserOptions {
      stereo?: boolean;
    }
  
    interface Analyser {
      data: Uint8Array;
      getFrequencyData(): Uint8Array;
      destroy(): void;
    }
  
    class WebAudioAnalyser {
      constructor(audioContext: AudioContext, audioElement: HTMLAudioElement, options?: AnalyserOptions);
      destroy(): void;
      getFrequencyData(): Uint8Array;
    }
  
    export = WebAudioAnalyser;
  }
  

  declare module 'react-video-thumbnail';
  