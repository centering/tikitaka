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

export function deleteBlacklistGroup(id) {
    return axios
        .delete(`/api/v1/blacklist_group/?id=${id}`)
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

export function deleteBlacklist(id) {
    return axios
        .delete(`/api/v1/blacklist/?blacklist_id=${id}`)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function deleteAnswerGroup(id) {
    return axios
        .delete(`/api/v1/reaction_group/?id=${id}`)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function deleteAnswer(id) {
    return axios
        .delete(`/api/v1/reaction/?reaction_id=${id}`)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function deleteIntents() {
    return axios
        .delete(`/api/v1/intent/`)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function deleteIntent(id) {
    return axios
        .delete(`/api/v1/intent/?id=${id}`)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function deleteEntity(id) {
    return axios
        .delete(`/api/v1/entity/?id=${id}`)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

