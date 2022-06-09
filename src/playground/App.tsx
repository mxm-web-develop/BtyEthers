import * as React from "react";
import { Layout } from "./Layouts";
import BtyEthers from '../chain33Ethers';
import debounce  from 'lodash/debounce'
import {ExclamationCircleIcon, EmojiHappyIcon, EmojiSadIcon} from '@heroicons/react/solid'
import { useState } from "react";
import { AppStore } from "./store";
import { APIs, contractApi, coreApi, setupApi, viewApi } from "./api";
import { useAsyncState } from "./hooks";

import { FunctionsList } from "./FunctionsList";
const App = () => {
  const [network,setNetwork] = useAsyncState(0)
  const [btyEther,setBtyEther] = useState<BtyEthers>(null)
  const [connect,setConnect] = useAsyncState(false)
  const [api,setApi] = useAsyncState([])
  const initialApp = debounce(async (e:any)=>{
    const web3 = new BtyEthers(e.target.value)
    setBtyEther(web3)
    try{
        await web3.getBlockNumber()
        await setNetwork(1)
    }catch(e){
        await setNetwork(2)
    }  
  },300)
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
            connect:connect,
            wallet:btyEther,
            doSetConnect:setConnect
        }
    }>
    <div className='min-w-[1024px]'>
      <div className="hero text-xl py-5 px-5 border-b flex justify-between">
        <div className=" opacity-50 font-mono">Chain33-Ethers Playground</div>
        <div className=" initial pannel flex px-2 mr-2">
            <input type="text"  className=" text-xs outline-none px-5 focus:border-b min-w-[190px] mr-2 rounded-md focus:bg-blue-400 focus:bg-opacity-20 "  placeholder="Input jsonRPC url" onBlur={initialApp}/>
            {
                genNetWorkIcon(network)
            }
        </div>
      </div>
      <Layout title="Setup Functions">
        <FunctionsList moduleName={APIs.SETUP} api={setupApi}></FunctionsList>
      </Layout>
      <Layout title="Core Functions">
         <FunctionsList moduleName={APIs.CORE} api={coreApi}></FunctionsList>
      </Layout>
      <Layout title="Contract Functions">
         <FunctionsList moduleName={APIs.CONTRACT} api={contractApi}></FunctionsList>
      </Layout>
      <Layout title="View Functions">
         <FunctionsList moduleName={APIs.VIEW} api={viewApi}></FunctionsList>
      </Layout>

      <div className="footer text-center text-xs text-white py-5 bg-gray-200">
          33.cn
      </div>
    </div>
    </AppStore.Provider>
  );
};

export default App;
