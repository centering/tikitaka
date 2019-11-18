import axios from 'axios';

export function getUserGroup(project_id,from,size,sort,order,search_col,search_val) {

    // let url=`/api/v2/user_group/?project_id=${project_id}`

    // if(from)
    //     url+=`&from=${from}&size=${size}`
    // if( sort )
    //     url+=`&sort=${sort}&order=${order}`
    // if( search_col)
    //     url+=`&search_col=${search_col}&search_val=${search_val}`

    // return axios.get(url)
    //     .then(function(response){

    //         if ( response.status==200)
    //             return response.data
    //         else
    //             return {}

    //     })
    //     .catch(function(response){
    //         return 'ng'
    //     })

}

