import BScroll from "@better-scroll/core";
import ScrollBar from "@better-scroll/scroll-bar";
import React from "react";
import { IProps } from "./playGround.type";

interface ScrollViewProps extends IProps{
    wrapRef:string
    wrapHeight:string
}
export const ScrollView = (props: ScrollViewProps)=>{
    const {wrapRef,wrapHeight,children} = props;
    return (
        <div className="scroll-warpper" ref={wrapRef} style={{ height: wrapHeight, overflow: 'hidden' }}>
          <div className="scroll-content">
            {children}
          </div>
        </div>
      )
}