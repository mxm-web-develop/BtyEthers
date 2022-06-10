# 模块详情
chain33Ethers 是一个 [ethers.js](https://docs.ethers.io/v5/) 衍生的工具包, 改文档只会标注BtyEthers和[ethers.js](https://docs.ethers.io/v5/)不同的地方，其余方法的详细使用请查[ethers.js](https://docs.ethers.io/v5/)的官网文档

## 结构
```dotnetcli
    - BtyEthers
        - components
            - ...browser views components
        - config.ts
        - Contract
        - Provider
        - Version.ts
        - view.tsx
        - Index.ts
```
## Setup

- ### 链接
    **connect(signerType)**

    链接钱包，目前只支持 signerType = 'metamask',后期会加入其他第三方安全的钱包

   **params**

    signerType:SignerType
    ```ts
    export type SignerType =  'metamask'| 'walletconnect'| 'hdwallet'
    ```

   **returns**

   _address:当前账户地址

   _provider:当前的提供者，[provider继承自ether.js的BaseProvider类](https://github.com/mxm-web-develop/BtyEthers/blob/main/src/chain33Ethers/Provider.ts)

   _signerType:SignerType,当前签名类型
   ```ts
    export type SignerType =  'metamask'| 'walletconnect'| 'hdwallet'
    ```

   __wallet:web3浏览器的当前用户
   

- ### 断开链接
    **disconnect()**

    断开链接（注意：metamask并不会被disconnect真正断开，如果要完全登出metamask账号需手动操作metamask插件来关闭，这里的断开只是断开用户使用btyEther方法的权限）

    **param**

    void

    **returns**

     _address:当前账户地址

   _provider:当前的提供者，[provider继承自ether.js的BaseProvider类](https://github.com/mxm-web-develop/BtyEthers/blob/main/src/chain33Ethers/Provider.ts)

   _signerType:SignerType,当前签名类型
   ```ts
    export type SignerType =  'metamask'| 'walletconnect'| 'hdwallet'
    ```

   __wallet:web3浏览器的当前用户
- ### 添加token到metamask
    **addTokenAssets()**

    根据config中的配置对metaMask中的token显示列表进行配置 

    **param**
    void

    **returns**
    void

## Core
BtyEthers的结构体出口文件，整合了大量Ether可用的方法，部分流程上的修改用于适应Bth链的兼容

- ### 发送主链交易 
    **send((params:{to:string,value?:string,data?:string}))**

    主链上的交易发送函数，包括构造->签名（根据登录方式）->发送签名交易

    **param**
    
    to:string，指定的发送者的地址

    value:string,（可选）交易携带的货币量

    data?:string，（可选）或者包含相关数据的字节字符串

    **returns**

    交易hash

- ### 获取账户余额
    **getBalance()**

    完全继承于[ethers.js](https://docs.ethers.io/v5/) getBalance()方法

    **param**
    
    void

    **returns**

    账户余额:BigNumber
    

- ### 获取最新区块的高度
    **getBlockNumber()**

    完全继承于[ethers.js](https://docs.ethers.io/v5/) getBlockNumber()方法

    **param**

    void

    **returns**

    最新区块的高度

- ### 获取区块信息
    **getBlock()**

    完全继承于[ethers.js](https://docs.ethers.io/v5/) getBlock()方法

    **param**

    block?:number|string，为空时获取最新区块信息

    **returns**

    区块信息

- ### 获取网络信息
    **detectNetwork()**

    根据ens解析chainID获取网络信息

    **param**

    void

    **returns**

    网络信息:Network
    ```ts
   export type Network = {
        name: string,
        chainId: number,
        ensAddress?: string,
        _defaultProvider?: (providers: any, options?: any) => any
    }
    ```

- ### 获取交易收据
    **getTransactionReceipt(hash:string)**

    根据交易hash获取交易收据信息

    **param**

    hash:string

    **returns**

    交易收据信息

- ### 获取交易信息
    **getTransaction(hash:string)**

    根据交易hash获取交易信息

    **param**

    hash:string

    **returns**

    交易信息

- ### 获取交易费价格
    **getGasPrice()**

    完全继承于[ethers.js](https://docs.ethers.io/v5/) getGasPrice()方法

    **param**

    void

    **returns**

    交易费价格

<!-- - ### 获取用户信息
    **getSigner()**
    
    在使用metamask的时候返回 window.ethereum

    **param**

    void

    **returns**

    用户信息 -->

- ### 其他方法
    btyEther完全继承于[ethers.js](https://docs.ethers.io/v5/)，所以大部分ethers.js的方法可以通过btyEthers._provider或者btyEthers._contract来进行访问，注意，btyEhters没有相同的signer对象，因为btyEthers是根据用户使用的第三方安全web3插件登录信息来获取signer信息，并不储存signer信息

## Contract
合约结构体大部分继承，使用了ethers.js中的[Contract](https://docs.ethers.io/v5/api/contract/)模块，对buildSend及相关的模块进行了流程修改来适应btyEther节点的设计，所有Ethers.js支持的Contract方法你可以在getContract()的返回值中获得。

- ### 合约部署
    **deploy(abi:any,bytecode:any,options?:any)**

    进行合约的部署交易发送

    **param**

    abi:any,合约的abi

    bytecode:any，合约的字节码

    options:any

    **returns**
    
    包含合约地址的信息
- ### 初始化合约对象
    **setContractInstance(contractAddress: string,abi:any)**

    返回一个ethers.js中的[Contract](https://docs.ethers.io/v5/api/contract/)结构，用于做合约操作
    
    **param**

    contractAddress: string，合约地址

    abi:any

    **returns**

    [Contract](https://docs.ethers.io/v5/api/contract/)


- ### 使用合约方法
    **callContractMetthod(methodName: string,params?:any[])**

    网络请求Contract对象中的方法

    **param**

    methodName: string,方法名称
    
    params?:any[]，请求参数

    **returns**
    
    方法的返回参数

- ### 判断合约地址
    **isContract(contractAddress: string)**
    
    用于查看一个地址是否是合约地址

    **param**

    contractAddress: string,合约地址

    **returns**
    ```ts
     {
         contract:boolean; //是否为合约地址
         data:string|null; //返回blockTag块高的地址的合约代码。如果当前没有部署合约，结果null
      }
    ```