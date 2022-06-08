import { createContext, Dispatch, SetStateAction, useContext } from "react";
import BtyEthers from "../chain33Ethers";
import { CoreApis } from "./api";




export const AppStore = createContext<{network:number,
    connect:boolean,
    wallet:BtyEthers,
    api:typeof CoreApis | null
    doSetConnect:Dispatch<SetStateAction<boolean>>
}>(null)

const StoreProvider = ()=>{

    
}