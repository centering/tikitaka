import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Creatable from 'react-select/creatable';
import MixMatch from '../MixMatch/MixMatch';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 2),
    },
}));

const customStyles = {
    menu: () => ({
        display: 'none',
    }),
    multiValue: styles => {
        return {
            ...styles,
            backgroundColor: '#D4F4FA',
        };
    },
};

const customStyles1 = {
    menu: () => ({
        display: 'none',
    }),
    multiValue: styles => {
        return {
            ...styles,
            backgroundColor: '#FAE0D4',
        };
    },
};

const ScenarioList = ({ scenario, deleteScenario, reviseScenario, type }) => {
    return (
        <>
            {type === 'scenario' &&
                scenario.map((scen, idx) => {
                    return <ShowScenario key={idx} scenario={scen} reviseScenario={reviseScenario} deleteScenario={deleteScenario} />;
                })}
            {type === 'answer' &&
                scenario.map((scen, idx) => {
                    return <ShowAnswer key={idx} scenario={scen} reviseScenario={reviseScenario} deleteScenario={deleteScenario} />;
                })}
            {type === 'blacklist' &&
                scenario.map((scen, idx) => {
                    return <ShowBlacklist key={idx} blacklist={scen} reviseBlacklist={reviseScenario} deleteBlacklist={deleteScenario} />;
                })}
        </>
    );
};

