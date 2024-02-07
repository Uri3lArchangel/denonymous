"use client";
import { denonymousType, replyModelType } from "@/types";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { MdCancel } from "react-icons/md";
import { MultiFileDropzoneUsage } from "./MultiFileComponent";
import style from "../../../../styles/styles.module.css";
import { Share2Icon } from "lucide-react";
import ModalComponent from "../libraries/antd";
import { CiLink } from "react-icons/ci";
import { render } from "react-dom";
import * as htmlImages from "html-to-image";
import Link from "next/link";
import { createDenonyous } from "@/src/BE/serverActions/actions";
import styles from "../../../../styles/styles.module.css";

function VideoElement({ src, mimeType }: { src: string; mimeType: string }) {
  return (
    <video controls width={300} className=" object-cover h-[90%]" height={300}>
      <source src={src} type={mimeType} />
    </video>
  );
}

function AudioElement({ src, mimeType }: { src: string; mimeType: string }) {
  return (
    <audio controls>
      <source src={src} type={mimeType} />
    </audio>
  );
}

function ImageElement({ src }: { src: string }) {
  return <Image src={src} alt="" width={300} height={300} />;
}

export function Replys({ replys }: { replys: replyModelType[] }) {
  const ss = async () => {
    let node = document.getElementById("content") as HTMLDivElement;
    let data = await htmlImages.toJpeg(node);
    console.log(data);
    setImage(data);
  };
  const copyReplyLinkToClipBoard = (a: string) => {
    navigator.clipboard.writeText(a);
  };

  const [shareState, setShareState] = useState(false);
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState("");
  return (
    <ul>
      {/* <div id="content" className="text-white text-2xl">hellooooooo</div>
      <Image src={image} alt="" width={500} height={500}/>
      <div onClick={()=>{
        let link =document.createElement("a") as HTMLAnchorElement;
        link.href=image;
        link.download = `image.png`
        link.click()

      }}>Download image</div>
      <button onClick={ss} className="bg-red-500">take ss</button> */}
      {replys.map((e, n) => (
        <li id={`${n}`} key={n} className="py-20">
          anonymous user:
          <div className="">
            {e.media.map((mediaItem, index) => {
              let mimeType = mediaItem.mimeType.split("/")[0].toLowerCase();
              if (mimeType === "image") {
                return (
                  <div className="" key={index}>
                    <ImageElement src={mediaItem.link} />
                  </div>
                );
              }
            })}
          </div>
          <div className={style.replyVideoMedia}>
            {e.media.map((mediaItem, index) => {
              let mimeType = mediaItem.mimeType.split("/")[0].toLowerCase();
              if (mimeType === "video") {
                return (
                  <div className="" key={index}>
                    <VideoElement
                      src={mediaItem.link}
                      mimeType={mediaItem.mimeType}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className={style.replyVideoMedia}>
            {e.media.map((mediaItem, index) => {
              let mimeType = mediaItem.mimeType.split("/")[0].toLowerCase();
              if (mimeType === "audio") {
                return (
                  <div className="" key={index}>
                    <AudioElement
                      src={mediaItem.link}
                      mimeType={mediaItem.mimeType}
                    />
                  </div>
                );
              }
            })}
          </div>
          <p>{e.text}</p>
          <ModalComponent
            setState={setShareState}
            state={shareState}
            title="share response"
          >
            <div
              className="flex cursor-pointer"
              onClick={() => {
                copyReplyLinkToClipBoard(
                  window.location.origin +
                    window.location.pathname +
                    `#${index}`
                );
                setShareState(false);
              }}
            >
              <CiLink size={30} />
            </div>
          </ModalComponent>
          <Share2Icon
            className="cursor-pointer"
            onClick={() => {
              setIndex(n);
              setShareState(true);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
export const CreateDenonymousClient = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div
        onClick={handleModalOpen}
        style={{ cursor: "pointer" }}
        className="flex items-center justify-center flex-col"
      >
        <svg
          width="76"
          height="68"
          viewBox="0 0 76 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M69.0909 35.1594C65.4005 33.8728 61.4153 33.6413 57.5967 34.4915C53.7782 35.3418 50.2823 37.2391 47.514 39.9637C44.7456 42.6884 42.8178 46.129 41.954 49.8873C41.0901 53.6456 41.3253 57.5679 42.6325 61.2H3.45455C2.53834 61.2 1.65967 60.8418 1.01181 60.2042C0.36396 59.5665 0 58.7017 0 57.8V3.4C0 2.49826 0.36396 1.63346 1.01181 0.995837C1.65967 0.358213 2.53834 0 3.45455 0H65.6364C66.5526 0 67.4313 0.358213 68.0791 0.995837C68.727 1.63346 69.0909 2.49826 69.0909 3.4V35.1594ZM34.7527 29.5222L12.6022 11.0092L8.12855 16.1908L34.7976 38.4778L60.9865 16.1738L56.468 11.0296L34.7527 29.5222ZM65.6364 51H76V57.8H65.6364V68H58.7273V57.8H48.3636V51H58.7273V40.8H65.6364V51Z"
            fill="url(#paint0_linear_169_1289)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_169_1289"
              x1="76"
              y1="34.0725"
              x2="-4.16699e-07"
              y2="34.0725"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFDF00" />
              <stop offset="0.276042" stop-color="#F6D108" />
              <stop offset="0.541667" stop-color="#EDC211" />
              <stop offset="0.776042" stop-color="#E3B419" />
              <stop offset="1" stop-color="#DAA521" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <h1 className={styles.gradientHeader + " mt-7 text-xl text-center"}>
        Create a Denonymous
      </h1>
      {isOpen && (
        <>
          <section className={`${styles.modal} h-full w-full`}>
            <div
              className={`${styles.modalContent} relative bg-[#242222] p-5 w-5/6 sm:w-[500px] h-[500px] mx-auto my-auto p-5`}
            >
              <h1
                className={
                  "text-center font-bold text-xl pb-3 " + styles.gradientHeader
                }
              >
                Create a Denonymous
              </h1>

              <input
                placeholder="Enter denonymous title"
                name="topic"
                className="border-2 border-[#404040] p-2 mb-3 w-full rounded-md bg-transparent focus:outline-none placeholder-[#404040] placeholder:text-sm"
              />
              <textarea
                name="description"
                id=""
                cols={30}
                className="border-2 block border-[#404040] p-2 mb-3 w-full rounded-md bg-transparent focus:outline-none placeholder-[#404040] placeholder:text-sm"
                rows={10}
                placeholder="Description(Optional)"
              ></textarea>
              <button
                className={
                  "border-2  text-base text-black font-bold p-2 my-12 border-[#EDC211] rounded mb-3 block w-[100%] mx-auto sm:w-[200px] " +
                  styles.signInBtn
                }
                type="submit"
                onClick={handleModalClose}
              >
                Submit
              </button>
              <button
                onClick={handleModalClose}
                className="absolute top-0 right-0 p-4 text-[#404040] text-2xl"
              >
                &times;
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
