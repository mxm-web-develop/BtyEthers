import { useState } from "react";

export const useAsyncState =(initialValue:any) =>{
    const [value, setValue] = useState(initialValue);
    const setter = (x:any) =>
      new Promise(resolve => {
        setValue(x);
        resolve(x);
      });
    return [value, setter];
  }

