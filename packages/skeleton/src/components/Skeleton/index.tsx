import * as React from "react";
import { Skeleton as AntSkeleton, SkeletonProps } from "antd";

const Skeleton = (props: SkeletonProps) => {
  return <AntSkeleton {...props} />;
};

export default Skeleton;
