import { IntentActions } from '../../store/actionCreator';

import { setLoading, setNotiboxOpt, setActionStatus } from '../../lib/common';
import { createScenarioGroup, createScenario } from '../../lib/api/post';
import { reviseScenario } from '../../lib/api/put';
import { deleteScenario, deleteScenarioGroup } from '../../lib/api/delete';

export async function GetScenarioGroup() {
    try {
        setLoading(true);
        const res = await ScenarioActions.get_scenario_group();
        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '시나리오 그룹을 가져오지 못했습니다.',
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

export async function GetScenario(scenario_group_id) {
    try {
        setLoading(true);
        const res = await ScenarioActions.get_scenario(scenario_group_id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '시나리오를 가져오지 못했습니다.',
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

export async function CreateScenarioGroup(info) {
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

export async function CreateScenario(id) {
    try {
        setLoading(true);
        const res = await createScenario(id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '시나리오를 생성하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '시나리오를 생성하였습니다.',
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

export async function ReviseScenario(info) {
    try {
        setLoading(true);
        const res = await reviseScenario(info);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '시나리오를 수정하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '시나리오를 수정 하였습니다.',
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

export async function DeleteScenario(id) {
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

export async function DeleteScenarioGroup(id) {
    try {
        setLoading(true);
        const res = await deleteScenarioGroup(id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '시나리오 그룹을 삭제하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '시나리오 그룹을 삭제 하였습니다.',
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
