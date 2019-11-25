import { setLoading, setNotiboxOpt } from '../../lib/common';
import { doChat } from '../../lib/api/post';

// eslint-disable-next-line import/prefer-default-export
export async function updateChat(info) {
    try {
        setLoading(true);
        const res = await doChat(info);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '응답이 오지 않습니다.',
                open: true,
            });
        }
        // setActionStatus('NEED_UPDATE_ANSWER');

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
