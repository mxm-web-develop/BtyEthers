
export const CoreApis = [
    {
        methodName:'connect',
        fn:()=>{ console.log('connect') },
        request:[
            {
                type:"string",
                name:"wallet-type",
                default:'metaMask',
                el:"input"
            }
        ]       
    }, 
    {
        methodName:'disConnect',
        fn:()=>{ console.log('disConnect') }
    },
    {
        methodName:'sendTransaction',
        fn:()=>{ console.log('sendTransaction') }       
    }, 
    {
        methodName:'getBalance',
        fn:()=>{ console.log('getBalance') }
    },
    {
        methodName:'getBlock',
        fn:()=>{ console.log('getBlock') }       
    }, 
    {
        methodName:'getBlockNumber',
        fn:()=>{ console.log('getBlockNumber') }       
    }, 
    {
        methodName:'getGasPrice',
        fn:()=>{ console.log('getGasPrice') }       
    }, 
    {
        methodName:'network',
        fn:()=>{ console.log('network') }       
    }, 
    {
        methodName:'addTokenAssets',
        fn:()=>{ console.log('addTokenAssets') }       
    }
]