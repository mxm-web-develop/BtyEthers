# 模块详情
BtyEthers 是一个 [ethers.js](https://docs.ethers.io/v5/) 衍生的工具包, 改文档只会标注BtyEthers和[ethers.js](https://docs.ethers.io/v5/)不同的地方，其余方法的详细使用请查[ethers.js](https://docs.ethers.io/v5/)的官网文档

## 结构
```dotnetcli
    - BtyEthers
        - components
            - ...browser views components
        - Contract
        - Provider
        - Version.ts
        - view.tsx
        - Index.ts
```
## Index.ts
BtyEthers的结构体出口文件，整合了大量Ether可用的方法，部分流程上的修改用于适应Bth链的兼容
### connect(_signerType)
链接钱包，目前只支持 _signerType = 'metamask',后期会加入其他第三方安全的钱包

---------   

## Contract
合约结构体大部分继承，使用了ethers.js中的[Contract](https://docs.ethers.io/v5/api/contract/)模块，对buildSend及相关的模块进行了流程修改来适应btyEther节点的设计，所有Ethers.js支持的Contract方法你可以在getContract()的返回值中获得。
---------   
## Components
文件夹存放了部分前端ui tempalte,如’登录框'