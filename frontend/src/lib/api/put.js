import axios from 'axios';

export function reviseScenario(info) {
    return new Promise(resolve => {
        resolve({
            code: 'ok',
            data: [],
        });
    });

    // return axios
    //     .post('/api/v2/auth/login', info)
    //     .then(function(response) {
    //         if (response.status == 200) return response.data;
    //         else return {};
    //     })
    //     .catch(function(response) {
    //         return 'ng';
    //     });
}
