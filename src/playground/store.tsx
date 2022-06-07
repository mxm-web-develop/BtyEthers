import { createContext, useContext } from "react";
import BtyEthers from "../chain33Ethers";

const initState = {
    network:0,
    connect:false,
    wallet:typeof BtyEthers
}

export const AppStore = createContext<{network:number,connect:boolean,wallet:BtyEthers}>(null)