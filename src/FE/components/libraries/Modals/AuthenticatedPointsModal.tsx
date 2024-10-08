import WalletContext from "@/app/subscription/Walletconnect";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";
import { useModal } from "./ModalProvider";

const AuthenticatedPointsModal = ({ points,RPC }: { points: number,RPC:string }) => {
  const { closeModal } = useModal()

  return (
    <section className="fixed w-full left-0 top-0 h-full z-[120] bg-black/80 filter backdrop-blur-md flex items-center justify-center">
      <div className="text-center max-w-[500px] space-y-6 mx-auto ">
      <h1 className="text-2xl">You earned {points} DEpoints! 🎉 </h1>
      <p>Earn more points by performing various actions, We have also hidden various easter eggs round the app 😉 so play around
        and discover</p>
    
      <p>Connect your solflare wallet now to get 15 bonus DEpoints (Bonus is available for only solflare wallet)</p>
      <div className="my-6 flex flex-col space-y-8 lg:space-y-0  items-center lg:flex-row justify-between ">
      <WalletContext    RPC={RPC!}>
        <WalletMultiButton  />
      </WalletContext>
    <button className="border-2 border-red-500 text-red-500 px-6 py-3 rounded-lg " onClick={closeModal}>Close</button>      
    </div>
      </div>
    </section>
  );
};

export default AuthenticatedPointsModal;
