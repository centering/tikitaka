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
