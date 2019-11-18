import {LANGUAGE} from './lang'
import { CommonActions} from "../store/actionCreator";
import jwt from "jwt-simple"
let code = '2ZwfCL6OmldiOfQXXl4ns3vcB6TsfKqmchP6OnaO';

export function debounce(func, wait, immediate) {
    let timeout;

    return function () {
        const context = this, args = arguments;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
};

export function encode(payload){

    return jwt.encode(payload,code)
}


export function decode(token){

    return jwt.decode(token,code)
}


export function setNotiboxOpt(value){
    CommonActions.set_notibox(value);
}

export function setLoading(value){
    CommonActions.set_loading(value);
}

export function setActionStatus(value){
    CommonActions.set_action_status(value)
}
export function GET_TRANS_LANG(type){

    const lang = localStorage.getItem('lang')
    return LANGUAGE[type][lang]

}
