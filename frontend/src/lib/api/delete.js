import axios from 'axios';

export function deleteScenarioGroup(id) {
    return axios
        .delete(`/api/v1/scenario_group/?id=${id}`)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function deleteScenario(id) {
    return axios
        .delete(`/api/v1/scenario/?scenario_id=${id}`)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}
