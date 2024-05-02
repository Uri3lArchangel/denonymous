"use client";
import { changeMediaSettingsAction } from "@/src/BE/serverActions/actions";
import React, { useState } from "react";

export function DisableMediaButtons_video({
  status,
  key_,
  owner,
}: {
  status: {
    audio: boolean;
    video: boolean;
    image: boolean;
  } | null;
  key_: string;
  owner: string;
}) {
  const [pending, setPending] = useState(false);
  const changeMediaSettings = async () => {
    setPending(true);
    await changeMediaSettingsAction("video", key_, owner);
    setPending(false);
  };

  return (
    <button disabled={pending} aria-disabled={true}  onClick={changeMediaSettings}>
      {pending?"Please Wait...." :status?.video == true ? "Enable Video Responses" : "Disable Video Responses"}
    </button>
  );
}

export function DisableMediaButtons_audio({
  status,
  key_,
  owner,
}: {
  status: {
    audio: boolean;
    video: boolean;
    image: boolean;
  } | null;
  key_: string;
  owner: string;
}) {
  const [pending, setPending] = useState(false);
  const changeMediaSettings = async () => {
    setPending(true);
    await changeMediaSettingsAction("audio", key_, owner);
    setPending(false);
  };

  return (
    <button disabled={pending} aria-disabled={true} onClick={changeMediaSettings}>
      {pending?"Please Wait...." :status?.audio == true ? "Enable Audio Responses" : "Disable Audio Responses"} 
    </button>
  );
}

export function DisableMediaButtons_image({
  status,
  key_,
  owner,
}: {
  status: {
    audio: boolean;
    video: boolean;
    image: boolean;
  } | null;
  key_: string;
  owner: string;
}) {
  const [pending, setPending] = useState(false);
  const changeMediaSettings = async () => {
    setPending(true);
    await changeMediaSettingsAction("image", key_, owner);
    setPending(false);
  };

  return (
    <button disabled={pending} aria-disabled={true} onClick={changeMediaSettings}>
     {pending?"Please Wait...." :status?.image == true ? "Enable Image Responses" : "Disable Image Responses"} 
    </button>
  );
}
