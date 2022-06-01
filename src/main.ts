// import detectEthereumProvider from '@metamask/detect-provider';
// import MetaMaskOnboarding from '@metamask/onboarding';
import { BtyProvider,BtySigner } from './BtyEthers/Provider'
import {Contract} from './BtyEthers/Contract'
// import BtyEthers from './BtyEthers'; 
import MetaMaskOnboarding from '@metamask/onboarding';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers,BigNumber,utils,ContractFactory,Wallet } from 'ethers';
import abi from './abi.json'
import erc20 from './erc20.json'
import mycontract from './Lottery.json'
import { sign } from 'crypto';
import { createLoginBox } from './BtyEthers/View';
import BtyEthers from './BtyEthers';
import './style.css'
//eth_estimateGas
// console.log(abi);



(async function(){
  const web3 = new BtyEthers("https://121.52.224.82:8546")
  // web3.connect('metamask')
  // const onboarding = new MetaMaskOnboarding();
  // const metamaskProvider = await detectEthereumProvider();
  // metamaskProvider.
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="py-10 min-w-[725px]">
      <div class='header px-5 text-xl py-3 border-b'>
         BtyEthers.js Methods
      </div>
      <div class='Core  px-5 text-lg py-2 opacity-50'>
        Core Functions
      </div>
      <div id='main' class=' grid grid-cols-3 py-5 justify-items-center gap-y-2 max-w-5xl' >
      </div>

      <div class='Contract  px-5 text-lg py-2 opacity-50'>
        Contract Functions
       </div>

       <div id='contract' class=' grid grid-cols-3 py-5 justify-items-center  gap-y-2 max-w-5xl' >
       </div>

       <div class='Contract  px-5 text-lg py-2 opacity-50'>
        Views Functions
      </div>
      <div id='view' class=' grid grid-cols-3 py-5 justify-items-center  gap-y-2 max-w-5xl' >
      </div>
    </div>
  `
  const buildButton = (text:string,twClass?:string)=>{
      let el = document.createElement('button')
      el.innerText = text
      twClass?
        el.setAttribute('class',twClass):''
      return el
  }
  // core methods
  const btnStyle = ' py-3 px-5 min-w-[220px] shadow m-2  hover:shadow-md rounded-md'
  const btndisableStyle = ' py-3 px-5 min-w-[220px] shadow m-2 text-gray-400 cursor-not-allowed rounded-md'



  const sendBtn = buildButton('send transaction',btnStyle)
  const logoutBtn = buildButton('logout web3 account',btnStyle)
  const connect = buildButton('connect metamask',btnStyle)
  const getBalance = buildButton('get Balance',btnStyle)
  const getBlock = buildButton('get Block',btnStyle)
  const getBlockNumber = buildButton('get BlockNumber',btnStyle)
  const network = buildButton('network',btnStyle)
  const getGasPrice = buildButton('getGasPrice',btnStyle)
  const addTokenAssets = buildButton('addTokenAssets',btnStyle)



  // container
  const main = document.getElementById('main')
  const contracts = document.getElementById('contract')
  const view = document.getElementById('view')


  // contract methods
  const getContract = buildButton('getContract',btnStyle)
  const setContractInstance = buildButton('setContractInstance',btnStyle)
  const callContractMetthod = buildButton('callContractMetthod',btnStyle)
  const isContract = buildButton('isContract',btnStyle)
  const deploy = buildButton('deploy',btnStyle)


  //view methods
  const toggleLogin = buildButton('toggleLogin',btnStyle)

  // const getBlockWithTransactions = buildButton('get Block With Transactions',btnStyle)
  main.append(connect,sendBtn,getBalance,getBlock,getBlockNumber,network,getGasPrice,addTokenAssets)
  contracts.append(getContract,setContractInstance,callContractMetthod,isContract,deploy)
  view.append(toggleLogin)
  // const logoutBtn = document.createElement('button')

  

  sendBtn.onclick = async ()=>{
    const sendTransaction = await web3.send({
      to:'0x89c893e850cff3d531f4c477112F052a536E4843',value:'10000000000'
    })   
  }

  deploy.onclick = async ()=>{
    const res = await web3.deploy(mycontract.abi,mycontract.bytecode)
    console.log(res);
    
  }
  getGasPrice.onclick = async ()=>{
    const network = await web3.getGasPrice()
    console.log(network); 
  }
  addTokenAssets.onclick = async ()=>{
    const network = await web3.addTokenAssets()
    console.log(network); 
  }

  getContract.onclick = async ()=>{
    const c =  web3.contract
    console.log(c);
  }

  setContractInstance.onclick = async()=>{
    const c = await web3.setContractInstance('0x0c680c2fb0c5f2c4fcaff64e368dfc7192b73b04',erc20)
    return c
  }

  callContractMetthod.onclick= async ()=>{
     const res = await web3.callContractMetthod('transfer',['0x89c893e850cff3d531f4c477112F052a536E4843',14442223])
     console.log(res);
     
  }
  isContract.onclick= async ()=>{
    const res = await web3.isContract('0x89c893e850cff3d531f4c477112F052a536E4843')

    console.log(res);
    
  }


  network.onclick = async ()=>{
    const network = await web3.detectNetwork()
    console.log(network); 
  }
  getBlock.onclick=async ()=>{
    const code = await web3.getBlock()
    console.log(code);
    
  }

  getBlockNumber.onclick=async ()=>{
    const blockNumber = await web3.getBlockNumber()
    console.log(blockNumber);
  }

  toggleLogin.onclick=async ()=>{
    // web3._view.toggleLogin();
    web3.toggelViewLogin()

  }

  getBalance.onclick = async ()=>{
    const balance = await web3.getBalance()
    console.log(balance);
    
  }

  logoutBtn.onclick=async ()=>{
    await web3.disconnect()
  }
  connect.onclick=async()=>{
    await web3.connect('metamask')
  }
  





  // const tx =  await web3._buildTransaction({to:'0x89c893e850cff3d531f4c477112F052a536E4843',value:'200000'})
  // console.log();

  

  























  // const metamask = (window as any).ethereum
  // const provider =  new BtyProvider("http://121.52.224.82:8546","metamask")
//0x0c680c2fb0c5f2c4fcaff64e368dfc7192b73b04
  // const myContract = new Contract('0x0c680c2fb0c5f2c4fcaff64e368dfc7192b73b04',erc20,provider)
  // console.log(typeof myContract.functions);

  // let account =[''] 
  // console.log(provider);
  // const chainId = await provider.getNetwork()
  //metamask插件已经安装
//   const metamaskConnect = metamask.isConnected()
// console.log(provider);

  // if(metamaskConnect){
  //   if(!metamask.selectedAddress){
  //     account =   await metamask.request({ method: 'eth_requestAccounts' })
  //     const signer =  provider.getSigner(account[0])
  //   }else{
      // const signer = await provider.getSigner(metamask.selectedAddress)
      // const connect = await signer.connectUnchecked()
      // const sign = await signer.signTransaction('123')
    
      // createLoginBox()
      // const addr = await signer.getAddress()
      // console.log(addr);
      // const onboarding = new MetaMaskOnboarding();
      // onboarding.stopOnboarding()
      // metamask.request({ method: 'eth_requestAccounts' })
      // const signer = await provider.getSigner(metamask.selectedAddress)
      // const balance = await provider.getBalance(signer._address)
      
      // console.log(      MetaMaskOnboarding.isMetaMaskInstalled());
      

      // const myFunctions = myContract.functions
      // Object.entries(myFunctions)
      // const c= await myContract.connect(provider)
      // const blac = await c['transfer']('0x89c893e850cff3d531f4c477112F052a536E4843',1444444)
      // console.log(BigNumber.from(blac).toNumber());
      
      
    
      // const {rawTx,sha256Hash} = await provider.createRawTransaction({   
      //   from: metamask.selectedAddress,
      //   to: "0xa9D9a61bd8469E8106f7Ea8B674006dA7f1F3C30",
      //   gas:(6*1e5).toString(),
      //   gasPrice:'1',
      //   value:(60*1e18).toString()
      // })
      // console.log(sha256Hash,rawTx);
      // const getAcc= await metamask.request({ method: 'eth_requestAccounts' })
      // console.log(getAcc);
      
      // const signature = await metamask.request({
      //   method: "eth_sign",
      //   params: [metamask.selectedAddress, sha256Hash],
      // });
      // console.log(signature);
      
      // const send = await provider.sendSignTransaction({
      //   rawTx:rawTx,
      //   signature:sha256Hash
      // })
  
  
  
    // }




    //sha 
    //0x234f778354b7f5348109400043b7d559efd0b31e00f88b7cf35828e6aa3e8ee9 
    
    //rawTx 
    //0x0a05636f696e73120a18010a061080f882ad1620a08d0630b6d2a2eed7dc89c5093a2a3078613964396136316264383436396538313036663765613862363734303036646137663166336333305816
















    









    // const height = await provider.getBlockWithTransactions(50)
    
    

    // console.log(rawTransition);
    
    // console.log(
    //   // web3.utils.numberToHex(6*1e5),web3.utils.numberToHex(1),web3.utils.numberToHex(100 * 1e18)
    //   BigNumber.from((6*1e5).toString()).toHexString()
    // )

    

    // const balance = await provider.getBalance(addr)
    // const filterBigNumber = ethers.utils.formatEther(BigNumber.from(balance).toString() ) 

   const abiInterface = new utils.Interface(abi).decodeFunctionData('transfer','0xa9059cbb000000000000000000000000d741c9f9e0a1f5bb1ed898115a683253f14c1f8b00000000000000000000000000000000000000000000000000000005f5e10000')

    
    
    
  
    
    // const myContract = new Contract('0x5de40864db18e77e298b4131e59e7d3e862cca47',abi,provider)
    // console.log(myContract);

    // const transfer =   abiInterface.getFunction('transfer')

    // const CF =  ContractFactory.getContractAddress({from:'0x5de40864db18e77e298b4131e59e7d3e862cca47'})

  //}
  
 

})()