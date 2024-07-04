"use client";

import md5 from 'md5';

import { Formats } from "@/src/core/lib/acceptableFilesFormats";
import {
  CheckCircleIcon,
  FileIcon,
  LucideFileWarning,
  PauseCircle,
  PlayCircle,
  PlayIcon,
  Trash2Icon,
  UploadCloudIcon,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { twMerge } from "tailwind-merge";

const variants = {
  base: "relative rounded-md p-4 w-96 max-w-[calc(100vw-1rem)] flex justify-center items-center flex-col cursor-pointer border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out",
  active: "border-2",
  disabled:
    "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700 dark:border-gray-600",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

export type FileState = {
  file: File;
  key: string; // used to identify the file in the progress callback
  progress: "PENDING" | "COMPLETE" | "ERROR" | number;
};

type InputProps = {
  className?: string;
  value?: FileState[];
  onChange?: (files: FileState[]) => void | Promise<void>;
  onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
  id?:string,
  setGeneralFileStateAction:React.Dispatch<React.SetStateAction<FileState[]>>
  generalFileStateAction:FileState[]
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `File(s) too large. Max total size is ${maxSize} MB.`;
  },
  fileInvalidType() {
    setTimeout(()=>{
      document.getElementById("error_container")!.innerHTML=""
    },2000)

    return "Invalid file type.";
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return "The file type is not supported, Only provide video, audio and images.";
  },
};



const MultiFileDropzone = React.forwardRef<HTMLInputElement, InputProps>(({ dropzoneOptions, value, className, disabled, onFilesAdded, onChange, id,generalFileStateAction, setGeneralFileStateAction },ref) => {
    const [customError, setCustomError] = React.useState<string>();
        if (dropzoneOptions?.maxFiles && value?.length) {
      disabled = disabled ?? value.length >= dropzoneOptions.maxFiles;
    }
    const [key,setK]=React.useState(0)
    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      disabled,
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles;
        setCustomError(undefined);
        if (
          dropzoneOptions?.maxFiles &&
          (value?.length ?? 0) + files.length > dropzoneOptions.maxFiles
        ) {
          setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
          setTimeout(()=>{
            setCustomError("")
          },2000)
          return;
        }
      if(value){
        const unsupportedFile = files.reduce((unsupported, fileState) => {
          if (!Formats.includes(fileState.type)) {
            return true; // Set unsupported to true if unsupported file type is found
          }
          return unsupported;
        }, false);
        
        if (unsupportedFile) {
          setCustomError(ERROR_MESSAGES.fileNotSupported());
          setTimeout(()=>{
            setCustomError("")
          },2000)
          return;
        }
  const totalSize = value.reduce((acc, fileState) => acc + fileState.file.size, 0);
  const newSize = files.reduce((acc, file) => acc + file.size, 0);
  const ByteToMB = 1048576;
  const maxSize = 60;
   
  if ((totalSize + newSize) / ByteToMB > maxSize) {
    setCustomError(ERROR_MESSAGES.fileTooLarge(maxSize));
    return;
  }


}


        if (files) {
          setK(prev=>prev+1)
          const addedFiles = files.map<FileState>((file) => ({
            file,
            key: md5(file.name+`${Date.now()}`), 
            progress: "PENDING",
          }));
          void onFilesAdded?.(addedFiles);
          void onChange?.([...(value ?? []), ...addedFiles]);
          
        }
      },
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className
        ).trim(),
      [
        isFocused,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ]
    );

    // error validation messages
    let errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === "file-too-large") {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === "file-invalid-type") {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === "too-many-files") {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);


    
