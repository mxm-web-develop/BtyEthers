import { BtyProvider } from "./Provider"
import {utils} from  'ethers'
import MetaMaskOnboarding from '@metamask/onboarding';
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { isBytes, isBytesLike } from "@ethersproject/bytes";
export type SignerType =  'metamask'| 'walletconnect'| 'hdwallet'


export default class BtyEthers {
   _provider:BtyProvider
   _wallet:any
   _contract:any
   _signerType:SignerType
   _onboarding:MetaMaskOnboarding
   _address:string
   utils:typeof utils
   constructor(jsonRpcUrl:string){
      this._provider = new BtyProvider(jsonRpcUrl)
      this._onboarding = new MetaMaskOnboarding()
   }

   async connect(signerType:SignerType){
      this._signerType = signerType
      switch(this._signerType){
         case 'metamask':
           await this._metaMaskInit()
         break
      }
   }
   async disconnect(){
      //wallet_requestPermissions to disconnect
      switch(this._signerType){
         case 'metamask':
            const permissions= await this._wallet.request({ method: 'wallet_requestPermissions' })
            console.log(permissions);
         break
      }
   }
   


   /**
    *
    * @param params to:string,value?:string,data?:string
    */
   async send(params:{to:string,value?:string,data?:string}){
     const b= await this._buildTransaction(params)
     if(!b.sha256Hash){
        throw new Error('没有返回签名信息')
     }
     const signature = await this.signTransaction(b.sha256Hash)
     return await this._provider.sendSignTransaction({
         rawTx:b.rawTx,
         signature
     })
   }

   useWallet(){
       
   }
   
   async signTransaction(data:any){
      // const isSigner = this._provider.getSigner()
      switch (this._signerType) {
         case 'metamask':
             return  await this._metaMaskSignTransactions(data)
         default:
            break;
      }
   }

   signTypedData(){

   }


   // from?:string;
   // to:string;
   // value:string;
   // gas?:string;
   // gasPrice?:string;
   // data?:string,
   // [k:string]:any
   private async _buildTransaction(params:{to:string,value?:string,data?:string}){
      //const _isBytesLike = isBytes(params.data)
      const _gasPrice = await this._provider.getGasPrice()
      const gasPrice =  BigNumber.from(_gasPrice).toString()
      const _gas = await this._provider.estimateGas({
         from:this._address,
         to:params.to,
         gasPrice,
         value:params.value||0,
         data:params.data
      })
      const gas = BigNumber.from(_gas).toString()
      return await this._provider.createRawTransaction({
         from:this._address,
         to:params.to,
         gas,
         gasPrice,
         value:params.value || "0",
         data:params.data
      })
   }


   private async _metaMaskInit(){
      //detect if the metamask installed
      if(!MetaMaskOnboarding.isMetaMaskInstalled() || !(window as any).ethereum){
         console.log('没有检测到metamask安装');
      }
      //add metamask to this._wallet
      this._wallet = (window as any).ethereum
      //check chain register then switch to the chain
           //can't work since the chainID is fake

      //detect if metamask connect and account selected
      if(!this._wallet.selectedAddress){
         const accont = await this._wallet.request({ method: 'eth_requestAccounts' })
         if(accont.length > 0){
            this._address = accont[0]
         }else {
            console.warn('metamask里没有账户');
         }
      }else{
         this._address = this._wallet.selectedAddress
      }
  
      //try add asset that supported on this chain
            
   }

   private async _metaMaskSignTransactions(signData:any){
      return await this._wallet.request({
            method: "eth_sign",
            params: [this._address, signData],
      })
   }

   private _metaMaskIsChainRegister(){

   }

   private _metaMaskAddAssetResult(){

   }
}