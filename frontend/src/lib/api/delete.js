import axios from 'axios';


export function signOut() {
    return axios.delete('/api/v2/auth/logout')
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

export function deleteUserGroup(user_group_id){

    return axios.delete(`/api/v2/user_group/?user_group_id=${user_group_id}`)
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

export function deleteUser(email){

    return axios.delete(`/api/v2/user/?email=${email}`)
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
