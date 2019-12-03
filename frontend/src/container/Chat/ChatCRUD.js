import { setLoading, setNotiboxOpt, setActionStatus } from '../../lib/common';
import { doChat } from '../../lib/api/post';

// eslint-disable-next-line import/prefer-default-export
export async function UpdateChat(info) {
    try {
        setLoading(true);
        const res = await doChat({query: info});

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '응답이 오지 않습니다.',
                open: true,
            });
        }

        setActionStatus('NEED_UPDATE_CHAT');
        setLoading(false);

        return res;

    } catch (e) {
        setLoading(false);

        setNotiboxOpt({
            variant: 'error',
            message: e,
            open: true,
        });
    }
}
