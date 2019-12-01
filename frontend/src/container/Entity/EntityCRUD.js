import { EntityActions } from '../../store/actionCreator';

import { setLoading, setNotiboxOpt, setActionStatus } from '../../lib/common';
import { createEntity } from '../../lib/api/post';
import { reviseEntity } from '../../lib/api/put';
import { deleteEntities, deleteEntity } from '../../lib/api/delete';

export async function GetEntityList() {
    try {
        setLoading(true);
        const res = await EntityActions.get_entity_list();
        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not get entity list.',
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

export async function CreateEntity(info) {
    try {
        setLoading(true);
        const res = await createEntity(info);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not create entity.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: 'success to create entity.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_ENTITY');
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

export async function ReviseEntity(info) {
    try {
        setLoading(true);
        const res = await reviseEntity(info);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not revise entity.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: 'success to revise entity.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_ETITY');
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

export async function DeleteEntity(id) {
    try {
        setLoading(true);
        const res = await DeleteEntity(id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not delete entity.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: 'success to delete entity.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_ENTITY');
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

