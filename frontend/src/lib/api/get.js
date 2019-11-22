import axios from 'axios';

export function getScenarioGroup() {
    const url = `/api/v1/scenario_group`;

    return axios
        .get(url)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function GetScenario(scenario_gruop_id) {
    const url = `/api/v1/scenario/?scenario_group_id=${scenario_gruop_id}`;

    return axios
        .get(url)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function getAnswerGroup() {
    const url = `/api/v1/reaction_group`;

    return axios
        .get(url)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function GetAnswer(answer_gruop_id) {
    const url = `/api/v1/reaction/?answer_group_id=${answer_gruop_id}`;

    return axios
        .get(url)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function getSetting() {
    return new Promise(resolve => {
        resolve({
            code: 'ok',
            data: {
                scenario_model_threshold: 1,
                reaction_model_threshold: 1,
                retrieval_model_threshold: 1,
            },
        });
    });
    // const url = `/api/v1/reaction/?answer_group_id=${answer_gruop_id}`;

    // return axios
    //     .get(url)
    //     .then(function(response) {
    //         if (response.status === 200) return response.data;
    //         return {};
    //     })
    //     .catch(function() {
    //         return 'ng';
    //     });
}
