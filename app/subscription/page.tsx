import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import getSymbolFromCurrency from 'currency-symbol-map'


const fetchIPGeoLocationCurrency = async()=>{
  const res = await fetch(process.env.baseURL+"/api/ipgeolocation",{next:{revalidate:0}})
  const [data,error] = await res.json(); 
  if(error){
    return {price:3.50,currency:'USD'}
  }
  return data as {price:number,currency:string};

}


const page = async() => {
  const {price,currency} = await fetchIPGeoLocationCurrency();
  return (
    <main className="min-h-[100vh] backgroundVector pt-20">
      <section className="flex justify-between max-w-[1200px] mx-auto">
        <div className="w-full md:w-[30%]">
          <h1 className="text-2xl">Upgrade to <span className="font-bold">Denonymous+ </span> (Premium 👑)</h1>
          <p className="my-4 opacity-[0.8]">
            It is a one time payment, pay once and own a denonymous+ account for
            as long as you want
          </p>
          <div className=" " id="premium_derm"></div>
          <p className="my-6 text-[#f2d204]" >Your current features: Free plan</p>
          <ul className="opacity-[0.7] text-sm space-y-4 my-4 ">
            <li> Max 2 video responses per box</li>
            <li> Max 3 image responses per box</li>
            <li> Max 2 audio responses per box</li>
            <li> Max 2 denonymous boxes at once</li>            



          </ul>
        </div>
        <section className=" w-full max-w-[600px]">
        <div className="bg-[#242222] px-16 py-8 rounded-lg relative border-2 border-[#f2d204]" >
        <span className="absolute top-4 right-4">👑</span>
          <div>
            <section className="flex justify-between items-center">
              {" "}
              <div className="flex space-x-2 items-center">
                <input id="premium_check" checked type="checkbox" />
                <h2 className="pl-4 text-xl">Premium Plan</h2>
              </div>
              <div className="text-2xl"> {getSymbolFromCurrency(currency)}  {price.toFixed(2).toLocaleString()} {currency}</div>
            </section>

            <ul className="p-4">
              <li className="flex text-sm my-2 opacity-[0.8]">
                <IoIosCheckmark className="text-green-400" size={30} />
                <p>Unlimited denonymous boxes</p>
              </li>
              <li className="flex text-sm my-2 opacity-[0.8]">
                <IoIosCheckmark className="text-green-400" size={30} />
                <p>Unlimited Video responses</p>
              </li>
              <li className="flex text-sm my-2 opacity-[0.8]">
                <IoIosCheckmark className="text-green-400" size={30} />
                <p>Unlimited Image responses</p>
              </li>
              <li className="flex text-sm my-2 opacity-[0.8]">
                <IoIosCheckmark className="text-green-400" size={30} />
                <p>Unlimited audio responses</p>
              </li>
              <li className="flex text-sm my-2 opacity-[0.8]">
                <IoIosCheckmark className="text-green-400" size={30} />
                <p>Unlimited Image responses</p>
              </li>
              <li className="flex text-sm my-2 opacity-[0.8]">
                <IoIosCheckmark className="text-green-400" size={30} />
                <p>1,000 free DEpoints</p>
              </li>
              <li className="flex text-sm my-2 opacity-[0.8]">
                <IoIosCheckmark className="text-green-400" size={30} />
                <p>No Ads</p>
              </li>
            </ul>
          </div>
        </div>
        <div><button>Pay With Paystack</button>
        <button></button></div>
        
</section>
      </section>
    </main>
  );
};

export default page;
