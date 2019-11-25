import React, { Component } from 'react';

import { connect } from 'react-redux';

import AnswerPage from '../../pages/Answer/AnswerPage';
import { AnswerActions } from '../../store/actionCreator';

import * as AnswerCRUD from './AnswerCRUD';

class AnswerContainer extends Component {
    componentDidMount() {
        AnswerCRUD.GetAnswerGroup();
    }

    componentDidUpdate(prevProps) {
        const { env_var, action_status } = this.props;
        if (
            (prevProps.env_var.get('selected_answer_group_id') !== env_var.get('selected_answer_group_id') ||
                (prevProps.action_status === '' && action_status === 'NEED_UPDATE_ANSWER')) &&
            env_var.get('selected_answer_group_id') !== undefined
        ) {
            AnswerCRUD.GetAnswer(env_var.get('selected_answer_group_id'));
        }

        if (prevProps.action_status === '' && action_status === 'NEED_UPDATE_ANSWER_GROUP') {
            AnswerCRUD.GetAnswerGroup();
        }
    }

    setEnvVar(value) {
        AnswerActions.set_env_var(value);
    }

    render() {
        const { answer, answer_group, env_var } = this.props;

        return (
            <div>
                <AnswerPage
                    answerGroup={answer_group}
                    answer={answer}
                    envVar={env_var}
                    setEnvVar={this.setEnvVar}
                    createAnswerGroup={AnswerCRUD.CreateAnswerGroup}
                    reviseAnswer={AnswerCRUD.ReviseAnswer}
                    deleteAnswer={AnswerCRUD.DeleteAnswer}
                    deleteAnswerGroup={AnswerCRUD.DeleteAnswerGroup}
                    createAnswer={AnswerCRUD.CreateAnswer}
                />
            </div>
        );
    }
}

export default connect(({ common, answer }) => ({
    answer_group: answer.get('answer_group'),
    answer: answer.get('answer'),
    env_var: answer.get('env_var'),
    action_status: common.get('action_status'),
}))(AnswerContainer);
