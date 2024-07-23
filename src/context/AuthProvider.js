import React, { createContext, useState, useCallback, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';

const cookies = new Cookies();

const authInfo = {
    userInfo: {
        id: 0,
        firstName: '',
        lastName: '',
        birthDate: '1997-07-22',
        prefectures: '',
        address1: '',
        address2: '',
        postalCode: '',
        apartment: '',
        email: '',
        password: '',
        comPassword: '',
        telephone: '',
        status: '',
        createdDate: '',
    },
    isAuth: false,
    id: 0,
}

const omowillPaidCookieInit = {
    auth: false,
    value: []
}

const AuthContext = createContext({
    userInfo: authInfo.userInfo,
    userData: {},
    handleLogin: () => { },
    setCookie: () => { },
    getUserData: () => { },
});

const handleCookie = () => {
    const allAuth = cookies.get('OMOWILL');

    let omowillCookies = {};

    if (allAuth === undefined || allAuth === null) {
        omowillCookies = authInfo;
    } else {
        omowillCookies = allAuth;
    }

    return omowillCookies;
};

const handlePaidCookie = () => {
    const allPaidCookie = cookies.get('OMOWILL-FILE');

    let omowillPaidCookie = {};

    if (allPaidCookie === undefined || allPaidCookie === null) {
        omowillPaidCookie = omowillPaidCookieInit;
    } else {
        omowillPaidCookie = allPaidCookie;
    }

    return omowillPaidCookie;

}

const AuthProvider = ({ children }) => {
    const [omowillAuth, setOmowillAuth] = useState(handleCookie());
    const [omowillPaidAuth, setOmowillPaidAuth] = useState(handlePaidCookie().auth);
    const [paidUserIdx, setPaidUserIdx] = useState(handlePaidCookie().value);

    const [userData, setUserData] = useState({});

    const handleLogin = useCallback(async (userInfo) => {
        var result = null;

        const requestBody = userInfo;

        try {
            var endpoint = '/login';
            const response = await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, requestBody);

            result = response.data;
        } catch (error) {
            toast.error('Please check the network Connection. catch');
        }

        if (result === 'incorrect login info') {
            result = false;
        }

        return result;
    }, []);

    const setCookie = (cookieInfos) => {
        setOmowillAuth(cookieInfos);

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);

        cookies.set('OMOWILL', JSON.stringify(cookieInfos), { expires: expirationDate });
    }

    const getUserData = useCallback(async () => {
        var result = null;

        const requestBody = {
            id: omowillAuth.userInfo.id
        };

        if (requestBody.id === 0) return;

        var endpoint = '/getUserData';

        const response = await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, requestBody);

        result = response.data;

        setUserData(result);

        return result;
    }, [omowillAuth.id]);

    const setPaidAuth = (paidCookie) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 365);

        cookies.set('OMOWILL-FILE', JSON.stringify(paidCookie), { expires: expirationDate });

        setOmowillPaidAuth(paidCookie.auth);
        setPaidUserIdx(paidCookie.value);
    }

    useEffect(() => {

        const getUserDataByCookie = async () => {
            if (omowillAuth.isAuth === true) {
                const result = await getUserData();
                setUserData(result);
            };
        };

        getUserDataByCookie();
    }, [getUserData, omowillAuth.isAuth])

    return (
        <AuthContext.Provider value={{ omowillAuth, userData, handleLogin, setCookie, getUserData, omowillPaidAuth, paidUserIdx, setPaidAuth }}>
            {
                children
            }
        </AuthContext.Provider>
    );

};

export { AuthContext, AuthProvider };
