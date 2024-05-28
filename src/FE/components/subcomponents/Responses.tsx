"use client";
import { replyModelType } from "@/types";
import Image from "next/image";
import { useSession } from "../hooks/SessionHook";
import dynamic from "next/dynamic";
import React, {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  DownloadIcon,
  Link2Icon,
  XIcon,
} from "lucide-react";
import { FloatButtonComponent } from "@/src/FE/components/libraries/antd";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
let ReplyDenonymsScreen: any;
let WaveformComponent: any;
import { downloadMedia } from "@/src/core/lib/helpers";
import styles from "@/public/styles/styles.module.css";
import { TiCancel } from "react-icons/ti";
import LoadingSkeleton from "../assets/LoadingSkeleton";
import { NotificationContext } from "../contexts/NotificationContext";
import Loading from "@/app/loading";

export default function Responses({
  box,
  r,
  owner,
}: {
  box?: string;
  r: replyModelType[];
  owner: string;
}) {
  const { user, session, fetchUser } = useSession();
  const [pageLoading, setPageLoading] = useState(true);
  const notification = useContext(NotificationContext)!;
  // All states
  const [viewer, setViewerState] = useState<{
    img: {
      link: string;
      mimeType: string;
    }[];
    display: boolean;
  }>({ img: [], display: false });
  const [responses,setResponses]=useState(r)
  const [initialSlide, setInitialSlide] = useState(0);
  const [selectedResponses, setSelectedResponses] = useState<string[]>([]);
  const [reply, setReplyState] = useState(false);
  const [uname, setUname] = useState("");
  const [initialLoadCount, setInitialLoadCount] = useState(5); // Number of responses to load initially
  const subsequentLoadCount = 5; // Number of responses to load subsequently
  const [loading, setLoading] = useState(false); // State to track loading state
  const [scrolledToBottom, setScrolledToBottom] = useState(false); // State to track if user scrolled to bottom
  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight = window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight - 200;
    setScrolledToBottom(scrolledToBottom);
  };
  useEffect(() => {
    setPageLoading(false);
    window.addEventListener("scroll", handleScroll); // Listen for scroll events
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, []);

  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const index = hash.replace("#", "");
      if (!index) return;

      const item = document.getElementById(index) as HTMLLIElement;
      if (item) {
        item.scrollIntoView({
          behavior: "smooth",
          // top:20
        });
      } else if (Number(index) <= responses.length) {
        setInitialLoadCount(Number(index) + 1);
      }
    }

    if (scrolledToBottom && responses.length > initialLoadCount && !loading) {
      setLoading(true);
      setTimeout(() => {
        setInitialLoadCount(initialLoadCount + subsequentLoadCount);
        setLoading(false);
      }, 1000);
    }
  }, [scrolledToBottom, responses, initialLoadCount, loading]);




  // internal functions
  const copyReplyLinkToClipBoard = (
    c: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    c.stopPropagation();
    const id = c.currentTarget.id.replace("icon_", "");
    navigator.clipboard.writeText(`${window.location.href + "#" + id}`);
    notification({ type: "success", message: "link copied", description: "" });
  };

  const replySS = () => {
    ReplyDenonymsScreen = dynamic(
      () => import("@/src/FE/components/subcomponents/ReplyDenonymsScreen")
    );
    setReplyState(true);
  };

  const checkFilters = () => {
    const image = document.getElementById("byImage") as HTMLInputElement;
    const video = document.getElementById("byVideo") as HTMLInputElement;
    const audio = document.getElementById("byAudio") as HTMLInputElement;
    const textOnly = document.getElementById("byTextOnly") as HTMLInputElement;
  
    let filteredResponses: replyModelType[] = [];
  
    if (image.checked) {
      filteredResponses = [
        ...filteredResponses,
        ...r.filter(e => e.media && e.media.some(a => a.mimeType.includes('image')))
      ];
    }
  
    if (video.checked) {
      filteredResponses = [
        ...filteredResponses,
        ...r.filter(e => e.media && e.media.some(a => a.mimeType.includes('video')))
      ];
    }
  
    if (audio.checked) {
      filteredResponses = [
        ...filteredResponses,
        ...r.filter(e => e.media && e.media.some(a => a.mimeType.includes('audio')))
      ];
    }
  
    if (textOnly.checked) {
      filteredResponses = [
        ...filteredResponses,
        ...r.filter(e => e.text && (!e.media || e.media.length === 0))
      ];
    }
  
    // If no filters are checked, show all responses
    if (!image.checked && !video.checked && !audio.checked && !textOnly.checked) {
      filteredResponses = r;
    }
  
    // Remove duplicate responses based on a unique identifier (e.g., key or id)
    const uniqueResponses = Array.from(new Set(filteredResponses.map(a => a.key)))
      .map(key => filteredResponses.find(a => a.key === key)) as replyModelType[];
  
    setResponses(uniqueResponses);
    console.log(uniqueResponses);
  };
  
  
  

  // use effect

  useEffect(() => {
    const url = window.location.pathname;
    setUname(url.split("/")[2]);
    let swiper: Swiper;
    fetchUser();

    if (viewer.display) {
      swiper = new Swiper(".swiper", {
        modules: [Navigation, Pagination],
        direction: "horizontal",
        loop: false,
        initialSlide: initialSlide,
        slidesPerView: 1,
        parallax: true,
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        spaceBetween: 10,
      });
    }

    return () => {
      if (swiper) {
        swiper.destroy();
      }
    };
  }, [initialSlide, viewer]);

  return (
    // style={{filter:viewer.display == true?"brightness(0.4) blur(10px)":"brightness(1) blur(0px)" }}
    <>
      {pageLoading ? <Loading /> : <></>}
      {reply ? (
        <ReplyDenonymsScreen
          box={box}
          setState={setReplyState}
          ids={selectedResponses}
        />
      ) : null}
      <FloatButtonComponent
        replySS={replySS}
        selected={selectedResponses.length}
        className={`${
          selectedResponses.length == 0
            ? "bottom-[-10%] opacity-0 transition-[bottom] duration-[0.4s]"
            : "bottom-[10%] opacity-[1] transition-[bottom] duration-[0.4s]"
        }`}
      />
      {viewer.display ? (
        <XIcon
          className={
            "fixed  text-[#ffdf00] bg-black p-[2px] cursor-pointer  rounded-full right-[2%] top-[10%] z-[8] "
          }
          size={40}
          onClick={() => {
            setViewerState((prev) => {
              return { img: [], display: false };
            });
          }}
        />
      ) : (
        <></>
      )}
      <div
        id="image_viewer"
        className={
          viewer.display
            ? "fixed h-[100vh]   w-full left-0 top-0 z-[7] bg-black overflow-y-hidden "
            : ""
        }
      >
        <div className="swiper relative h-[100%] ">
          <div className="swiper-wrapper absolute">
            {viewer.img.map((e, index) => (
              <div key={index} className="image-container swiper-slide">
                <DownloadIcon
                  size={35}
                  className="absolute top-[10%] left-[5%] text-[#ffdf00] z-[7] cursor-pointer"
                  onClick={() => {
                    downloadMedia(e.link);
                  }}
                />
                {e.mimeType.split("/")[0].toLowerCase() == "image" ? (
                  <Image
                    fetchPriority="low"
                    loading="lazy"
                    src={e.link}
                    alt=""
                    style={{ transition: "all 2s linear" }}
                    width={2048}
                    height={2048}
                    className="centered-image "
                  />
                ) : (
                  <video
                    draggable={false}
                    controls
                    width={2048}
                    className="  centered-video "
                    height={2048}
                  >
                    <source src={e.link} type={e.mimeType} />
                  </video>
                )}
              </div>
            ))}
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-pagination"></div>
        </div>
      </div>

      <section
        id="reply_container_ul"
        className={
          viewer.display
            ? "overflow-hidden rounded-md max-w-[500px] bg-[#1e1e1e] py-12"
            : "bg-[#1e1e1e] py-12"
        }
      >
        <h3 className="text-center text-xl font-extrabold gradient_elements_text">
          All Responses({responses.length})
        </h3>
        {/* filter */}
      {responses.length >0?  <section className=" bg-black my-2 overflow-hidden rounded-md p-4 max-w-[540px] z-[10] mx-auto">
          <h4 className="text-white  text-center md:text-left md:my-2">Filter Responses By</h4>
          <div className="overflow-x-scroll py-4">
          <div className="flex items-center justify-between w-[500px]">
            <div className="flex items-center ">
              <input type="checkbox" id="byImage" className="checkboxFilter mr-2" onChange={checkFilters} />
              <label
                htmlFor="byImage"
                className="cursor-pointer  text-gray-300"
              >
                Image
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="byVideo" className="checkboxFilter mr-2" onChange={checkFilters} />
              <label
                htmlFor="byVideo"
                className="cursor-pointer  text-gray-300"
              >
                Video
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="byAudio" className="checkboxFilter mr-2" onChange={checkFilters} />
              <label
                htmlFor="byAudio"
                className="cursor-pointer  text-gray-300"
              >
                Audio
              </label>
            </div>
             <div className="flex items-center">
              <input type="checkbox" id="byTextOnly" className="checkboxFilter mr-2" onChange={checkFilters}/>
              <label
                htmlFor="byTextOnly"
                className="cursor-pointer  text-gray-300"
              >
                Text Only
              </label>
            </div>
          </div>
          </div>
        </section>:null}
        <ul className={viewer.display ? "overflow-y-hidden" : ""}>
          {responses.slice(0, initialLoadCount).map((e: replyModelType, n) => {
            let l = e.media.filter(
              (f) =>
                f.mimeType.split("/")[0].toLowerCase() == "video" ||
                f.mimeType.split("/")[0].toLowerCase() == "image"
            );
            let a = e.media.filter(
              (f) => f.mimeType.split("/")[0].toLowerCase() == "audio"
            );
            if (!e.visible && user?.email != owner) {
              return (
                <li
                  key={n}
                  id={`${n}`}
                  className={`flex text-gray-400 items-center mt-10 mb-4 py-8 px-4 w-[96%] shadow-hd rounded-[10px] mx-auto bg-[#000] cursor-default`}
                >
                  <TiCancel size={45} />
                  This response was hidden by @{uname}
                </li>
              );
            } else {
              return (
                <li key={n} id={`${n}`}>
                  <div
                    id={`reply_${n}`}
                    onClick={(b) => {
                      if (!session || !user || user.username != uname) {
                        return;
                      }
                      const id = `${b.currentTarget.id}`;
                      let index = selectedResponses.findIndex((n) => n == id);
                      if (index < 0) {
                        if (selectedResponses.length >= 3) return;
                        setSelectedResponses((prev) => [...prev, id]);
                        b.currentTarget.style.backgroundColor = "#555";
                      } else {
                        setSelectedResponses((prev) =>
                          prev.filter((a) => a != id)
                        );
                        b.currentTarget.style.backgroundColor = "#000";
                      }
                    }}
                    className={`mt-10 bg-[#000] mb-4 py-4 px-4 w-[95%] shadow-hd  mx-auto rounded-[10px] ${
                      user ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <div
                      className={` md:w-full md:mx-auto ${
                        l.length >= 4
                          ? "gridMediaDisplay4"
                          : l.length == 3
                          ? "gridMediaDisplay3"
                          : l.length == 2
                          ? "gridMediaDisplay2"
                          : "gridMediaDisplay1"
                      }`}
                    >
                      {l.map((mediaItem, index) => {
                        let mimeType = mediaItem.mimeType
                          .split("/")[0]
                          .toLowerCase();

                        if (index == 3 && e.media.length > 4) {
                          return (
                            <div
                              id={`media_${index}`}
                              className={`w-full media_${index}bg-[#111] opacity-[0.9] rounded-[3px] flex items-center justify-center relative`}
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();

                                if (!viewer.display) {
                                  setInitialSlide(3);
                                  setViewerState({ display: true, img: l });
                                }
                              }}
                            >
                              {mimeType == "image" ? (
                                <Image
                                  src={mediaItem.link}
                                  width={240}
                                  height={240}
                                  fetchPriority="low"
                                  alt=""
                                  className="min-h-[100px] cursor-pointer h-full  "
                                />
                              ) : mimeType == "video" ? (
                                <video>
                                  <source src={mediaItem.link} />
                                </video>
                              ) : null}
                              <p className="absolute text-center text-white text-2xl mx-auto left-0 right-0 top-[40%] z-2 cursor-pointer">
                                +{e.media.length - 4}
                              </p>
                            </div>
                          );
                        }
                        if (index > 3) {
                          return <Fragment key={index}></Fragment>;
                        }
                        if (index <= 3) {
                          return (
                            <div
                              id={`media_${index}`}
                              className={`w-fit media_${index} bg-[#111]  rounded-[3px] flex items-center justify-center transition-transform duration-[0.3s] `}
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!viewer.display) {
                                  setInitialSlide(index);
                                  setViewerState({ display: true, img: l });
                                }
                              }}
                            >
                              {mimeType == "image" ? (
                                <Image
                                  src={mediaItem.link}
                                  width={400}
                                  height={400}
                                  fetchPriority="low"
                                  alt=""
                                  className="block rounded-[3px] cursor-pointer "
                                />
                              ) : mimeType == "video" ? (
                                <video>
                                  <source src={mediaItem.link} />
                                </video>
                              ) : null}
                            </div>
                          );
                        }
                      })}
                    </div>

                    <div className={styles.replyVideoMedia}>
                      {a.map((mediaItem, index) => {
                        WaveformComponent = dynamic(
                          () =>
                            import("@/src/FE/components/libraries/Wavesurfer")
                        );
                        let mimeType = mediaItem.mimeType
                          .split("/")[0]
                          .toLowerCase();
                        if (mimeType == "audio") {
                          return (
                            <div
                              className="audio-player my-4"
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <WaveformComponent
                                index={index}
                                audioSrc={mediaItem.link}
                              />
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                    <p
                      id="text-response"
                      className=" text-white p-4 rounded-md my-2 break-words "
                    >
                      {e.text}
                    </p>

                    <Link2Icon
                      id={`icon_${n}`}
                      className="cursor-pointer gradient_elements_div rounded-full w-[35px] h-[35px] text-black p-[0.3em] mx-auto"
                      onClick={(c) => {
                        copyReplyLinkToClipBoard(c);
                      }}
                    />
                  </div>
                  {user && user.email == owner ? (
                    <small className=" italic text-white/70 text-center block">
                      {" "}
                      ⌃⌃ click on response to select ⌃⌃
                    </small>
                  ) : (
                    <></>
                  )}
                </li>
              );
            }
          })}
        </ul>
        {loading &&
          [1, 2, 3, 4, 5].map((e) => (
            <LoadingSkeleton
              key={e}
              className="w-[95%] h-[130px] opacity-[0.7] my-10 mx-auto"
            />
          ))}
      </section>
    </>
  );
}
