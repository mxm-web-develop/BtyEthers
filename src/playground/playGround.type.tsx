import { coreApi, setupApi } from "./api";

export interface IProps{
    children?:any
}
interface REQUEST_TYPE{
    type:string;
    name:string;
    default?:string;
    el:string
    required?:boolean;
    placeholder?:string
}

export type API_TYPE = {
    methodName:string
    request?:REQUEST_TYPE[]
}[]