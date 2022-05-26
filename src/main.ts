// import detectEthereumProvider from '@metamask/detect-provider';
// import MetaMaskOnboarding from '@metamask/onboarding';
import { BtyProvider,BtySigner } from './CTE/Provider'
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers,BigNumber,Contract,utils,ContractFactory,Wallet } from 'ethers';
import abi from './abi.json'
import { sign } from 'crypto';
import { createLoginBox } from './CTE/View';
//eth_estimateGas
// console.log(abi);



(async function(){
  // const onboarding = new MetaMaskOnboarding();
  // const metamaskProvider = await detectEthereumProvider();
  // metamaskProvider.
  const app = document.getElementById('app')
  app.innerHTML = `
    <div>
      this is my Web3 Tools
    </div>
    <button
  `
  const metamask = (window as any).ethereum
  const provider =  new BtyProvider("http://121.52.224.82:8546")
  // let account =[]
  // console.log(provider);
  // const chainId = await provider.getNetwork()
  //metamask插件已经安装
  const metamaskConnect = metamask.isConnected()

  if(metamaskConnect){
    if(!metamask.selectedAddress){
      // account =   await metamask.request({ method: 'eth_requestAccounts' })
      // const signer =  provider.getSigner(account[0])
      // console.log(signer);
      
    }else{
      // const signer = await provider.getSigner(metamask.selectedAddress)
      // const connect = await signer.connectUnchecked()
      // const sign = await signer.signTransaction('123')
    
      // createLoginBox()
      // const addr = await signer.getAddress()
      // console.log(addr);
  
   
      // metamask.request({ method: 'eth_requestAccounts' })
      // const signer = await provider.getSigner(metamask.selectedAddress)
      // const balance = await provider.getBalance(signer._address)
  
    
      const {rawTx,sha256Hash} = await provider.createRawTransaction({   
        from: metamask.selectedAddress,
        to: "0xa9D9a61bd8469E8106f7Ea8B674006dA7f1F3C30",
        gas:(6*1e5).toString(),
        gasPrice:'1',
        value:(60*1e18).toString()
      })
      // console.log(sha256Hash,rawTx);
      const getAcc= await metamask.request({ method: 'eth_requestAccounts' })
      const signature = await metamask.request({
        method: "eth_sign",
        params: [metamask.selectedAddress, sha256Hash],
      });
      console.log(signature);
      
      // const send = await provider.sendSignTransaction({
      //   rawTx:rawTx,
      //   signature:sha256Hash
      // })
  
  
  
    }




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

  }
  
 

})()