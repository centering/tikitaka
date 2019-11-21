import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
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
