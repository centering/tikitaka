import { BlacklistActions } from '../../store/actionCreator';
import { setLoading, setNotiboxOpt, setActionStatus } from '../../lib/common';
import { createBlacklistGroup, createBlacklist } from '../../lib/api/post';
import { reviseBlacklist } from '../../lib/api/put';
import { deleteBlacklist, deleteBlacklistGroup } from '../../lib/api/delete';

export async function GetBlacklistGroup() {
    try {
        setLoading(true);
        const res = await BlacklistActions.get_blacklist_group();
        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not get blacklist group',
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

export async function GetBlacklist(blacklist_group_id) {
    try {
        setLoading(true);
        const res = await BlacklistActions.get_blacklist(blacklist_group_id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not get blacklist',
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

export async function CreateBlacklistGroup(info) {
    try {
        setLoading(true);
        const res = await createBlacklistGroup(info);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not create blacklist group',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: 'success to create blacklist group',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_BLACKLIST_GROUP');
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

export async function CreateBlacklist(id) {
    try {
        setLoading(true);
        const res = await createBlacklist(id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not create blacklist',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: 'success to create blacklist',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_BLACKLIST');

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

export async function ReviseBlacklist(info) {
    try {
        setLoading(true);
        const res = await reviseBlacklist(info);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not revise blacklist',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: 'success to revise blacklist',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_BLACKLIST');
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

export async function DeleteBlacklist(id) {
    try {
        setLoading(true);
        const res = await deleteBlacklist(id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not delete blacklist',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: 'success to delete blacklist',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_BLACKLIST');
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

export async function DeleteBlacklistGroup(id) {
    try {
        setLoading(true);
        const res = await deleteBlacklistGroup(id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: 'can not delete blacklist group',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: 'success to delete blacklist group',
                open: true,
            });
        }

        setActionStatus('NEED_UPDATE_BLACKLIST_GROUP');
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
