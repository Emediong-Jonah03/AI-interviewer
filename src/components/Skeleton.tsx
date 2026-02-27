

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
}

const Skeleton = ({ className = "", variant = 'rectangular' }: SkeletonProps) => {
    const variantClasses = {
        text: 'h-4 w-full rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg'
    };

    return (
        <div
            className={`
                animate-pulse bg-surface-light/20
                ${variantClasses[variant]}
                ${className}
            `}
        />
    );
};

export default Skeleton;
