import { AnswerActions } from '../../store/actionCreator';
import { setLoading, setNotiboxOpt, setActionStatus } from '../../lib/common';
import { createAnswerGroup, createAnswer } from '../../lib/api/post';
import { reviseAnswer } from '../../lib/api/put';
import { deleteAnswer, deleteAnswerGroup } from '../../lib/api/delete';

export async function GetAnswerGroup() {
    try {
        setLoading(true);
        const res = await AnswerActions.get_answer_group();
        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '답변 그룹을 가져오지 못했습니다.',
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

export async function GetAnswer(answer_group_id) {
    try {
        setLoading(true);
        const res = await AnswerActions.get_answer(answer_group_id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '답변를 가져오지 못했습니다.',
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

export async function CreateAnswerGroup(info) {
    try {
        setLoading(true);
        const res = await createAnswerGroup(info);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '답변 그룹을 생성하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '답변 그룹을 생성하였습니다.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_ANSWER_GROUP');
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

export async function CreateAnswer(id) {
    try {
        setLoading(true);
        const res = await createAnswer(id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '답변를 생성하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '답변를 생성하였습니다.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_ANSWER');

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

export async function ReviseAnswer(info) {
    try {
        setLoading(true);
        const res = await reviseAnswer(info);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '답변를 수정하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '답변를 수정 하였습니다.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_ANSWER');
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

export async function DeleteAnswer(id) {
    try {
        setLoading(true);
        const res = await deleteAnswer(id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '답변를 삭제하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '답변를 삭제 하였습니다.',
                open: true,
            });
        }
        setActionStatus('NEED_UPDATE_ANSWER');
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

export async function DeleteAnswerGroup(id) {
    try {
        setLoading(true);
        const res = await deleteAnswerGroup(id);

        if (res.code !== 'ok') {
            setNotiboxOpt({
                variant: 'error',
                message: '답변 그룹을 삭제하지 못했습니다.',
                open: true,
            });
        } else {
            setNotiboxOpt({
                variant: 'success',
                message: '답변 그룹을 삭제 하였습니다.',
                open: true,
            });
        }

        setActionStatus('NEED_UPDATE_ANSWER_GROUP');
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
