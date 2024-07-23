import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const ProtectedRoute = ({ children }) => {
    const { omowillAuth } = useContext(AuthContext);

    if (!omowillAuth.isAuth) {
        return <Navigate to="/login" />
    }

    return children
};

export default ProtectedRoute;