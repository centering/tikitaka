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

export function createBlacklistGroup(info) {
    return axios
        .post('/api/v1/blacklist_group/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function createBlacklist(info) {
    return axios
        .post('/api/v1/blacklist/', info)
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
            if (response.status === 200) {
                return response.data;
            }
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

            if (response.status === 200) {
                return response.data;
            }
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function createIntent(info) {
    return axios
        .post('/api/v1/intent/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function createEntity(info) {
    return axios
        .post('/api/v1/entity/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}
