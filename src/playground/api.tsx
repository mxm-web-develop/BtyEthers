export enum APIs{
    SETUP,
    CORE,
    CONTRACT, 
    VIEW
}


export const setupApi = [
    {
        methodName:'connect',
        request:[
            {
                type:"string",
                name:"wallet-type",
                default:'metamask',
                required:true,
                el:"input"
            }
        ]       
    }, 
    {
        methodName:'disConnect',

    },
    {
        methodName:'addTokenAssets',
    },
    {
        methodName:'switchChain'
    },
    {
        methodName:'addChain'
    }
]
export const coreApi = [
    {
        methodName:'sendTransaction',
        request:[
            {
                type:"string",
                name:"to",
                el:"input",
                placeholder:"to address"
            },
            {
                type:"string",
                name:"value",
                el:"input",
                placeholder:"amount value"
            },
        ]         
    }, 

    {
        methodName:'getBalance',
    },
    {
        methodName:'getBlock',
        request:[
            {
                type:"string",
                name:"block",
                default:'latest',
                el:"input",
                placeholder:"block number or latest"
            }
        ]   
               
    }, 
    {
        methodName:'getBlockNumber',       
           
    }, 
    {
        methodName:'getGasPrice',
        
    }, 
    {
        methodName:'network',
             
    }, 
    // {
    //     methodName:'getTransactionCount'
    // },
    {
        methodName:'getTransactionReceipt',
        request:[
            {
                type:"string",
                name:"hash",
                el:"input",
                placeholder:"input transaction hash"
            }
        ]   
    },
    {
        methodName:'getTransaction',
        request:[
            {
                type:"string",
                name:"hash",
                el:"input",
                placeholder:"input transaction hash"
            }
        ] 
    },
    {
        methodName:'getCode'
    }
]

export const contractApi = [
    {
        methodName:'deploy',
        request:[
            {
                type:"string",
                name:"deployBytes",
                el:"input",
                placeholder:"bytes code"
            },
            {
                type:"string",
                name:"deployAbi",
                el:"textarea",
                placeholder:"input transaction hash"
            },
  
        ] 
    },
    {
        methodName:'setContract',
        request:[
            {
                type:"string",
                name:"contractAddrs",
                el:"input",
                placeholder:"input contract address"
            },
            {
                type:"string",
                name:"abi",
                el:"textarea",
                placeholder:"input abi"
            }
  
        ] 
    },

    {
        methodName:'callContractMetthod',
        request:[
            {
                type:"string",
                name:"methodName",
                el:"input",
                placeholder:"input contract method name"
            },
            {
                type:"string",
                name:"params",
                el:"textarea",
                placeholder:"input params as Json array, for exmaple :0x89c893e850cff3d531f4c477112F052a536E4843,14442223"
            }
        ]
    },
    {
        methodName:'isContract',
        request:[
            {
                type:"string",
                name:"isContractAddr",
                el:"input",
                placeholder:"contract address"
            }
        ]
    },
 
]

export const viewApi =[
    {
        methodName:'toggleLogin'
    }
]