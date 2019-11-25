import axios from 'axios';

export function createScenarioGroup(info) {
    return axios
        .post('/api/v1/scenario_group/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function createScenario(info) {
    return axios
        .post('/api/v1/scenario/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function createAnswerGroup(info) {
    return axios
        .post('/api/v1/reaction_group/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function createAnswer(info) {
    return axios
        .post('/api/v1/reaction/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}
export function doChat(info) {
    return axios
        .post('/api/v1/chat/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}
