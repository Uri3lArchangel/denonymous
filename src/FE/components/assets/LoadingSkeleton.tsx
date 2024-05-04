import React from 'react';
import loading from '@/public/styles/loading.module.css'

interface LoadingSkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
    borderRadius = '4px',
    className = '',
}) => {
    return (
        <div
            className={`loading_skeleton ${className}`}
            style={{ borderRadius }}
        ></div>
    );
};

export default LoadingSkeleton;
