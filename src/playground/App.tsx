import * as React from "react";
import { Contract } from "./Contract";
import { CoreFunctions } from "./CoreFunctions";
import { Layout } from "./Layouts";
import { View } from "./Views";
import BtyEthers from '../chain33Ethers';
import debounce  from 'lodash/debounce'
import {ExclamationCircleIcon, EmojiHappyIcon, EmojiSadIcon} from '@heroicons/react/solid'
import { useState } from "react";
import { AppStore } from "./store";
const App = () => {
  const [network,setNetwork] = useState(0)
  const [btyEther,setBtyEther] = useState<BtyEthers>(null)
  const initialApp = debounce(async (e:any)=>{
    const web3 = new BtyEthers(e.target.value)
    setBtyEther(web3)
    try{
         await web3.getBlockNumber()
        setNetwork(1)
    }catch(e){
        setNetwork(2)
    }  
  },800)
  const genNetWorkIcon = (network: number)=>{
    switch(network){
        case 1:
            return <EmojiHappyIcon className="w-5 h-5 text-green-500"></EmojiHappyIcon>
        case 2:
            return <EmojiSadIcon className="w-5 h-5 text-red-500"></EmojiSadIcon>
        default:
            return <ExclamationCircleIcon className="w-5 h-5 text-yellow-500"></ExclamationCircleIcon>
    }
  }
  return (
    <AppStore.Provider value={
        {
            network:network,
            connect:false,
            wallet:btyEther
        }
    }>
    <div>
      <div className="hero text-xl py-5 px-5 border-b flex justify-between">
        <div className=" opacity-50">Chain33-Ethers Playground</div>
        <div className=" initial pannel flex px-2 mr-2">
            <input type="text"  className=" text-xs outline-none px-5 focus:border-b min-w-[190px] mr-2 rounded-md focus:bg-blue-400 focus:bg-opacity-20 "  placeholder="Input jsonRPC url" onBlur={initialApp}/>
            {
                genNetWorkIcon(network)
            }
        </div>
      </div>
      <Layout title="Core Functions">
        <CoreFunctions></CoreFunctions>
      </Layout>
      <Layout title="Contract Functions">
        <Contract></Contract>
      </Layout>
      <Layout title="View Functions">
        <View></View>
      </Layout>
    </div>
    </AppStore.Provider>
  );
};

export default App;
