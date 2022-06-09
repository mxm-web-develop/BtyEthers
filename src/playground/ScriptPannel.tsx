import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { API_TYPE, IProps } from "./playGround.type";

import { AppStore } from "./store";
import { useAsyncState } from "./hooks";
import { APIs } from "./api";

interface ScriptPannelType extends IProps {
  api: API_TYPE;
  moduleName?: APIs;
  selectedItem: string;
}
interface RequestType extends IProps {
  handleInputchange: (data: any) => any;
  data: any[];
}
const Request = (props: RequestType) => {
  const [data, setData] = useAsyncState([]);
  const handleInput = async (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const rData = await setData({
      ...data,
      [name]: value,
    });
    props.handleInputchange(rData);
  };
  let El;
  if (props.data && props.data.length > 0) {
    El = props.data.map((i) => {
      return (
        <div className="flex py-3 pl-6 items-center" key={i.name}>
          <div className="opacity-50 text-sm">{i.name} : </div>
          {i.el === 'input'?          <input
            type={i.type}
            key={i.name}
            name={i.name}
            className="text-xs outline-none px-2 mr-2 ml-2 bg-slate-800  w-8/12 focus:bg-slate-600 border-b border-slate-600 focus:border-slate-400 py-1 focus:bg-opacity-20"
            placeholder={i.placeholder && i.placeholder}
            defaultValue={i.default && i.default}
            required={i.required && i.required}
            onChange={handleInput}
          />:
          i.el === 'textarea'?
            <textarea
            key={i.name}
            name={i.name}
            className="text-xs outline-none px-2 mr-2 ml-2 min-h-[65px] bg-slate-800  w-8/12 focus:bg-slate-600 border border-slate-600 focus:border-slate-400 py-1 focus:bg-opacity-20"
            placeholder={i.placeholder && i.placeholder}
            defaultValue={i.default && i.default}
            required={i.required && i.required}
            onChange={handleInput}
            ></textarea>:''
          
          }
        </div>
      );
    });
  } else {
    El = <div className=" text-xs bg-slate-800 px-5 mr-2 ml-2 py-3">null</div>;
  }
  return <>{El}</>;
};

