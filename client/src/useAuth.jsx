import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios.post('https://powerful-earth-51293-6f18607437c5.herokuapp.com/login', {
            code,
    }).then(res => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, '/Player');
    }).catch(() => {
        window.location = '/Player';
    })
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        const interval = setInterval(() => {
        axios.post('https://powerful-earth-51293-6f18607437c5.herokuapp.com/refresh', {
            refreshToken,
    }).then(res => {
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);
    }).catch(() => {
        window.location = '/Player';
    })
}, (expiresIn - 60) * 1000)
    return () => clearInterval(interval)
}, [refreshToken, expiresIn]);

    return accessToken;
} 