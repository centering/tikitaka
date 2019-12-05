import axios from 'axios';

export function reviseScenario(info) {
    return axios
        .put('/api/v1/scenario/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function reviseBlacklist(info) {
    return axios
        .put('/api/v1/blacklist/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function reviseAnswer(info) {
    return axios
        .put('/api/v1/reaction/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function reviseSetting(info) {
    return axios
        .put('/api/v1/setting/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function reviseIntent(info) {
    return axios
        .put('/api/v1/intent/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function reviseEntity(info) {
    return axios
        .put('/api/v1/Entity/', info)
        .then(function(response) {
            if (response.status === 200) return response.data;
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}
