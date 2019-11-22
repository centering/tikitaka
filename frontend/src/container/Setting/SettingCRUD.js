import { SettingActions } from '../../store/actionCreator';
import { setLoading, setNotiboxOpt, setActionStatus } from '../../lib/common';

import { reviseSetting } from '../../lib/api/put';

export async function GetSetting() {
    try {
        setLoading(true);
        const res = await SettingActions.get_setting();
        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '설정을 가져오지 못했습니다.',
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

export async function ReviseSetting(info) {
    try {
        setLoading(true);
        const res = await reviseSetting(info);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '설정을 수정하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '설정을 수정 하였습니다.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE');
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
