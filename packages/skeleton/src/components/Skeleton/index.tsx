import * as React from "react";
import { Skeleton } from 'antd';

interface SkeletonProps{
    data:string
}

const MilliSkeleton = ({data}:SkeletonProps) => {
    return(
        <div>
            <Skeleton>data</Skeleton>
        </div>
    )
}

export default MilliSkeleton;