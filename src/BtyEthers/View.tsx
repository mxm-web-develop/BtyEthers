import React from 'react';
import ReactDOM from 'react-dom/client';
import Web3LoginReact from './components/Web3LoginView'
// const root = document.createElement('div');
// root.setAttribute('id','web-login')
// document.documentElement.appendChild(root)
// const ReactRoot= ReactDOM.createRoot(root)
export const createLoginBox = (root:ReactDOM.Root,show:boolean)=>{
    root.render(
        <React.StrictMode>
            {
             show?
              <Web3LoginReact remove={View.removeLoginBox}  />:''
            }
        </React.StrictMode>
    ) 
}
export const deleteLoginBox = (root:ReactDOM.Root)=>{
    root.unmount()
    View.loginBox = null //
    console.log(View.loginBox);
}


export class View {
    static root:HTMLElement;
    static loginBox:ReactDOM.Root
    static showLogin:boolean = false
    static infoBox:ReactDOM.Root[] =[]
    constructor(viewRootEd?: string){
        View.root = document.createElement('div');
        View.root.setAttribute('id',viewRootEd?viewRootEd:'btyEther-View')
        document.documentElement.appendChild(View.root)
        View.loginBox =  ReactDOM.createRoot(View.root)
    }
    static createLoginBox(){
        View.showLogin =true
        createLoginBox(View.loginBox,View.showLogin)
    }
    static removeLoginBox(){
        View.showLogin =false
        createLoginBox(View.loginBox,View.showLogin)
    }

}
