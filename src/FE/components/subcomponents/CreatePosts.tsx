"use client";
let ShareDenonymsModal: any = null;
let DeleteDenonymsModal: any = null;
let ActivateDenonyms: any = null;
let ChangeDenonymousResponseVisibility: any = null;
import dynamic from "next/dynamic";
import { denonymousType } from "@/types";
import Link from "next/link";
import styles from "@/public/styles/styles.module.css";
import React, { useContext, useState } from "react";
import { Share2Icon, Trash2Icon } from "lucide-react";
import { TooltipApp } from "../libraries/antd";
import { NotificationContext } from "../contexts/NotificationContext";
import ResponsesSVG from "../assets/ResponsesSVG";
import { changeResponsesVisibilityActiion } from "@/src/BE/serverActions/actions";
import DenonymousDropdown from "../libraries/dropdowns/DenonymousDropdown";
import Loading from "@/app/loading";

const MyDenonyms = ({ denonyms }: { denonyms: denonymousType[] | [] }) => {
  const [modal, setModal] = useState(false);
  const [key_, setKey] = useState<string>("");
  const [keyVisibility, setKeyVisibility] = useState<string>("");
  const [pending, setPending] = useState(false);
  const [deleteDenonymousModal, setDeleteDenonymousModal] = useState(false);
  const [activeStateModal, setactiveStateModal] = useState(false);
  const [topic,setTopic]=useState('')
  const [visiblityStateModal, setVisibilityStateModal] = useState(false);
  const [link, setLink] = useState("0");
  const [loading, setLoading] = useState(false);
  const notification = useContext(NotificationContext)!;

  const changeVisibility = async () => {
    setPending(true);
    await changeResponsesVisibilityActiion(keyVisibility);
    setPending(false);
  };
   function handleClick(a: React.MouseEvent<HTMLInputElement>, i: number) {
    a.preventDefault();
    setKey(denonyms[i].key);
    setTopic(denonyms[i].topic);
    setactiveStateModal(true);
  }
   function handleClickVisiblity(
    a: React.MouseEvent<HTMLInputElement>,
    i: number,
  ) {
    a.preventDefault();
    setKeyVisibility(denonyms![i].key);
    setTopic(denonyms![i].topic
      )
    setVisibilityStateModal(true);
  }
  return (
    <>
      {loading || pending ? <Loading /> : null}{" "}
      {ShareDenonymsModal && (
        <ShareDenonymsModal link={link} modal={modal} setModal={setModal} />
      )}
      {DeleteDenonymsModal && (
        <DeleteDenonymsModal
          setLoading={setLoading}
          setModal={setDeleteDenonymousModal}
          modal={deleteDenonymousModal}
          key_={key_!}
        />
      )}
      <ul className="flex flex-col items-center space-y-6 gap-4 mx-auto">
        {denonyms.length > 0
          ? denonyms.map((e, i) => (
              <li
                id={i.toString()}
                className={`border h-fit border-[#EDC211] relative w-[90%] px-8 text-white max-w-[500px] rounded-lg  py-8 bg-[#242222] mx-auto `}
                key={i}
              >  <Trash2Icon
              className="absolute top-5 right-5 cursor-pointer hover:text-[#f6d108] "
              onClick={() => {
                setKey(e.key);
                DeleteDenonymsModal = dynamic(
                  () => import("../libraries/Modals/DeleteDenonyms")
                );
                setDeleteDenonymousModal(true);
              }}
            />
                              {
                    DenonymousDropdown &&
                    <DenonymousDropdown
                      owner={e.owner}
                      status={{
                        video: e.isVideoLimitOn,
                        audio: e.isAudioLimitOn,
                        image: e.isImageLimitOn,
                      }}
                      key_={e.key}
                    />
                  }
                <article>
                  <h2 className="text-3xl font-bold text-center mt-6 uppercase">
                    <TooltipApp title={e.topic} text={e.topic} />
                  </h2>
                  {/* <br /> date created:
              {new Date(e.dateCreated).toLocaleDateString()} <br /> */}
                  <section className="flex flex-col my-6 sm:my-2 sm:flex-row items-center justify-between">
                    <div className="relative w-[100px] h-[100px] flex items-center justify-center  mb-4">
                      <ResponsesSVG />
                      <p
                        className={`${styles.gradientHeader} font-bold text-3xl absolute `}
                      >
                        {e.replys.length > 100 ? "99+" : e.replys.length}
                      </p>
                    </div>
                    <div>
                      <TooltipApp
                        text=""
                        title="Disallow everyone from sending you responses"
                      >
                        <div className="flex items-center">
                          <input
                            className="cursor-pointer mx-3"
                            id={`show_responses_${i}`}
                            type="checkbox"
                            checked={!e.isActive}
                            readOnly
                            onClick={async (a) => {
                              ActivateDenonyms = dynamic(
                                () =>
                                  import("../libraries/Modals/ActivateDenonyms")
                              );
                             handleClick(a,i);
                            }}
                          />
                          <label
                            className="cursor-pointer select-none"
                            htmlFor={`show_responses_${i}`}
                          >
                            Disable Denonymous
                          </label>{" "}
                        </div>
                      </TooltipApp>
                      <TooltipApp
                        text=""
                        title="Disallow everyone from seeing all responses"
                      >
                        <div className="flex items-center">
                          <input
                            className="cursor-pointer mx-3"
                            id={`show_responses_visible_${i}`}
                            type="checkbox"
                            checked={!e.responsesViewState}
                            readOnly
                            onClick={async (a) => {
                              ChangeDenonymousResponseVisibility = dynamic(
                                () =>
                                  import(
                                    "../libraries/Modals/ChangeVisibilityModal"
                                  )
                              );
                        
                              handleClickVisiblity(
                                a,
                                i,
                              
                                
                              );
                            }}
                          />
                          <label
                            className="cursor-pointer select-none"
                            htmlFor={`show_responses_visible_${i}`}
                          >
                            Hide all responses
                          </label>{" "}
                        </div>
                      </TooltipApp>
                    </div>
                  </section>
                  <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row items-center sm:justify-between ">
                    <Link
                      href={e.link}
                      target="blank"
                      className=" w-full sm:w-fit block "
                    >
                      <button
                        role="link"
                        aria-label={`Go to responses for ${e.topic} denonymous`}
                        className={`gradient_elements_div px-6 py-2 rounded  text-[#0f0f0f] w-full sm:w-fit max-w-[250px] sm:mx-0 mx-auto block`}
                      >
                        View Responses
                      </button>
                    </Link>
                    <div className="flex w-full max-w-[250px] sm:w-fit mx-auto sm:mx-0">
                      <button
                        role="button"
                        aria-label={`Copy link for ${e.topic} denonymous`}
                        className={` rounded-l px-4  border-[#EDC211] border-2 `}
                        onClick={() => {
                          setLink(e.link);
                          ShareDenonymsModal = dynamic(
                            () => import("../libraries/Modals/ShareDenonyms")
                          );
                          setModal(true);
                        }}
                     
                      >
                        <Share2Icon className="text-[#EDC211] " size={24}/>
                      </button>
                      <button
                        aria-label={`Open modal for ${e.topic} denonymous link sharing`}
                        role="button"
                        className={`w-full max-w-[200px] sm:w-fit rounded-r px-4 py-2 text-[#0f0f0f] bg-[#EDC211]`}
                        onClick={async () => {
                          const copyToClipboard = (
                            await import("@/src/core/lib/helpers")
                          ).copyToClipboard;
                          copyToClipboard(encodeURI(e.link));
                          notification({
                            message: "Link copied",
                            type: "success",
                            description: "",
                          });
                        }}
                      >
                        {" "}
                        Copy Link
                      </button>
                    </div>
                  </div>
                

                {ActivateDenonyms &&  <ActivateDenonyms
                    setmodal={setactiveStateModal}
                    modal={activeStateModal}
                    key_={key_}
                    topic={topic}
                    id={i+"_modal_activate"}
                    e={e}
                  />}

                 {ChangeDenonymousResponseVisibility && <ChangeDenonymousResponseVisibility
                    setmodal={setVisibilityStateModal}
                    modal={visiblityStateModal}
                    topic={topic}
                    changeVisibility={changeVisibility}
                    e={e}
                  />}
                </article>
              </li>
            ))
          : null}
      </ul>
    </>
  );
};

export default MyDenonyms;
