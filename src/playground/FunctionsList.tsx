import React, { useContext, useState } from "react"
import { APIs } from "./api";
import {  API_TYPE, IProps } from "./playGround.type"
import { ScriptPannel } from "./ScriptPannel"
import { AppStore } from "./store"


interface FunctionsListType extends IProps{
    moduleName:APIs;
    api:API_TYPE
}

export const FunctionsList = (props:FunctionsListType)=>{ 
    const [actived,setActived] = useState('')
    const {network,connect} = useContext(AppStore)
    const {moduleName,api} = props
    const ItemClicked = (name: string)=>{
        if(network !== 1) throw new Error('connect to jsonRpc node first')
        setActived(name)
    }

    console.log(connect);
    
    const buttonAble = (methodName: string,connectState:boolean) =>{
        if(methodName === 'connect'){
            if(connectState === false){
                return false
            }else{
                return true
            }
        }
        if(connectState === false){
            return true
        }else{
            return false
        }
    }
    const ButtonList = (api:API_TYPE,network:number)=>{
        if(network !== 1){
            return  (
                <div className='text-lg w-full text-center py-5'>
                    Please input your JsonRpc Url!
                </div>
            )
        }else{
            return (
                api.map(i=>  <button 
                    className={actived === i.methodName?
                        `py-3 px-5  bg-green-600 text-white  rounded-md cursor-pointer
                        ${buttonAble(i.methodName,connect)?' text-gray-500 bg-white shadow':''}
                        `
                        :`py-3 px-5 shadow hover:shadow-md rounded-md cursor-pointer
                        ${buttonAble(i.methodName,connect)?' text-gray-500':''}
                        ` }
                    disabled={buttonAble(i.methodName,connect)}
                    key={i.methodName}
                    onClick={()=>ItemClicked(i.methodName)}
                    >{i.methodName}</button>)
            )
        }
    }
    return(
        <div className='flex justify-between'>
            <div className='w-6/12'> 
                <div className={`grid gap-x-3 gap-y-5 w-full text-[.75rem] ${network!==1?'grid-cols-1':'grid-cols-3'}` }>
                    {ButtonList(api,network)}
                </div>
            </div>
            <div className='w-6/12'>
                {
                    moduleName !== APIs.VIEW? <ScriptPannel selectedItem={actived} moduleName={moduleName} api={api}></ScriptPannel>: <div></div>
                }
            </div>
        </div>
    )
}