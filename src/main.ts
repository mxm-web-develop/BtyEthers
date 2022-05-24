// import detectEthereumProvider from '@metamask/detect-provider';
// import MetaMaskOnboarding from '@metamask/onboarding';
import { BtyProvider,BtySigner } from './CTE/Provider'
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers,BigNumber,Contract,utils,ContractFactory,Wallet } from 'ethers';
import  Web3 from 'web3';
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
  // const web3 = new Web3("http://121.52.224.82:8546");
  // console.log(provider);
  const chainId = await provider.getNetwork()
  console.log(BigNumber.from(chainId.chainId).toHexString() );

  metamask.request({ method: 'eth_requestAccounts' });

  //metamask插件已经安装
  const metamaskConnect = metamask.isConnected()
  // console.log(metamask); 
  
  if(metamaskConnect){

    if(!metamask.selectedAddress){
      metamask.request({ method: 'eth_requestAccounts' }).then((acc:any)=>{
        console.log(acc);
          if(acc){
            window.location.reload()
          }
      })


    }else{
      const signer = await provider.getSigner(metamask.selectedAddress)
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
      console.log(sha256Hash,rawTx);
      const getAcc= await metamask.request({ method: 'eth_requestAccounts' })
      const signature = await metamask.request({
        method: "eth_sign",
        params: [getAcc[0], sha256Hash],
      });


  
  
  
  
    }





    

    // const height = await provider.getBlockWithTransactions(50)
    
    

    // console.log(rawTransition);
    
    // console.log(
    //   // web3.utils.numberToHex(6*1e5),web3.utils.numberToHex(1),web3.utils.numberToHex(100 * 1e18)
    //   BigNumber.from((6*1e5).toString()).toHexString()
    // )

    

    
    

    // const balance = await provider.getBalance(addr)
    // const filterBigNumber = ethers.utils.formatEther(BigNumber.from(balance).toString() ) 

   const abiInterface = new utils.Interface(abi).decodeFunctionData('transfer','0xa9059cbb000000000000000000000000d741c9f9e0a1f5bb1ed898115a683253f14c1f8b00000000000000000000000000000000000000000000000000000005f5e10000')

    
    
    
  
    
    const myContract = new Contract('0x5de40864db18e77e298b4131e59e7d3e862cca47',abi,provider)
    // console.log(myContract);

    // const transfer =   abiInterface.getFunction('transfer')

    // const CF =  ContractFactory.getContractAddress({from:'0x5de40864db18e77e298b4131e59e7d3e862cca47'})

  }
  
 
  // web3.extend({
  //   property: "BTY",
  //   methods: [
  //     {
  //       name: "createRawTransaction",
  //       call: "eth_createRawTransaction",
  //       params: 1,
  //     },
  //     {
  //       name: "sendSignedTransaction",
  //       call: "eth_sendSignedTransaction",

  //       params: 1,
  //     },
  //   ],
  // });
  // const gasPrice = await web3.eth.getGasPrice();

  // const { rawTx, sha256Hash } = await (web3 as any).BTY.createRawTransaction({
  //   from: web3.givenProvider!.selectedAddress,
  //   to: "0x5de40864db18e77e298b4131e59e7d3e862cca47",
  //   gas: web3.utils.numberToHex(5 * 1e5),
  //   gasPrice: web3.utils.stringToHex(gasPrice),
  //   value: web3.utils.numberToHex(100 * 1e18),
  // //  data:"0xa9059cbb000000000000000000000000d741c9f9e0a1f5bb1ed898115a683253f14c1f8b00000000000000000000000000000000000000000000000000000005f5e10000"
  // });
  // console.log(rawTx);
  

  // console.log(web3.givenProvider!.selectedAddress);
  // const msgParams = test
  // const from  = web3.givenProvider!.selectedAddress
  // // const msgParams = {
  // //   domain: {
  // //     chainId: "22",
  // //     name: 'Ether Mail',
  // //     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  // //     version: '1',
  // //   },
  // //   message: {
  // //     contents: 'Hello, Bob!',
  // //     from: {
  // //       name: 'Cow',
  // //       wallets: [
  // //         '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  // //         '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
  // //       ],
  // //     },
  // //     to: [
  // //       {
  // //         name: 'Bob',
  // //         wallets: [
  // //           '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  // //           '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
  // //           '0xB0B0b0b0b0b0B000000000000000000000000000',
  // //         ],
  // //       },
  // //     ],
  // //   },
  // //   primaryType: 'Mail',
  // //   types: {
  // //     EIP712Domain: [
  // //       { name: 'name', type: 'string' },
  // //       { name: 'version', type: 'string' },
  // //       { name: 'chainId', type: 'uint256' },
  // //       { name: 'verifyingContract', type: 'address' },
  // //     ],
  // //     Group: [
  // //       { name: 'name', type: 'string' },
  // //       { name: 'members', type: 'Person[]' },
  // //     ],
  // //     Mail: [
  // //       { name: 'from', type: 'Person' },
  // //       { name: 'to', type: 'Person[]' },
  // //       { name: 'contents', type: 'string' },
  // //     ],
  // //     Person: [
  // //       { name: 'name', type: 'string' },
  // //       { name: 'wallets', type: 'address[]' },
  // //     ],
  // //   },
  // // };
  
  // // const signature = await metamask.request({
  // //   method: "eth_signTypedData_v3",
  // //   params: [from, JSON.stringify(msgParams)],
  // // });

  // // console.log(signature);
  
  // // const afterTxSended = await (web3 as any).BTY.sendSignedTransaction({
  // //   rawTx,
  // //   signature,
  // // });


})()