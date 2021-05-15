import * as React from "react";
import { Skeleton } from 'antd';

interface SkeletonProps{
    data:string
    active:boolean
    loading:boolean
}

const MilliSkeleton = ({loading,active}:SkeletonProps) => {
    return(
        <div>
            <Skeleton active={active} loading={loading}>
                something
                something
                something
                something
                something
            </Skeleton>
        </div>
    )
}

export default MilliSkeleton;