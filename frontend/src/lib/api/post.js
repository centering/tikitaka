import axios from 'axios';


export function getLogin(authInfo) {
    return axios.post('/api/v2/auth/login',authInfo)
        .then(function(response){

            if ( response.status==200)
                return response.data
            else
                 return {}

        })
        .catch(function(response){
            return 'ng'
        })

}


export function createNewwProject(info){
    return axios.post('/api/v2/project/',info)
        .then(function(response){

            if ( response.status==200)
                return response.data
            else
                 return {}

        })
        .catch(function(response){
            return 'ng'
        })
}

export function createUserGroup(info){

    return axios.post('/api/v2/user_group/',info)
        .then(function(response){

            if ( response.status==200)
                return response.data
            else
                 return {}

        })
        .catch(function(response){
            return 'ng'
        })

}

export function createUser(info){

    return axios.post('/api/v2/user/',info)
        .then(function(response){

            if ( response.status==200)
                return response.data
            else
                return {}

        })
        .catch(function(response){
            return 'ng'
        })

}
