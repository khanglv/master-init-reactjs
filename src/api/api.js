import axios from 'axios';
import * as storage from './storage';
import NProgress from 'nprogress';
import * as common from '../components/Common/Common';

import { BASE_URL } from './configURL';

const LOGIN_CORE = `${BASE_URL}/login/core`

const TIME_OUT = 10000;

const doRequest = async (options) => {
    try {
        NProgress.start();
        options = {
            ...options,
            timeout: TIME_OUT,
            config: {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        }
        const response = await axios(options);
        if(response.status>= 200 && response.status < 300){
            NProgress.done();
            return response.data;
        }
    }catch(err){
        NProgress.done();
        if(err.response){
            if(err.response.status === 401){
                common.notify('error', 'Your request in valid, try again !!!');
                return;
            }
            if(err.response.status === 501){
                common.notify('error', 'Request timeout, try again !!!');
                return;
            }
            if(err.response.status === 403){
                window.location.href = "/login";
                common.notify('error', 'Bạn không có quyền truy cập, vui lòng đăng nhập lại !!!');
            }
            if(err.response.status === 404){
                common.notify('error', 'URL not found');
                return;
            }
            common.notify("error", "Thao tác thất bại " + err.response.data.code);
            return err.response.data;
        }else{
            common.notify('error', 'Server không phản hồi, thử lại !!!');
            return;
        }
    }
}

const doRequestFile = async (options) => {
    try{
        //NProgress.start();
        options = {
            ...options,
            timeout: TIME_OUT,
            config: {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        }
        const response = await axios(options);
        if(response.status>= 200 && response.status < 300){
            //NProgress.done();
            return response.data;
        }
    }catch(err){
        //NProgress.done();
        console.log(err.response);
        if(err.response){
            if(err.response.status === 401){
            }
            if(err.response.status === 501){
            }
            if(err.response.status === 403){
                window.location.href = "/login";
            }
        
            return err.response.data;
        }else{
            return;
        }
    }
}

const callApi = (options, needAuth = true, isFile = false)=>{
    if(needAuth){
        const accessTokenAuth = storage.accessTokenAuth();
        if(accessTokenAuth){
            options = {
                ...options,
                headers: {
                    Authorization: `Bearer ${accessTokenAuth}`
                }
            }
        }else{
            
        }
    }
    if(isFile){
        return doRequestFile(options);
    }else{
        return doRequest(options);
    }
}

export const loginApi = (userName, password)=> {
    const url = `${BASE_URL}/login`;
    const data = {
        "UserName": userName,
        "Password": password
    };
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApi(options, false);
}

export const loginWithCore = (data)=>{
    const url = LOGIN_CORE;
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApi(options, false);
}