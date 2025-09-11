import React, { useEffect, useState } from "react";
import { fetchUser, filterMediaLimitOn, filterDenonymous } from "@/src/core/lib/helpers";
import { denonymousType, u1, userDataJWTType, userModelType } from "@/types";
import { EdgeStoreProvider } from "@/src/core/lib/edgestore";
import { MultiFileDropzoneUsage } from "@/src/FE/components/subcomponents/MultiFileComponent";
import Link from "next/link";
import UserSec from "@/src/BE/DB/schema/UserSecondary";
import { connectMongo } from "@/connection";

// Define the ResponsePageComponent
function ResponsePageComponent({
  username,
  userdata,
  key_,
  isSession,
}: {
  username: string;
  userdata?: userDataJWTType;
  key_: string;
  isSession: boolean;
}) {
  const [all, setAll] = useState<userModelType | null>(null);
  const [u1Data, setU1Data] = useState<u1 | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isPolling, setIsPolling] = useState(true);

  const key = key_;

  // Function to fetch data
  const fetchData = async () => {
    try {
      const userData = (await fetchUser(username)) as userModelType;
      setAll(userData);
      
      await connectMongo();
      const userSecData = await UserSec.findOne({ username: userData.username }) as u1;
      
      if (!userSecData) {
        await UserSec.create({ points: 0, username });
        setU1Data({ points: 0, username } as u1);
      } else {
        setU1Data(userSecData);
      }
      
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Set up polling with useEffect
  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up polling every 7 seconds if polling is enabled
    let intervalId: NodeJS.Timeout;
    if (isPolling) {
      intervalId = setInterval(fetchData, 7000);
    }

    // Cleanup
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [username, isPolling]);

  // Toggle polling
  const togglePolling = () => {
    setIsPolling(!isPolling);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        <span className="ml-4 text-white">Loading user data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 text-white p-4 rounded-md max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
        <button 
          onClick={fetchData}
          className="mt-4 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!all) {
    return (
      <div className="bg-red-900 text-white p-4 rounded-md max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-2">Error 0001</h2>
        <p>User data not found</p>
      </div>
    );
  }

  let d = filterDenonymous(all, key) as denonymousType;
  
  if (!d) {
    return (
      <div className="bg-red-900 text-white p-4 rounded-md max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-2">Error 0002</h2>
        <p>Denonymous data not found</p>
      </div>
    );
  }

  let replys = d.replys;
  let isPremium = all.isPremium || (u1Data?.premiumDenonymousBoxes?.includes(key_) || false);
  let mediaLimit = filterMediaLimitOn(all.denonymous, key);

  // Format the last updated time
  const formattedTime = lastUpdated ? lastUpdated.toLocaleTimeString() : '';

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Polling Controls */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {isPolling ? `Polling every 7 seconds | Last updated: ${formattedTime}` : 'Polling paused'}
        </div>
        <button 
          onClick={togglePolling}
          className={`px-3 py-1 rounded text-sm ${isPolling ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isPolling ? 'Pause Polling' : 'Resume Polling'}
        </button>
      </div>

      {isSession && d.owner == userdata?.email ? (
        <div>
          <h1 className="text-3xl sm:text-4xl text-center text-ellipsis text-white max-w-[600px] mx-auto break-words">
            {d.topic}
          </h1>
          <h2 className="text-center text-[#7F7F7F] mb-20 max-w-[400px] mx-auto break-words">
            {d.description ? d.description : ""}
          </h2>
          <div className="bg-[#1E1E1E] max-w-[750px] mx-auto w-full rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">Responses</h3>
            <div className="space-y-4">
              {replys.reverse().map((reply, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-md">
                  <p className="text-white">{reply.text}</p>
                  <p className="text-gray-400 text-sm mt-2">
                    {new Date(reply.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <main className="py-10">
            <h1 className="text-4xl sm:text-4xl text-center text-ellipsis text-white max-w-[600px] mx-auto break-words">
              {isPremium ? "👑" : null}{d.topic}
            </h1>
            <h2 className="text-center text-[#7F7F7F] mb-20 max-w-[400px] mx-auto break-words">
              {d.description ? String(d.description) : ""}
            </h2>

            {d.isActive ? (
              <form
                id="reply_form"
                className={`${isPremium ? "gradient_elements_div" : "bg-[#1E1E1E]"} rounded-md max-w-[750px] px-4 py-12 md:px-12 mx-auto md:h-fit`}
              >
                <h3 className={`text-center text-xl font-semibold ${isPremium ? "text-black" : "gradient_elements_text"}`}>
                  Send Response
                </h3>
                <p className={`text-center ${isPremium ? "text-[#454545]" : "text-[#7F7F7F]"} py-4`}>
                  send text, photos, audios and even videos to {username}
                </p>
                <div className={`shadow-div rounded-[14px] bg-[#171717] pt-[1em] w-full max-w-[500px] mx-auto ${isPremium ? "" : "border-2 border-b-[#daa521] border-t-[#f6d108] border-r-[#ffdf00] border-l-[#edc211]"}`}>
                  <textarea
                    maxLength={600}
                    name="text_reply"
                    id="response"
                    className="block text-white w-full md:w-[94%] mx-auto bg-[#0d0d0d] rounded-[10px] outline-none p-2 text-white/78 md:h-[200px]"
                    rows={10}
                    placeholder="Type your response here..."
                  />
                  <div>
                    <EdgeStoreProvider>
                      <MultiFileDropzoneUsage
                        username={username}
                        key_={key}
                        mediaLimit={mediaLimit}
                        premium={isPremium}
                      />
                    </EdgeStoreProvider>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-medium"
                  >
                    Submit Response
                  </button>
                </div>
              </form>
            ) : (
              <section className="text-center text-lg sm:text-xl text-white">
                This denonymous is currently not active
              </section>
            )}
          </main>

          <div className={`${isPremium ? "gradient_elements_div" : "bg-[#1e1e1e]"} max-w-[750px] mx-auto w-full rounded-md p-6`}>
            {!d.responsesViewState ? (
              <p className="text-2xl text-white text-center">All responses have been hidden by {username}</p>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">Responses</h3>
                <div className="space-y-4">
                  {replys.reverse().map((reply, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-md">
                      <p className="text-white">{reply.text}</p>
                      <p className="text-gray-400 text-sm mt-2">
                        {new Date(reply.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            <div className={isPremium ? "bg-black rounded-bl-xl rounded-br-xl mt-6" : "mt-6"}>
              {userdata ? (
                <Link
                  href="/dashboard"
                  className="gradient_elements_div text-[16px] py-4 block rounded-md w-full mx-auto text-center max-w-[250px] my-4"
                >
                  Get your own messages
                </Link>
              ) : (
                <div className="flex justify-center flex-wrap max-w-[400px] mx-auto">
                  <Link href="/auth/signup" className='gradient_elements_div px-6 py-4 max-w-[150px] text-center my-4 mx-auto block text-black rounded-md ml-2'>
                    Sign up
                  </Link>
                  <Link href="/auth/signin" className='gradient_elements_text border max-w-[150px] text-center my-4 mx-auto block border-[#ffdf00] mr-2 px-6 py-4 rounded-md'>
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResponsePageComponent;
