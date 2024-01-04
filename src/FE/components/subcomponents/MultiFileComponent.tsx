'use client';

import {
  MultiFileDropzone,
  type FileState,
} from './MultiFileDropzone';
import { useEdgeStore } from '../../../core/lib/edgestore';
import { useEffect, useState } from 'react';

export function MultiFileDropzoneUsage() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [key,setKey]=useState(0)
  const { edgestore } = useEdgeStore();


  
  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  // useEffect(()=>{
  //   console.log(fileStates)

  // },[fileStates])

  return (
    <div>
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          
          setFileStates(files);

        }}
        onFilesAdded={
          
          async (addedFiles) => {
          setFileStates(prev=>([...prev, ...addedFiles]));
          }

        }
      />
      <button onClick={async (e) => {
        e.preventDefault()
          await Promise.all(
            fileStates.map(async (addedFileState:any) => {
              try {
                const res = await edgestore.denonymousMedia.upload({
                  file: addedFileState.file,
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });
                console.log(res);
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }} className='bg-green-500'>upload</button>
    </div>
  );
}