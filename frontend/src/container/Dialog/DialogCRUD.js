import { DialogActions } from '../../store/actionCreator';
import { setLoading, setNotiboxOpt, setActionStatus } from '../../lib/common';
import { reviseDialogFlow } from '../../lib/api/put';

export async function getDialogFlow() {
    try {
        setLoading(true);
        const res = await DialogActions.get_dialog_flow();
        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not get dialog flow',
                open: true,
            });
        }
        setActionStatus('');
        setLoading(false);
    } catch (e) {
        setLoading(false);

        setNotiboxOpt({
            variant: 'error',
            message: e,
            open: true,
        });
    }
}

export async function updateDialogFlow(info) {
    try {
        setLoading(true);
        const res = await reviseDialogFlow(info);
        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not update dialog flow',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_DIALOG_FLOW');
        setLoading(false);
    } catch (e) {
        setLoading(false);

        setNotiboxOpt({
            variant: 'error',
            message: e,
            open: true,
        });
    }
}