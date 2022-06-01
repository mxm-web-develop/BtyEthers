# 模块详情
BtyEthers 是一个 [ethers.js](https://docs.ethers.io/v5/) 衍生的工具包, 改文档只会标注BtyEthers和[ethers.js](https://docs.ethers.io/v5/)不同的地方，其余方法的详细使用请查[ethers.js](https://docs.ethers.io/v5/)的官网文档

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
## Index.ts
BtyEthers的结构体出口文件，整合了大量Ether可用的方法，部分流程上的修改用于适应Bth链的兼容

- ### 链接
    connect(_signerType)
    链接钱包，目前只支持 _signerType = 'metamask',后期会加入其他第三方安全的钱包

- ### 断开链接
    disconnect()
    断开链接（注意：metamask并不会被disconnect真正断开，如果要完全登出metamask账号需手动操作metamask插件来关闭，这里的断开只是断开用户使用btyEther方法的权限）


- ### 获取区块链块数量
    getBlockNumber()
    完全继承于[ethers.js](https://docs.ethers.io/v5/) getBlockNumber()方法

- ### 获取区块链块信息
    getBlock()
    完全继承于[ethers.js](https://docs.ethers.io/v5/) getBlock()方法
- ### 获取网络信息
    detectNetwork()
    完全继承于[ethers.js](https://docs.ethers.io/v5/) detectNetwork()方法
- ### 获取交易费价格
    getGasPrice()
    完全继承于[ethers.js](https://docs.ethers.io/v5/) getGasPrice()方法

- ### 获取用户信息
    getSigner()
    在使用metamask的时候返回 window.etherumn

- ### 初始化合约对象
    setContractInstance(contractAddress: string,abi:any)
    返回一个ethers.js中的[Contract](https://docs.ethers.io/v5/api/contract/)结构，用于做合约操作

- ### 使用合约方法
    callContractMetthod(methodName: string,params?:any[])
    网络请求Contract对象中的方法
```ts

    const res = await web3.callContractMetthod('transfer',['0x89c893e850cff3d531f4c477112F052a536E4843',14442223])
    return res

```
- ### 查看合约地址
    isContract(contractAddress: string)
    用于查看一个地址是否是合约地址

- ### 发送主链交易 
    send((params:{to:string,value?:string,data?:string}))
    主链上的交易发送函数，包括构造->签名（根据登录方式）->发送签名交易

- ### 签名交易
    signTransaction(data: string)
    根据不同的登录方式，对交易数据进行签名

- ### 合约部署
    `deploy(abi:any,bytecode:any,options?:any)`
    进行合约的部署交易发送

- ### 添加token到metamask
    addTokenAssets(data:any)
    根据config中的配置对metaMask中的token显示列表进行配置 

- ### 其他方法
    btyEther完全继承于[ethers.js](https://docs.ethers.io/v5/)，所以大部分ethers.js的方法可以通过btyEthers._provider或者btyEthers._contract来进行访问，注意，btyEhters没有相同的signer对象，因为btyEthers是根据用户使用的第三方安全web3插件登录信息来获取signer信息，并不储存signer信息

## Contract
合约结构体大部分继承，使用了ethers.js中的[Contract](https://docs.ethers.io/v5/api/contract/)模块，对buildSend及相关的模块进行了流程修改来适应btyEther节点的设计，所有Ethers.js支持的Contract方法你可以在getContract()的返回值中获得。


## Components
文件夹存放了部分前端ui tempalte,如’登录框'