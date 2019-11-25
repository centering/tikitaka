import React from 'react';
import Grid from '@material-ui/core/Grid';

import GroupList from '../../component/Group/GroupList';

import AddScenario from '../../component/Scenario/AddScenario';
import ScenarioList from '../../component/Scenario/ScenarioList';
import GroupCreate from '../../component/Group/GroupCreate';

const AnswerPage = ({ answerGroup, setEnvVar, envVar, answer, createAnswerGroup, createAnswer, reviseAnswer, deleteAnswer, deleteAnswerGroup }) => {
    return (
        <div>
            <h2>자동 답변({envVar.get('selected_answer_group_name')})</h2>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <GroupList groupName="answer_group" Group={answerGroup} envVar={envVar} setEnvVar={setEnvVar} deleteGroup={deleteAnswerGroup} />

                    <GroupCreate createGroup={createAnswerGroup} />
                </Grid>
                <Grid item xs={12}>
                    <ScenarioList type="answer" scenario={answer} deleteScenario={deleteAnswer} reviseScenario={reviseAnswer} />
                </Grid>

                <Grid item xs={12}>
                    <div style={{ top: 0, position: 'sticky' }}>
                        <AddScenario type="answer" createScenario={createAnswer} envVar={envVar} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default AnswerPage;
