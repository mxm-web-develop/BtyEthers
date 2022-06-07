import React, { useContext, useState } from "react"
import { CoreApis } from "./api"
import { ScriptPannel } from "./ScriptPannel"
import { AppStore } from "./store"

export const CoreFunctions = ()=>{ 
    const [actived,setActived] = useState('')
    const {network} = useContext(AppStore)
    const ItemClicked = (name: string)=>{
        if(network !== 1) throw new Error('connect to jsonRpc node first')
        setActived(name)
    }
    return(
        <div className='flex justify-between'>
            <div className='w-6/12'>
                <div className='grid grid-cols-3 gap-x-3 gap-y-5 w-full'>
                    {CoreApis&&CoreApis.map(i=>  <div 
                    className={actived === i.methodName?'py-3 px-5 shadow-lg bg-green-600 text-white  rounded-md cursor-pointer':'py-3 px-5 shadow hover:shadow-md rounded-md cursor-pointer' }
                    key={i.methodName}
                    onClick={()=>ItemClicked(i.methodName)}
                    >{i.methodName}</div>)}
                </div>
            </div>
            <div className='w-6/12'>
                <ScriptPannel selectedItem={actived}></ScriptPannel>
            </div>
        </div>
    )
}