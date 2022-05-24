import React from 'react';
import ReactDOM from 'react-dom/client';
import Web3LoginReact from './components/Web3LoginView'
const root = document.createElement('div');
root.setAttribute('id','web-login')
document.documentElement.appendChild(root)
const ReactRoot= ReactDOM.createRoot(root)
export const createLoginBox = ()=>{

    ReactRoot.render(
        <React.StrictMode>
            <Web3LoginReact />
        </React.StrictMode>
    ) 
}
export const deleteLoginBox = ()=>{
     ReactRoot.unmount()
        
}
// createLoginBox()
