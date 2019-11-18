import axios from 'axios';


export function modifyUserGroup(info){

    return axios.put('/api/v2/user_group/',info)
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

export function modifyUser(info){

    return axios.put('/api/v2/user/',info)
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