const ShowAnswer = ({ scenario, deleteScenario, reviseScenario }) => {
    const classes = useStyles();

    const [query, setQuery] = useState(
        scenario.reaction_type.map(inner_qry => {
            return { label: inner_qry.text, value: inner_qry.text };
        }),
    );
    const [res, setRes] = useState(
        scenario.reaction_response.map(inner_res => {
            return { label: inner_res.text, value: inner_res.text };
        }),
    );
    
    useEffect(() => {
        setQuery(
            scenario.reaction_type.map(inner_qry => {
                return { label: inner_qry.text, value: inner_qry.text };
            }),
        );

        setRes(
            scenario.reaction_response.map(inner_res => {
                return { label: inner_res.text, value: inner_res.text };
            }),
        );
    }, [scenario]);
    function saveScenario() {
        const data = {
            reaction_id: scenario.id,
            reaction_type: query.map(qry => {
                return qry.label;
            }),
            reaction_response: res.map(re => {
                return re.label;
            }),
        };
        reviseScenario(data);
    }

    function handleCreate(newVal, type) {
        if (type === 'QUERY') setQuery([...query, { label: newVal, value: newVal }]);
        else if (type === 'RES') setRes([...res, { label: newVal, value: newVal }]);
    }
    function handleChange(changeVal, type) {
        if (type === 'QUERY') setQuery(changeVal || []);
        else if (type === 'RES') setRes(changeVal || []);
    }

    return (
        <Paper className={classes.root}>
            <h2>
                {query.length !== 0 ? `#${query[0].label}` : '답변 이름을 붙여주세요'}
                <span style={{ float: 'right' }}>
                    <SaveIcon style={{ cursor: 'pointer' }} onClick={saveScenario} />
                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteScenario(scenario.id)} />
                </span>
            </h2>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    사용자가 이런 말을 하면
                    <Creatable
                        placeholder="사용자가 봇에게 할 법한 말을 입력하고 엔터!"
                        styles={customStyles}
                        // options={opt}
                        menuPosition="fixed"
                        value={query}
                        isClearable
                        onChange={e => handleChange(e, 'QUERY')}
                        onCreateOption={e => handleCreate(e, 'QUERY')}
                    />
                </Grid>

                <Grid item xs={12}>
                    봇이 다음 답변 중에서 랜덤으로 답해요
                    <Creatable
                        placeholder="새로운 답변을 입력하고 엔터!"
                        // options={opt}
                        styles={customStyles1}
                        isMulti
                        menuPosition="fixed"
                        value={res}
                        isClearable
                        onChange={e => handleChange(e, 'RES')}
                        onCreateOption={e => handleCreate(e, 'RES')}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

const ShowScenario = ({ scenario, deleteScenario, reviseScenario }) => {
    const classes = useStyles();
    const [query, setQuery] = useState(
        scenario.scenario_query.map(inner_qry => {
            return { label: inner_qry.text, value: inner_qry.text };
        }),
    );
    const [res, setRes] = useState(
        scenario.scenario_response.map(inner_res => {
            return { label: inner_res.text, value: inner_res.text };
        }),
    );

    useEffect(() => {
        setQuery(
            scenario.scenario_query.map(inner_qry => {
                return { label: inner_qry.text, value: inner_qry.text };
            }),
        );

        setRes(
            scenario.scenario_response.map(inner_res => {
                return { label: inner_res.text, value: inner_res.text };
            }),
        );
    }, [scenario]);

    function saveScenario() {
        const data = {
            scenario_id: scenario.id,
            scenario_query: query.map(qry => {
                return qry.label;
            }),
            scenario_response: res.map(re => {
                return re.label;
            }),
        };
        reviseScenario(data);
    }

    function handleCreate(newVal, type) {
        if (type === 'QUERY') setQuery([...query, { label: newVal, value: newVal }]);
        else if (type === 'RES') setRes([...res, { label: newVal, value: newVal }]);
    }
    function handleChange(changeVal, type) {
        if (type === 'QUERY') setQuery(changeVal || []);
        else if (type === 'RES') setRes(changeVal || []);
    }

    return (
        <Paper className={classes.root}>
            <h2>
                {query.length !== 0 ? `#${query[0].label}` : '시나리오 이름을 붙여주세요'}

                <span style={{ float: 'right' }}>
                    <SaveIcon style={{ cursor: 'pointer' }} onClick={saveScenario} />
                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteScenario(scenario.id)} />
                </span>
            </h2>
            {query.length && res.length && <MixMatch set1={query} set2={res} />}

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    사용자가 이런 말을 하면
                    <Creatable
                        placeholder="사용자가 봇에게 할 법한 말을 입력하고 엔터!"
                        styles={customStyles}
                        // options={opt}
                        isMulti
                        menuPosition="fixed"
                        value={query}
                        isClearable
                        onChange={e => handleChange(e, 'QUERY')}
                        onCreateOption={e => handleCreate(e, 'QUERY')}
                    />
                </Grid>

                <Grid item xs={12}>
                    봇이 다음 답변 중에서 랜덤으로 답해요
                    <Creatable
                        placeholder="새로운 답변을 입력하고 엔터!"
                        // options={opt}
                        styles={customStyles1}
                        isMulti
                        menuPosition="fixed"
                        value={res}
                        isClearable
                        onChange={e => handleChange(e, 'RES')}
                        onCreateOption={e => handleCreate(e, 'RES')}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

const ShowBlacklist = ({ blacklist, deleteBlacklist, reviseBlacklist }) => {
    const classes = useStyles();
    const [query, setQuery] = useState(
        blacklist.blacklist_query.map(inner_qry => {
            return { label: inner_qry.text, value: inner_qry.text };
        }),
    );
    const [res, setRes] = useState(
        blacklist.blacklist_response.map(inner_res => {
            return { label: inner_res.text, value: inner_res.text };
        }),
    );

    useEffect(() => {
        setQuery(
            blacklist.blacklist_query.map(inner_qry => {
                return { label: inner_qry.text, value: inner_qry.text };
            }),
        );

        setRes(
            blacklist.blacklist_response.map(inner_res => {
                return { label: inner_res.text, value: inner_res.text };
            }),
        );
    }, [blacklist]);

    function saveBlacklist() {
        const data = {
            scenario_id: blacklist.id,
            scenario_query: query.map(qry => {
                return qry.label;
            }),
            scenario_response: res.map(re => {
                return re.label;
            }),
        };
        reviseBlacklist(data);
    }

    function handleCreate(newVal, type) {
        if (type === 'QUERY') setQuery([...query, { label: newVal, value: newVal }]);
        else if (type === 'RES') setRes([...res, { label: newVal, value: newVal }]);
    }
    function handleChange(changeVal, type) {
        if (type === 'QUERY') setQuery(changeVal || []);
        else if (type === 'RES') setRes(changeVal || []);
    }

    return (
        <Paper className={classes.root}>
            <h2>
                {query.length !== 0 ? `#${query[0].label}` : '블랙리스트 이름을 붙여주세요'}

                <span style={{ float: 'right' }}>
                    <SaveIcon style={{ cursor: 'pointer' }} onClick={saveBlacklist} />
                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteBlacklist(blacklist.id)} />
                </span>
            </h2>
            {query.length && res.length && <MixMatch set1={query} set2={res} />}

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    사용자가 이런 말을 하면
                    <Creatable
                        placeholder="사용자가 봇에게 할 법한 말을 입력하고 엔터!"
                        styles={customStyles}
                        // options={opt}
                        isMulti
                        menuPosition="fixed"
                        value={query}
                        isClearable
                        onChange={e => handleChange(e, 'QUERY')}
                        onCreateOption={e => handleCreate(e, 'QUERY')}
                    />
                </Grid>

                <Grid item xs={12}>
                    봇이 다음 답변 중에서 랜덤으로 답해요
                    <Creatable
                        placeholder="새로운 답변을 입력하고 엔터!"
                        // options={opt}
                        styles={customStyles1}
                        isMulti
                        menuPosition="fixed"
                        value={res}
                        isClearable
                        onChange={e => handleChange(e, 'RES')}
                        onCreateOption={e => handleCreate(e, 'RES')}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ScenarioList;
