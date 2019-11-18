
import { CommonActions} from "../store/actionCreator";

export function setNotiboxOpt(value){
    CommonActions.set_notibox(value);
}

export function setLoading(value){
    CommonActions.set_loading(value);
}

export function setActionStatus(value){
    CommonActions.set_action_status(value)
}