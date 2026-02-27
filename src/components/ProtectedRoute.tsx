import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextComponent';
import Skeleton from './Skeleton';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-bg flex p-6">
                {/* Fixed sidebar skeleton */}
                <div className="hidden sm:block w-72 h-full fixed left-0 top-0 border-r border-border p-5 space-y-6">
                    <Skeleton className="h-10 w-3/4 mb-10" />
                    <Skeleton className="h-10 w-full" />
                    <div className="space-y-3 mt-10">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>

                {/* Main content skeleton */}
                <div className="flex-1 sm:ml-72 flex flex-col items-center justify-center">
                    <div className="max-w-md w-full p-8 text-center space-y-6">
                        <Skeleton variant="circular" className="w-24 h-24 mx-auto" />
                        <Skeleton className="h-8 w-3/4 mx-auto" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;