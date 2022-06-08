import React, { useContext, useState } from "react"
import { CoreApis } from "./api"
import { ScriptPannel } from "./ScriptPannel"
import { AppStore } from "./store"

export const CoreFunctions = ()=>{ 
    const [actived,setActived] = useState('')
    const {network,api,connect} = useContext(AppStore)
    const ItemClicked = (name: string)=>{
        if(network !== 1) throw new Error('connect to jsonRpc node first')
        setActived(name)
    }
    const buttonAble = (methodName: string,connectState:boolean) =>{
        if(methodName === 'connect') return false
        if(connectState === false){
            return true
        }else{
            return false
        }
    }
    console.log(api);
    
    return(
        <div className='flex justify-between'>
            <div className='w-6/12'> 
                <div className={`grid gap-x-3 gap-y-5 w-full text-[.65rem] ${api.length>0?'grid-cols-3':'grid-cols-1'}` }>
                    {api.length>0?api.map(i=>  <button 
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
                    
                    :
                    <div className='text-lg w-full text-center py-5'>
                        Please input your JsonRpc Url!
                    </div>
                    }
                </div>
            </div>
            <div className='w-6/12'>
                <ScriptPannel selectedItem={actived}></ScriptPannel>
            </div>
        </div>
    )
}