export const ScriptPannel = (props: ScriptPannelType) => {
  const { api } = props;
  const { wallet, doSetConnect, connect } = useContext(AppStore);
  const [res, setRes] = useState<any>(null);
  const [inputValue, setInputValue] = useAsyncState(null);
  const [loading, setLoading] = useAsyncState(false);
  const onSelectItem = (methodName: string) => {
    if (!api) return;
    return api.find((k) => k.methodName === methodName);
  };
  const method = onSelectItem(props.selectedItem);
  useEffect(() => {
    setRes(null);
  }, [props.selectedItem]);


  const showResponse = (data: any) => {
    if (typeof data === null) {
      return "no data";
    } else if (
      typeof data === "object" &&
      !Array.isArray(data) &&
      data !== null
    ) {
      const res = Object.entries(data).map((i) => i.toString());
      return res;
    } else {
      return data;
    }
  };
  const handleInput = async (d: any) => setInputValue(d);
  const submitClick = async () => {
    const methodName = method.methodName;
    await setLoading(true);
    switch (methodName) {
      case "sendTransaction":
        const to = inputValue["to"];
        const value = (Number(inputValue["value"]) * 1e18).toString();
        const sendTransaction = await wallet.send({
          to: to,
          value: value,
        });
        setRes(sendTransaction);
        await setLoading(false);
        return sendTransaction;
      case "getBlock":
        const b =
          inputValue && inputValue["block"]
            ? Number(inputValue["block"])
            : "latest";
        try {
          const block = await wallet.getBlock(b);
          setRes(block);
          await setLoading(false);
          return block;
        } catch (err) {
          await setLoading(false);
          console.log(err);
          return err;
        }
      case "connect":
        const connectCall = await wallet.connect("metamask");
        if (connectCall) {
          await doSetConnect(true);
        } else {
          await doSetConnect(false);
        }
        const response = {
          ...connectCall,
          connect: connect,
        };
        setRes(response);
        await setLoading(false);
        return response;
      case "getBalance":
        const balance = await wallet.getBalance();
        setRes(balance);
        await setLoading(false);
        return balance;
      case "getTransactionReceipt":
        const hash = inputValue["hash"];
        const getTransactionReceipt = await wallet.getTransactionReceipt(hash);
        setRes(getTransactionReceipt);
        await setLoading(false);
        return getTransactionReceipt;
      case "getTransaction":
        const getTransactionHash = inputValue["hash"];
        const getTransaction = await wallet.getTransaction(getTransactionHash);
        setRes(getTransaction);
        await setLoading(false);
        return getTransaction;
      case "getTransactionCount":
        const getTransactionCount = await wallet.getTransactionCount();
        setRes(getTransactionCount);
        await setLoading(false);
        return getTransactionCount;

      case "getGasPrice":
        const price = await wallet.getGasPrice();
        setRes(price);
        await setLoading(false);
        return price;
      case "network":
        const network = await wallet.detectNetwork();
        setRes(network);
        await setLoading(false);
        return network;
      case "getBlockNumber":
        const blockNumber = await wallet.getBlockNumber();
        setRes(blockNumber);
        await setLoading(false);
        return blockNumber;
      case "disConnect":
        const dis = await wallet.disconnect();
        await doSetConnect(false);
        const disConnectResponse = {
          ...dis,
          connect: connect,
        };
        setRes(disConnectResponse);
        await setLoading(false);
        return disConnectResponse;
      case "setContract":
        const contractAddrs = inputValue["contractAddrs"];
        const abi = inputValue["abi"];
        console.log(JSON.parse(abi),typeof abi);
        
        const setContract = await wallet.setContractInstance(contractAddrs,JSON.parse(abi))
        let setContractRes={
            ready:false,
            contractAddrs: ''
        }
        if(setContract.address){
            const isContract = await wallet.isContract(setContract.address)
            setContractRes.contractAddrs = setContract.address
            isContract.contract?
            setContractRes.ready = true
            :
            setContractRes.ready = false;
        }
        setRes(setContractRes);
        await setLoading(false);
        return setContractRes;
      case 'isContract':
        const isContractAddr = inputValue["isContractAddr"];
        const isContract = await wallet.isContract(isContractAddr)
        setRes(isContract);
        await setLoading(false);
        return isContract;
         
      case 'callContractMetthod':
          const methodName = inputValue["methodName"];

          const params = inputValue["params"]?inputValue["params"].split(','):''
        //   console.log(wallet.contract);
          
          console.log(params , typeof params);
     
          const callContractMetthod = await wallet.callContractMetthod(methodName,params)
        //   console.log(callContractMetthod);
          console.log(callContractMetthod);
          
        //   setRes(callContractMetthod);
          await setLoading(false);
         return callContractMetthod;
      case "deploy":
        const deployAbi =inputValue["deployAbi"];
        const deployBytes = inputValue['deployBytes']
        const deploy = await wallet.deploy(JSON.parse(deployAbi),deployBytes)
        setRes(deploy);
        await setLoading(false);
        return deploy;
      default:
        await setLoading(false);
        throw new Error("no method find");
    }
  };

  return (
    <div className="w-10/12 h-[625px] mx-auto bg-slate-800 text-slate-100 px-5 py-3 rounded bs-wrapper relative">
      {props.selectedItem ? (
        <div className="MethodName">
          <div className="py-2 bg-slate-700 px-2">
            <div className="opacity-50 text-sm">Method Name: </div>
            <div className="pl-5 capitalize ">
              {method.methodName ? method.methodName : ""}
            </div>
          </div>
          <div className="py-2  px-2">
            <div className="opacity-50 text-sm">Request:</div>

            <Request data={method.request} handleInputchange={handleInput} />
          </div>
          <div className="py-2  px-2">
            <div className="opacity-50 text-sm">Response:</div>

            <div className="text-xs bg-slate-800 px-5 mr-2 ml-2 py-3 break-words">
              {showResponse(res) ? showResponse(res) : "no data"}
            </div>
          </div>

          <div className="actions pt-16 flex items-end justify-end">
            <button
              disabled={loading ? true : false}
              className={`bg-slate-600 text-sm rounded w-[145px] py-2 px-5 mt-12 ${
                loading ? "" : "hover:bg-green-800"
              }`}
              onClick={submitClick}
            >
              {loading ? "wait..." : "submit"}
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
