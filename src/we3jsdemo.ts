  
  
  //  const web3 = new Web3("http://121.52.224.82:8546");
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

