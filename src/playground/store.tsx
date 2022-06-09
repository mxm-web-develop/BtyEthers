import { createContext, Dispatch, SetStateAction, useContext } from "react";
import BtyEthers from "../chain33Ethers";
import { coreApi } from "./api";




export const AppStore = createContext<{network:number,
    connect:boolean,
    wallet:BtyEthers,
    doSetConnect:Dispatch<SetStateAction<boolean>>
}>(null)

