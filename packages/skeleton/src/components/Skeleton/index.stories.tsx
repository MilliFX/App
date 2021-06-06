import * as React from "react";
import { default as Component } from ".";
export default {
    title: "@millifx/skeleton",
    component: Component,
  };

export const Skeleton = ()=>{
  return(
    <Component active={true} loading={true}/>
  ) 
}