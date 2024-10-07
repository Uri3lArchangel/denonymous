"use client";
import React, { useContext, useEffect, useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import getSymbolFromCurrency from "currency-symbol-map";
import { URLRESOLVE } from "@/src/core/lib/helpers";
import { NotificationContext } from "@/src/FE/components/contexts/NotificationContext";
import { PaystackButton } from "react-paystack";
import { paystackCurrencies } from "@/src/core/data/paystackCurrencies";
import { premiumDiscount } from "@/src/core/data/constants";
import Link from "next/link";
import SolPay from "./SolPay";
import WalletContext from "./Walletconnect";

const Subscription = ({ email,premium }: { email: string,premium:boolean }) => {
  const not = useContext(NotificationContext)!;
  const [price, setPrice] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);
  const [config, setConfig] = useState({
    reference: new Date().getTime().toString(),
    email: email,
    amount: 10,
    publicKey: "pk_test_4b75999c612d38f1f8532eaa2e172a3ac6d876d4",
  });

  const handleSuccess = async (ref: any) => {};

  useEffect(() => {
    const run = async () => {
      const res = await fetch(URLRESOLVE("/api/ipgeolocation"), {
        method: "POST",
        body: JSON.stringify({}),
        next: {
          revalidate: 60,
        },
      });
      const [{ price, currency }, error] = (await res.json()) as [
        { price: number; currency: string },
        error: string
      ];
      if (error) {
        not({ type: "error", description: error, message: "" });
      }
      setPrice(price);
      setCurrency(currency);
      setConfig((prev) => ({ ...prev, amount: price * 100 }));
    };
    run();
  }, [price, currency]);

  return (
    <main className="min-h-[100vh] backgroundVector pt-20  ">
      <section className="flex justify-between max-w-[600px] lg:max-w-[1200px] mx-auto flex-col items-center lg:flex-row my-8">
        <div className="w-full lg:w-[30%]">
          <h1 className="text-2xl">
            Upgrade to <span className="font-bold">Denonymous+ </span> (Premium
            👑)
          </h1>
          <p className="my-4 opacity-[0.8]">
            It is a one time payment, pay once and own a denonymous+ account for
            as long as you want
          </p>
          <div className=" " id="premium_derm"></div>
          <p className="my-6 text-[#f2d204]">
            Your current features: Free plan
          </p>
          <ul className="opacity-[0.7] text-sm space-y-4 my-4 ">
            <li> Max 2 video responses per box</li>
            <li> Max 3 image responses per box</li>
            <li> Max 2 audio responses per box</li>
            <li> Max 3 denonymous boxes at once</li>
          </ul>
        </div>
        <section className=" w-full max-w-[600px]  my-8">
          <div className="bg-[#242222] w-full px-4 lg:px-16 py-8 rounded-lg relative border-2 my-4 border-[#f2d204]">
            <span className="absolute top-4 right-4">👑</span>
            <div>
              <section className="flex justify-between items-center">
                {" "}
                <div className="flex space-x-2 items-center">
                  <input id="premium_check" checked type="checkbox" />
                  <h2 className="pl-4 text-xl">Unlimited Premium Plan</h2>
                </div>
                {!price || !currency ? (
                  <div className="loading_skeleton h-8 w-36 rounded-lg"></div>
                ) : (
                  <section>
                    <div className="text-sm lg:text-lg  text-[#f2d204] line-through opacity-[0.7]">
                      {" "}
                      {getSymbolFromCurrency(currency)}{" "}
                      {Number(price.toFixed(2)).toLocaleString()} {currency}
                    </div>
                    <div className="text-lg lg:text-xl font-bold text-[#f2d204]">
                      {getSymbolFromCurrency(currency)}{" "}
                      {Number(
                        (price - premiumDiscount * price).toFixed(2)
                      ).toLocaleString()}{" "}
                      {currency}
                    </div>
                    <p className="text-red-500 my-2">
                      {premiumDiscount * 100}% discount
                    </p>
                  </section>
                )}{" "}
              </section>

              <ul className="p-4">
                <li className="flex text-sm my-2 opacity-[0.8]">
                  <IoIosCheckmark className="text-green-400" size={30} />
                  <p>Unlimited denonymous boxes</p>
                </li>
                <li className="flex text-sm my-2 opacity-[0.8]">
                  <IoIosCheckmark className="text-green-400" size={30} />
                  <p>Unlimited Video responses on all denonymous box</p>
                </li>
                <li className="flex text-sm my-2 opacity-[0.8]">
                  <IoIosCheckmark className="text-green-400" size={30} />
                  <p>Unlimited Image responses on all denonymous box</p>
                </li>
                <li className="flex text-sm my-2 opacity-[0.8]">
                  <IoIosCheckmark className="text-green-400" size={30} />
                  <p>Unlimited audio responses on all denonymous box</p>
                </li>
                <li className="flex text-sm my-2 opacity-[0.8]">
                  <IoIosCheckmark className="text-green-400" size={30} />
                  <p>Unlimited Image responses on all denonymous box</p>
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
          {!premium?<div className="flex flex-wrap">
            {/* {currency ? (
              price ? (
                <PaystackButton
                  disabled={!paystackCurrencies.includes(currency)}
                  className="bg-white mr-2 text-black rounded-lg  px-6 py-2"
                  {...config}
                  text="Pay With Paystack"
                  onSuccess={(ref) => {
                    handleSuccess(ref);
                  }}
                />
              ) : (
                <div className="loading_skeleton h-8 w-36 rounded-lg"></div>
              )
            ) : null} */}
            {currency ? (
              price ? (
                <WalletContext>
                  <SolPay email={email} />
                </WalletContext>
              ) : (
                <div className="loading_skeleton h-8 w-36 rounded-lg"></div>
              )
            ) : null}
          </div>:
          <div className="text-center">
            You are a premium user 👑
          </div>
          }
        </section>
      </section>
    </main>
  );
};

export default Subscription;
