import request from '@/router/axios';
import { baseUrl } from '@/config/env';
export const loginByUsername = (username, password, code, redomStr) => request({

    url: baseUrl + '/login',
    method: 'post',
    meta: {
        isToken: true
    },
    data: {
        username,
        password,
        // code,
        redomStr
    },

})

export const getUserInfo = () => request({
    url: baseUrl + '/getUserInfo',
    // url:'/user/getUserInfo',
    method: 'get',
    meta: {
        isToken: true
    },
});

export const refeshToken = () => request({
    // url: baseUrl + '/user/refesh',
    url:'/user/refesh',
    method: 'post'
})

export const getMenu = (type = 0) => request({
    // url: baseUrl + '/user/getMenu',
    url:'/user/getMenu',
    method: 'get',
    data: {
        type
    }
});

export const getTopMenu = () => request({
    url:'/user/getTopMenu',
    method: 'get'
});

export const sendLogs = (list) => request({
    // url: baseUrl + '/user/sendLogs',
    url:'/user/sendLogs',
    method: 'post',
    data: list
})

export const logout = () => request({
    // url: baseUrl + '/user/logout',
    url:'/user/logout',
    meta: {
        isToken: false
    },
    method: 'get'
})