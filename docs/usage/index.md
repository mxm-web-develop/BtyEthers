# 使用说明
Chain33 to Ethereum 是基于[ethers.js](https://docs.ethers.io/v5/) 衍生的工具包，用于更好的支持Chain33（如Bty 以太坊格式链）对开源钱包和方法的支持

## 基本使用
- ### 安装
```dotnetcli
    yarn add chain33/ethers.js
```

- ### 初始化
```typescript
 const btyEther = new BtyEthers("https://jsonRpc.com").connect('metamask')
```

- ### 发送交易
```typescript
const sendTransaction = await btyEther.send({
    to:'0x89c893e850cff3d531f4c477112F052a536E4843',value:'10000000000'
})   

```

- ### 部署合约
```typescript
const res = await btyEther.deploy(mycontract.abi,mycontract.bytecode)
```