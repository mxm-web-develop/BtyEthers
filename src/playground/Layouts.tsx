import React, { useState } from "react"
import { IProps } from "./playGround.type"
import {ChevronDownIcon,ChevronUpIcon} from '@heroicons/react/solid'
interface LayoutType extends IProps{
    title: string
}

export const Layout  = (props:LayoutType)=>{
    const [open,setOpen] = useState(true)
    return (
        <div>
            <div className="px-5 py-3 font-semibold bg-slate-500 text-white flex justify-between ">
                <div>
                - {props.title}
                </div>
                {open? <ChevronDownIcon className="w-5 h-5 cursor-pointer" onClick={()=>setOpen(!open)}></ChevronDownIcon>:<ChevronUpIcon className="w-5 h-5  cursor-pointer" onClick={()=>setOpen(!open)}></ChevronUpIcon>}
            </div>
            
            {open?
                <div className='px-5 py-3'>
                    {props.children}
                </div>
            :''}
    
        </div>
    )
}