import { CommonActions } from '../store/actionCreator';

export function setNotiboxOpt(value) {
    CommonActions.set_notibox(value);
}

export function setLoading(value) {
    CommonActions.set_loading(value);
}

export function setActionStatus(value) {
    CommonActions.set_action_status(value);
}

export function shuffleRandom(n) {
    const ar = [];
    let temp;
    let rnum;

    for (let i = 0; i <= n; i++) {
        ar.push(i);
    }

    for (let i = 0; i < ar.length; i++) {
        rnum = Math.floor(Math.random() * n);
        temp = ar[i];
        ar[i] = ar[rnum];
        ar[rnum] = temp;
    }

    return ar;
}
