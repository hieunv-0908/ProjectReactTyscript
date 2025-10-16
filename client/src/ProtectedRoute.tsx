import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const user = sessionStorage.getItem("user");
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;