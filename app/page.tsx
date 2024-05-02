import Image from "next/image";
import Link from "next/link";
import React from "react";
import anon from "../public/images/anonymity.svg";
import sec from "../public/images/secure.svg";
import easy from "../public/images/easy.svg";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Home Page | Denonymous",
  description:
    " Discover Denonymous, the anonymous messaging platform where users can create custom response boxes and share them to receive anonymous text, images, videos, and audio responses on any topic. Learn about our features, read about us, connect with us on social media, and get suppor",
  keywords: [
    "Denonymous",
    "anonymous messaging app",
    "response box",
    "custom responses",
    "landing page",
    "features",
    "about us",
    "social media",
    "support",
    "sign in",
    "sign up",
  ],
  alternates: {
    canonical: "https://denonymous.xyz/",
    
  },  
  robots: {
    follow: true,
    index: true,
  },
};

function page() {
  return (
    <>    <main>
    <section>
        <header className=" backgroundVector bg-black min-h-[80vh] md:min-h-[60vh] pt-14  px-8">
          <div className=" flex flex-col items-center  max-w-[1024px] mx-auto">
          <div className="bg-[#FFFAE1]  w-fit max-w-[300px] rounded-md px-6 py-2 flex text-[13px] mb-6">
            <p className="gradient_elements_text mx-1  w-fit">
              {" "}
              Explore the world Of Secret!{" "}
            </p>
            🤫
          </div>
          <h1 className="text-[36px] font-extrabold max-w-[400px] text-white mb-10 text-center  ">
            Exchange Secret Messages Online   {" "}
          </h1>
          <Link
            href="/dashboard"
            className="gradient_elements_div text-[16px] w-full py-4 block rounded-md text-center max-w-[200px] sm:px-6"
          >
           Dashboard
          </Link>
          </div>
        </header>
          <section className="text-center py-12 px-4 w-full  mx-auto">
            <h2 className="text-xl md:text-3xl my-4 font-bold">Why use Denonymous?</h2>
            <article>
              <p className="text-sm text-[#00000099] font-extralight">
            Denonymous is the world&apos;s first multimedia-sharing anonymous platform. Receive text, images, audio, and video responses from adventurous users worldwide. Embrace the thrill of anonymous interaction with Denonymous.
              </p>
            </article>
            <ul className="md:flex flex-wrap w-full justify-center">
              <li className="border-2 border-[#19182519] rounded-md my-8 py-10 px-8 md:w-[250px] mx-2">
                <article>
                  <Image loading="lazy" className="block mx-auto" src={anon} alt="anonymity" />
                  <h2 className=" font-semibold my-4">Anonymity</h2>
                  <p className="text-[#00000099] font-extralight">
                    We prioritize your privacy. Our platform enables you to
                    share messages anonymously without revealing your identity.
                    Embrace the freedom to be yourself without the constraints
                    of societal expectations.
                  </p>
                </article>
              </li>
              <li className="border-2 border-[#19182519] rounded-md my-8 py-10 px-8 md:w-[250px] mx-2">
                <article>
                  <Image loading="lazy" className="block mx-auto" src={sec} alt="security" />
                  <h2 className=" font-semibold my-4">Safe & Secure</h2>
                  <p className="text-[#00000099] font-extralight">
                    Your safety and security, we prioritizes with encryption, a
                    secure platform, anonymous posting, dedicated moderation,
                    and a report mechanism, fostering a trusted space for free
                    expression.
                  </p>
                </article>
              </li>
              <li className="border-2 border-[#19182519] rounded-md my-8 py-10 px-8 md:w-[250px]">
                <article>
                  <Image loading="lazy" className="block mx-auto" src={easy} alt="security" />
                  <h2 className=" font-semibold my-4">Easy 2 Use</h2>
                  <p className="text-[#00000099] font-extralight">
                    Join today and let your Unseen Voice echo loud and clear.
                    Unwavering companion and your experience - it is your haven
                    for honest, secure, and anonymous expression with Hopeful
                    and uplifting words.
                  </p>
                </article>
              </li>
            </ul>
          </section>
          <section className="mt-[8em]  text-center py-24 sm:w-[60%] mx-auto">
            <h2 className="mb-[5em] text-xl md:text-3xl">About Us!</h2>
            <p className="text-[#00000099] font-extralight">
              Denonymous: The No 1 platform for Sharing video, image, audio and
              text responses anonymously. Register with us, create a Denonymous,
              and share with others to receive responses on any topic today.
            </p>
          </section>
          <section className="bg-black px-6 py-16 backgroundVector">
            <div className="sm:w-[60%] mx-auto">
              <h2 className="text-white text-[20px] text-center mb-8 font-bold ">
                {" "}
                Empower Your Thoughts
              </h2>
              <p className="text-[#fff] font-extralight my-6 text-center">
                Denonymous invites you to step into a world where your thoughts
                matter, and your identity remains concealed. Join us in creating
                a community built on understanding, support, and the freedom to
                express yourself without reservations. Be a part of the power of
                anonymity.
              </p>
              <Link
                href="/dashboard"
                className="gradient_elements_div text-[16px] w-full py-2 block rounded-md text-center sm:w-fit sm:px-8 sm:mx-auto"
              >
              Dashboard
              </Link>
            </div>
          </section>
      </section>
      </main>
      </>

  );
}

export default page;
