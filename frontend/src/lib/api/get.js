import axios from 'axios';
import getTreeFromFlatData from 'react-sortable-tree';

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

export function getScenario(scenario_gruop_id) {
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

export function getBlacklistGroup() {
    const url = `/api/v1/blacklist_group`;

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

export function getBlacklist(blacklist_gruop_id) {
    const url = `/api/v1/blacklist/?blacklist_group_id=${blacklist_gruop_id}`;

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

export function GetAnswer(reaction_group_id) {
    const url = `/api/v1/reaction/?reaction_group_id=${reaction_group_id}`;

    return axios
        .get(url)
        .then(function(response) {
            if (response.status === 200) return getTreeFromFlatData(response.data);
            return {};
        })
        .catch(function() {
            return 'ng';
        });
}

export function getSetting() {
    const url = `/api/v1/setting/`;

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

export function getIntentList() {
    const url = `/api/v1/intent/`;

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

export function getIntent(intent_id) {
    const url = `/api/v1/intent/?id=${intent_id}`;

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

export function getEntityList() {
    const url = `/api/v1/entity/`;

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

export function getEntity(entity_id) {
    const url = `/api/v1/entity/?id=${entity_id}`;

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

export function getDialogFlow() {
    const url = `/api/v1/dialog_flow/`;

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

