import { IntentActions } from '../../store/actionCreator';

import { setLoading, setNotiboxOpt, setActionStatus } from '../../lib/common';
import { createIntent } from '../../lib/api/post';
import { reviseIntent } from '../../lib/api/put';
import { deleteIntents, deleteIntent } from '../../lib/api/delete';

export async function GetIntentList() {
    try {
        setLoading(true);
        const res = await IntentActions.get_intent_list();
        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not get intent list',
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

export async function CreateIntent(info) {
    try {
        setLoading(true);
        const res = await createScenarioGroup(info);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '시나리오 그룹을 생성하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '시나리오 그룹을 생성하였습니다.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_SCENARIO_GROUP');
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

export async function ReviseIntent(info) {
    try {
        setLoading(true);
        const res = await createScenarioGroup(info);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '시나리오 그룹을 생성하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '시나리오 그룹을 생성하였습니다.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_SCENARIO_GROUP');
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

export async function DeleteIntents(id) {
    try {
        setLoading(true);
        const res = await deleteScenario(id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '시나리오를 삭제하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '시나리오를 삭제 하였습니다.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_SCENARIO');
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

export async function ImportIntents(id) {
    try {
        setLoading(true);
        const res = await deleteScenario(id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '시나리오를 삭제하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '시나리오를 삭제 하였습니다.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_SCENARIO');
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

export async function ExportIntents(id) {
    try {
        setLoading(true);
        const res = await deleteScenario(id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '시나리오를 삭제하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '시나리오를 삭제 하였습니다.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_SCENARIO');
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
