"use client";
import { URLRESOLVE } from "@/src/core/lib/helpers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const DePointsClient = () => {
  const [isOpened, setOpened] = useState(false);
  const [points,setPoints]=useState(0)
  const slideOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.left = "0";
    setOpened(true);
  };
  const slideIn = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.left = "-150px";
    setOpened(false);
  };
  useEffect(() => {
    


    const run = async () => {
      const res = await fetch(URLRESOLVE( "/api/getDePoints"), {
        next: { revalidate: false,tags:['denonymous_box_0102','raieneidmie_00','depoints_tag'] },
      });
      const [d, error] = (await res.json()) as [
        { points: number; auth: boolean },
        string
      ];
      setPoints(d.points)
    };
    run()
  },[]);

  return (
    <div
      onMouseEnter={slideOut}
      onMouseLeave={slideIn}
      className="depoints_display cursor-pointer fixed top-22  backdrop-blur-lg  h-fit py-3 min-w-[190px] bg-black/80 border-[#ffdf00] border-2 rounded-br-lg"
    >
      <div className="flex justify-between items-center  px-2">
        <div className="bg-[#ffdf00] mx-2 w-2 h-2 rounded-full "></div>
        <p className="mx-2 text-xl">{points}</p>{" "}
        <p className="text-[#ffdf00] text-xl">DEPoints</p>{" "}
        <div className=" h-full">
          {isOpened ? (
            <ChevronLeft size={30} className="text-[#ffdf00]" />
          ) : (
            <ChevronRight size={30} className="text-[#ffdf00]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DePointsClient;
