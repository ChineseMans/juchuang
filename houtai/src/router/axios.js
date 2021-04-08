/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import store from '@/store/';
import router from '@/router/router'
import { serialize } from '@/util/util'
import { getToken } from '@/util/auth'
import { Message } from 'element-ui'
import website from '@/config/website';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import QS from 'qs';
axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true ;
// NProgress Configuration
NProgress.configure({
    showSpinner: false
});
//HTTPrequest拦截
axios.interceptors.request.use(config => {
    NProgress.start() // start progress bar
    const meta = (config.meta || {});
    const isToken = meta.isToken === false;
    if (getToken() && !isToken) {
        config.headers['token'] =  getToken() // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
    }
    //headers中配置serialize为true开启序列化
    if (config.method === 'post' && meta.isSerialize === true) {
        config.data = serialize(config.data);
    }

    if (!config.data) {
        // 防止字段用错
        config.data = config.params || {}
    }

    // 检测是否包含文件类型, 若包含则进行 formData 封装
    let hasFile = false
    Object.keys(config.data).forEach(key => {
        if (typeof config.data[key] === 'object') {
            const item = config.data[key]
            if (item instanceof FileList || item instanceof File || item instanceof Blob) {
                hasFile = true
            }
        }
    })

    // 检测到存在文件使用 FormData 提交数据
    if (hasFile) {
        const formData = new FormData()
        Object.keys(config.data).forEach(key => {
            formData.append(key, config.data[key])
        })
        config.data = formData
    }
    
    return config
}, error => {
    return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use(res => {
    NProgress.done();
    const status = Number(res.status) || 200;
    const statusWhiteList = website.statusWhiteList || [];
    const message = res.data.message || '未知错误';
    //如果在白名单里则自行catch逻辑处理
    if (statusWhiteList.includes(status)) return Promise.reject(res);
    //如果是401则跳转到登录页面
    if (status === 401) store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }));
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
        Message({
            message: message,
            type: 'error'
        })
        return Promise.reject(new Error(message))
    }
    return res;
}, error => {
    NProgress.done();
    return Promise.reject(new Error(error));
})

export default axios;

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: url,
        params: params
    });
};

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: QS.stringify(params)
    });
};
