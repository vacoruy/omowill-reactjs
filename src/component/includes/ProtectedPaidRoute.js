import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const ProtectedPaidRoute = ({ children }) => {
    const { omowillPaidAuth } = useContext(AuthContext);

    if (!omowillPaidAuth) {
        return <Navigate to="/requestFileView" />
    }

    return children
};

export default ProtectedPaidRoute;