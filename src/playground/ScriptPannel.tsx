import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IProps } from "./playGround.type";
import { CoreApis } from "./api";
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import { AppStore } from "./store";
import {useSetState} from 'ahooks'
import { useAsyncState } from "./hooks";
BScroll.use(ScrollBar)
interface ScriptPannelType extends IProps {
  selectedItem: string;
}
interface RequestType extends IProps {
  handleInputchange:(data:any)=>any
  data: any[];
}

const Request = (props: RequestType) => {   
  const [data,setData] = useAsyncState([])
  const handleInput =  async (e:any)=>{
    const name = e.target.name
    const value = e.target.value
    const rData = await setData({
          ...data,
          [name]: value
      }
    )
    props.handleInputchange(rData)
  }
  let El;
  if(props.data&&props.data.length>0){
    El =  props.data.map((i) => {
        return (
          <div className="flex py-3" key={i.name}>
            <div className="opacity-50 text-sm">{i.name} : </div>
            <input
              type={i.type}
              key={i.name}
              name={i.name}
              className="text-xs outline-none px-5 mr-2 ml-2 bg-slate-800  w-8/12 focus:bg-slate-600 focus:bg-opacity-20"
              placeholder={i.placeholder&&i.placeholder}
              onChange={handleInput}
            />
          </div>
        );
      })
  }else{
      El = <div className=' text-xs bg-slate-800 px-5 mr-2 ml-2 py-3'>null</div>
  }
  return (
    <>
     {El}
    </>
  );
};




export const ScriptPannel = (props: ScriptPannelType) => {
  const {api,wallet,doSetConnect,connect} = useContext(AppStore)
  const [res,setRes] = useState<any>(null)
  const [inputValue,setInputValue] =useSetState<any>(null)
  const [loading,setLoading] = useState(false)
  const onSelectItem = (methodName: string) => {
    if(!api) return;
    return api.find((k) => k.methodName === methodName)
    };
const method = onSelectItem(props.selectedItem)

  useEffect(()=>{
      console.log(2);
      
    setRes(null) 
  },[props.selectedItem])
  useEffect(()=>{
    new BScroll('.bs-wrapper',{
        scrollY: true,
        scrollbar: true
    })
  },[])

  const showResponse = (data:any) =>{

    if(typeof data === null){
        return 'no data'
    }else if( typeof data === 'object' &&
    !Array.isArray(data) &&
    data !== null){
        const res = Object.entries(data).map(i=>i.toString())
        console.log(res);
        return res
    }else{
        return data
    }
  }
  const handleInput = async (d:any)=>  setInputValue(d)



//   const setInputValueSynchronous = (stateUpdate:any)=>{
//     return new Promise(resolve=>{
//         console.log('stateUpdate',stateUpdate);
        
//         setInputValue(stateUpdate)
//         resolve(true)
//     })
//   }


  const submitClick = async ()=>{
        const methodName = method.methodName
        setLoading(true)
        switch (methodName) {
            case 'sendTransaction':
                const to = inputValue['to']
                const value = (Number(inputValue['value']) * 1e18).toString()
                const sendTransaction = await wallet.send({
                    to:to,value:value
                  })
                  setRes(sendTransaction)
                 return sendTransaction
            case 'getBlock':
                const b = inputValue['block']?Number(inputValue['block']):'latest'
               const block = await wallet.getBlock(b)
               setRes(block)
               return block
            case 'connect':
                    const connectCall = await wallet.connect('metamask')
                    if(connectCall){
                       await doSetConnect(true)
                    }else{
                        await doSetConnect(false)
                    }
           
                const response =  {
                    ...connectCall,
                    connect:connect
                }
                setRes(response)
                return response    
            case 'getBalance':
                const balance = await wallet.getBalance()
                setRes(balance)
                return balance   
            case 'getGasPrice':
                const price = await wallet.getGasPrice()
                setRes(price)
                return price   
            case 'network':
                const network = await wallet.detectNetwork()
                setRes(network)
                return network  
            case 'getBlockNumber':
                const blockNumber = await wallet.getBlockNumber()
                setRes(blockNumber)
                return blockNumber
            case 'disConnect':
                const dis = await wallet.disconnect()
                await doSetConnect(false)
                const disConnectResponse =  {
                    ...dis,
                    connect:connect
                }
                setRes(disConnectResponse)
                return disConnectResponse
            
        }
        setLoading(false)
  }



  return (
    <div className="w-10/12 h-[625px] mx-auto bg-slate-800 text-slate-100 px-5 py-3 rounded bs-wrapper relative" >
      {props.selectedItem ? (
        <div className="MethodName">
          <div className="py-2 bg-slate-700 px-2">
            <div className="opacity-50 text-sm">Method Name: </div>
            <div className="pl-5 capitalize ">
              {method.methodName ? method.methodName : ""}
            </div>
          </div>
          <div>
            Request:
            <Request data={method.request}   handleInputchange={handleInput}/>
          </div>
          <div>Response:
            <div className='text-xs bg-slate-800 px-5 mr-2 ml-2 py-3 break-words'>
               {showResponse(res)}
            </div>
          </div>

          <div className="actions pt-16 flex items-end justify-end">
            <button className='bg-slate-600 py-2 px-5' onClick={submitClick}>
                submit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full justify-center items-center opacity-75">
          No method on selected
        </div>
      )}
    </div>
  );
};
