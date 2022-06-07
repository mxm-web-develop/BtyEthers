import React, { useEffect } from "react";
import { IProps } from "./playGround.type";
import { CoreApis } from "./api";
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
BScroll.use(ScrollBar)
interface ScriptPannelType extends IProps {
  selectedItem: string;
}
interface RequestType extends IProps {
  data: any[];
}
const onSelectItem = (methodName: string) =>
  CoreApis.find((k) => k.methodName === methodName);

const Request = (props: RequestType) => {
  console.log(props.data);
  return (
    <>
      {props.data&&props.data.map((i) => {
        return (
          <div className="flex py-3" key={i.name}>
            <div className="opacity-50 text-sm">{i.name} : </div>
            <input
              type={i.type}
              key={i.name}
              name={i.name}
              value={i.default ? i.default : ""}
              readOnly={i.default?true:false}
              className="text-xs outline-none px-5 mr-2 ml-2 bg-slate-800  focus:bg-slate-600 focus:bg-opacity-20"
            />
          </div>
        );
      })}
    </>
  );
};

export const ScriptPannel = (props: ScriptPannelType) => {
  const method = onSelectItem(props.selectedItem);
  useEffect(()=>{
    new BScroll('.bs-wrapper',{
        scrollY: true,
        scrollbar: true
    })
  },[])
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
            <Request data={method.request} />
          </div>
          <div>Response:</div>

          <div className="actions pt-16 flex items-end justify-end">
            <button className='bg-slate-600 py-2 px-5'>
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
