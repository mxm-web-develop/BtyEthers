import { BtyProvider } from "./Provider"
import {utils} from  'ethers'
import MetaMaskOnboarding from '@metamask/onboarding';
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { isBytes, isBytesLike } from "@ethersproject/bytes";
import { Contract, ContractFactory } from "./Contract";
import {View}from "./View";
export type SignerType =  'metamask'| 'walletconnect'| 'hdwallet'


export default class BtyEthers {
   _provider:BtyProvider
   _wallet:any
   _signerType:SignerType
   _onboarding:MetaMaskOnboarding
   _address:string
   _view:View
   private _jsonRpcUrl:string
   private _contract:Contract | undefined;
   utils:typeof utils
   constructor(jsonRpcUrl:string){
      this._provider = new BtyProvider(jsonRpcUrl)
      this._jsonRpcUrl = jsonRpcUrl
      this._onboarding = new MetaMaskOnboarding()
      if(window){
         this._view = new View()
      }
   }
   get contract():Contract{
      if(!this._contract){
         throw new Error('please init contract instance by uses setContractInstance()')
      }
      return this._contract
   }
   async connect(signerType:SignerType){
      this._signerType = signerType
      switch(this._signerType){
         case 'metamask':
          this._address  =  await this._metaMaskInit()
          break;
      }
   }

   async disconnect(){
      //wallet_requestPermissions to disconnect
      switch(this._signerType){
         case 'metamask':
            this._address = null;
            this._wallet = null;
            this._signerType = null;
            this._provider= null
         break
      }
   }
   
   async getBalance(){
      switch(this._signerType){
         case 'metamask':
            return this._provider.getBalance(this._address);
         default:
               return null;
      }
   }

   async getBlock(block?:number){
      switch(this._signerType){
         case 'metamask':
            return this._provider.getBlock(block||'latest');
         default:
            return null;
      }
   }
   async getBlockNumber(){
      switch(this._signerType){
         case 'metamask':
            return this._provider.getBlockNumber();
         default:
            return null;
      }
   }
   /**
    * 根据ens解析chainID获取网络信息
    * @returns 
    */
   async detectNetwork(){
      switch(this._signerType){
         case 'metamask':
            return this._provider.detectNetwork();
         default:
            return null;
      }
   }

   /**
    * 获取交易费价格
    * @returns BigNumber {_hex: '0x02540be400', _isBigNumber: true}
    */
   async getGasPrice(){
      switch(this._signerType){
         case 'metamask':
            return this._provider.getGasPrice();
         default:
            return null;
      }
   }

   toggelViewLogin(){
      View.createLoginBox()
   }

   async getSigner(){
      switch(this._signerType){
         case 'metamask':
            return this._wallet;
         default:
            return null;
      }
   }

   setContractInstance(contractAddress: string,abi:any){
      this._contract =  new Contract(contractAddress,abi,this._provider)
      return this._contract
   }

   /**
    * 使用合约的方法
    * @param methodName string
    * @param params string[]
    * @returns 
    */
   async callContractMetthod(methodName: string,params?:any[]){
      const isMethodExist = Object.entries(this.contract.functions).find(i=>i[0]===methodName)
      if(!isMethodExist){
         console.log(this.contract.functions);
         throw new Error('method doesnt exist in your contract')
      }
      return await this.contract.functions[methodName](...params)

   }


   // async listAccounts
   // lookupAddress()
   // async waitForTransaction
   // async getBlockWithTransactions()
   /**
    *
    * @param params to:string,value?:string,data?:string
    */
   async send(params:{to:string,value?:string,data?:string}){
     const b= await this._buildTransaction(params)
     if(!b.sha256Hash){
        throw new Error('there is not signature info in _buildTransaction()')
     }
     const signature = await this.signTransaction(b.sha256Hash)
     const tx = await this._provider.sendSignTransaction({
         rawTx:b.rawTx,
         signature
     })
     return tx
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
   async deploy(abi:any,bytecode:any,options?:any){
      if(!this._provider){
         throw new Error('you have no provider to do that')
      }
      const factory = new ContractFactory(abi,bytecode,this._provider)
      const contract = await factory.deploy()
      console.log(contract,'deploy');
      
      // await contract.deployed()
      // return `Deployment successful! Contract Address: ${contract.address}`
   }

   async addTokenAssets(){
      if(this._wallet&&this._wallet.isMetaMask===true){
         const addToken = await this._wallet.request({
            method: "wallet_watchAsset",
            params: {
               "type": "ERC20",
               "options": {
                   "address": "0x0c680c2fb0c5f2c4fcaff64e368dfc7192b73b04",
                   "symbol": "ZHF",
                   "decimals": 8,
                   "image": ""
               }
           },
         })
      }else{
         throw new Error('please connect metamask')
      }
   }

   private async addBtyChain(){
      if(this._wallet&&this._wallet.isMetaMask===true){
        const addBty =  await this._wallet.request({ method: 'wallet_addEthereumChain' ,params:[
            {
               "chainId": "0x1",
               "chainName": "Bty Chain",
               "rpcUrls": [
                  this._jsonRpcUrl
               ],
               // "iconUrls": [
               //     "https://xdaichain.com/fake/example/url/xdai.svg",
               //     "https://xdaichain.com/fake/example/url/xdai.png"
               // ],
               "nativeCurrency": {
                   "name": "BTY",
                   "symbol": "BTY",
                   "decimals": 8
               },
         
           }
         ]})

         console.log(addBty);
         
      }else{
         throw new Error('please connect metamask')
      }
   }

   private async _metaMaskInit(){
      //detect if the metamask installed
      if(!MetaMaskOnboarding.isMetaMaskInstalled() || !(window as any).ethereum){
         console.log('没有检测到metamask安装');
         this._onboarding.startOnboarding()
         // this._onboarding.stopOnboarding()
      }
      //add metamask to this._wallet
      this._wallet = (window as any).ethereum
      this._provider = new BtyProvider(this._jsonRpcUrl,'metamask')

      if(!this._wallet.selectedAddress){
         try{
            const accont = await this._wallet.request({ method: 'eth_requestAccounts' })
            if(accont.length > 0){
              return accont[0]
            }else {
               throw new Error('metamask里没有账户')
            }
         }catch(err){
            console.log(err);
         }
      }else{
         return this._wallet.selectedAddress
      }
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