import React from "react"
import ReactDOM from 'react-dom/client';
import '../../style.css'
import { XIcon } from '@heroicons/react/solid'
import { View } from "../View";

interface IProps{
    remove:()=>void;
    // viewController:ReactDOM.Root
    children?: any
}


const Web3LoginView = (props:IProps)=>{
    const dosomething = ()=>{
        props.remove()      
    }
    return(
        <div id='web3-login-box' className='absolute top-0 left-0'>
                <div className="cover z-[998] flex justify-center items-center  h-screen w-screen bg-slate-900 bg-opacity-25">
                    <div className="z-[999] w-[320px] min-h-[520px] md:w-[560px] md:min-h-[480px] bg-white flex-col py-5 px-3 relative">
                        <XIcon className='w-5 h-5 float-right cursor-pointer' onClick={dosomething}></XIcon>
                        <div className="header text-center self-center border-b pb-5">Web3 Login</div>
                        <div className="current-connect flex w-full justify-center items-center py-16">
                            <div>
                                metamask
                            </div>
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-3 text-xs py-5'>
                            <div className='item flex justify-center items-center'>
                                metamask
                            </div>
                            <div className='item flex justify-center items-center'>
                                walletConnect
                            </div>
                            <div className='item flex justify-center items-center'>
                                local
                            </div>
                            <div className='item flex justify-center items-center'>
                                others
                            </div>
                        </div>
                        <div className='footer absolute left-0 text-white bg-black bg-opacity-20 opacity-75 text-center text-[10px] py-3 bottom-0 w-full border-t'>
                            <a href="https://chain.33.cn/" target="_blank">btyEther.js@33.cn</a> 
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Web3LoginView as React.FC<IProps>