React.useEffect(()=>{
},[generalFileStateAction,value,key])





    return (
      <div>
        <div className="flex flex-col w-full ">
          <div>
            {/* Main File Input */}
            <div
              {...getRootProps({
                className: dropZoneClassName,
              })}
            >
              <input ref={ref} {...getInputProps()} id={id} key={key}/>
              <div className="flex flex-col items-center justify-center text-xs text-gray-400 ">
                <UploadCloudIcon className="mb-1 h-7 w-7" />
                <div className="text-gray-400">
                  drag & drop or click to upload
                </div>
              </div>
            </div>

            {/* Error Text */}
            <div className="mt-1 text-xs text-red-500 text-center" id="error_container">
              {customError ?? errorMessage}
            </div>
          </div>

          {/* Selected Files */}
          {value?.map(({ file, progress }, i) =>{
            let media = file.type.split("/")[0]
            return (
            <div
              key={i}
              className="flex h-[100px] flex-col justify-center rounded border border-gray-600 my-4 w-full py-2 "
            >
              <div className="flex items-center gap-2 h-full text-gray-500 dark:text-white text-ellipsis ">
{media == 'image'?<Image src={URL.createObjectURL(file)} alt={file.name} width={90} height={90} className="h-full" />:media == 'video'?<video width={90} height={90} className="h-full" loop autoPlay muted>
  <source src={URL.createObjectURL(file)}    />
</video>
:
<label >{

<>
<PauseCircle size={30} id={`audio_prev_${i}_pa`} style={{display:"none"}} className="text-[#ffdf00]" onClick={
  (e:React.MouseEvent<SVGSVGElement, MouseEvent>)=>{
    let a = document.querySelector("#"+(e.currentTarget.id).replace("_pa","_au")) as HTMLAudioElement;
        a.pause()
        let pl = document.querySelector("#"+(e.currentTarget.id).replace("_pa","_pl")) as HTMLDivElement;
        pl.style.display="block"
    e.currentTarget.style.display="none"

  }
} />
<PlayCircle id={`audio_prev_${i}_pl`}  onClick={
  (e:React.MouseEvent<SVGSVGElement, MouseEvent>)=>{
    let a = document.querySelector("#"+(e.currentTarget.id).replace("_pl","_au")) as HTMLAudioElement;

    a.play()
    let p = document.querySelector("#"+(e.currentTarget.id).replace("_pl","_pa")) as HTMLDivElement;
    p.style.display="block"
    e.currentTarget.style.display="none"
  }
  } size={30} className="text-[#ffdf00]" />
  </>
  }<audio className={`prev_audio`} id={`audio_prev_${i}_au`} ><source  src={URL.createObjectURL(file)} type={file.type}/></audio></label>

  }                {/* <FileIcon size="30" className="shrink-0" /> */}
                <div className="text-sm  overflow-hidden " >
                  <div className="overflow-hidden overflow-ellipsis  whitespace-nowrap ">
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </div>
                </div>
                <div className="grow" />
                <div className="flex w-12 justify-end text-xs">
                  {progress === "PENDING" ? (
                    <button
                        id={String(i)}
                      className="rounded-md p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={(e) => {
                        e.preventDefault()
                       let id =e.currentTarget.id
                          // Remove the file from the state
    const updatedFiles = value.filter((_, index) => index !== Number(id));
    setGeneralFileStateAction(updatedFiles);

    // Set the state to
                        void onChange?.(
                          value.filter((_, index) => index !== i)
                        );
                      }}
                    >
                      <Trash2Icon className="shrink-0" />
                    </button>
                  ) : progress === "ERROR" ? (
                    <LucideFileWarning className="shrink-0 text-red-600 dark:text-red-400" />
                  ) : progress !== "COMPLETE" ? (
                    <div>{Math.round(progress)}%</div>
                  ) : (
                    <CheckCircleIcon className="shrink-0 text-green-600 dark:text-gray-400" />
                  )}
                </div>
              </div>
              {/* Progress Bar */}
              {typeof progress === "number" && (
                <div className="relative h-0">
                  <div className="absolute top-1 h-1 w-full overflow-clip rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full bg-gray-400 transition-all duration-300 ease-in-out dark:bg-white"
                      style={{
                        width: progress ? `${progress}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )})}
        </div>
      </div>
    );
  }
);
MultiFileDropzone.displayName = "MultiFileDropzone";

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return "0 Bytes";
  }
  bytes = Number(bytes);
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export { MultiFileDropzone };
