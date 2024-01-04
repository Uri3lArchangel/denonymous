'use client'
import { replyModelType } from "@/types";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { MdCancel } from "react-icons/md";
import { MultiFileDropzoneUsage } from "./MultiFileComponent";

export function Reply_Form() {

  return (
  <></>
  );
}

export function Replys({ replys }: { replys: replyModelType[] }) {
  return (
    <ul>
      {replys.map((e, n) => (
        <li key={n}>
          anonymous user:
          {e.imageAvailable ? (
            e.images.map((f, m) => <Image key={m} alt="img" src={f} />)
          ) : (
            <></>
          )}
          {e.videoAvailable ? (
            e.videos.map((f, m) => (
              <video controls>
                <source src={f.link} type={f.mimeType} />
              </video>
            ))
          ) : (
            <></>
          )}
          {e.audioAvailable ? (
            e.audios.map((f, m) => (
              <audio controls>
                <source src={f.link} type={f.mimeType} />
              </audio>
            ))
          ) : (
            <></>
          )}
          <p>{e.text}</p>
        </li>
      ))}
    </ul>
  );
}
