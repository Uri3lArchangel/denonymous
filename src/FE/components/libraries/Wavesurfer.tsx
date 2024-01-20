import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { DownloadIcon, Pause } from 'lucide-react';
import { IoMdPlay } from "react-icons/io";
import { FaPause } from "react-icons/fa6";



const convertSecondsToUTC = (a: number) => {
  const d = new Date(a*1000);
  let hours = d.getUTCHours();
  let mins = d.getUTCMinutes();
  let secs = d.getUTCSeconds(); // Fix this line
  return `${hours}:${mins}:${secs}`;
};
const generateGradient=()=>{
  const ctx = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D
const gradient = ctx.createLinearGradient(0, 0, 150, 0)
gradient.addColorStop(0, '#ffdf00')
gradient.addColorStop(0.4, '#f6d108')
gradient.addColorStop(0.64, '#edc211')
gradient.addColorStop(0.77, '#e3b419')
gradient.addColorStop(1, '#daa521')
return gradient
}
const WaveformComponent = ({ audioSrc,index }: { audioSrc: string,index:number }) => {
  const fetcha=async()=>{
    const response = await fetch(audioSrc);
    const blob =await response.blob()
          // Create a download link
          var downloadLink = document.createElement("a");
    
          // Create a Blob URL for the audio file
          var blobUrl = URL.createObjectURL(blob);

          downloadLink.href = blobUrl;
          let s =audioSrc.split(".")
        alert(s[s.length -1])
          downloadLink.download = `denonymous_audio_${(Math.random()*1000).toFixed(0)}.${s[s.length -1]}`;

          document.body.appendChild(downloadLink);

          downloadLink.click();

          document.body.removeChild(downloadLink);
          
          URL.revokeObjectURL(blobUrl);
  }
  const waveformRef = useRef<HTMLDivElement>(null);
  // let wavesurfer =null as WaveSurfer|null;
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration,setDuration]=useState(0)
  const [loading,setLoading]=useState(false)
const [ready,setReadyState]=useState(false)


useEffect(() => {
  const gradient = generateGradient();
  wavesurferRef.current = WaveSurfer.create({
    container: waveformRef.current!,
    backend: 'WebAudio',
    url: audioSrc,
    hideScrollbar: true,
    normalize: true,
    height: 48,
    progressColor: gradient,
    barWidth: 2,
    barGap: 2,
    barHeight: 20,
    barRadius: 10,
    mediaControls: true,
    interact: true,
    dragToSeek: true,
    cursorColor: '#ffdf00',
    cursorWidth: 4,
  });

  wavesurferRef.current.on('ready', () => {
    setLoading(false);
    setReadyState(true);
    setDuration(wavesurferRef.current!.getDuration());
  });

  wavesurferRef.current.on('loading', () => {
    setLoading(true);
  });

  return () => {
    wavesurferRef.current?.destroy();
  };
}, [audioSrc]);

useEffect(() => {
  if (wavesurferRef.current) {
    if (isPlaying) {
      wavesurferRef.current.play();
    } else {
      wavesurferRef.current.pause();
    }
  }
}, [isPlaying]);


  return (
    <div className='my-12'>
    <div className='flex items-center '>
      {ready ? (
        isPlaying ? (
          <FaPause size={24} id='pauseIcon' className='w-[28px] h-[30px] mx-2' onClick={() => {
            setIsPlaying(false)}
          } />
        ) : (
          <IoMdPlay size={40} id='playIcon' className='w-[28px] h-[30px] mx-2' onClick={() => {    
            setIsPlaying(true)}} />
        )
      ) : (
        <></>
      )}
      <div ref={waveformRef} key={index} className={loading ? 'hidden' : 'block w-[90%] bg-transparent'} />
      <div onClick={fetcha}>
        <DownloadIcon className={!ready ? 'hidden' : 'block mx-2 text-[#f6d108]'} size={35} />
      </div>
    </div>
    {loading ? <div className='text-left'>Loading audio....</div> : <></>}
    <small className='mb-12' id={`duration`}>{duration == 0?"":convertSecondsToUTC(duration)}</small>
  </div>
  );
};

export default WaveformComponent;
