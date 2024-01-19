import axios from 'axios';
import { backend_url } from "./helper";

export const commonrequest = async (method, url, body, header) => {

    let config = {
        method: method,
        url,
        headers: header ? header
            : {
                "content-type": "application/json",
            },
        data: body
    };

    if(url !== `${backend_url}/admin/login`) {
        const authtoken = sessionStorage.getItem('auth_token');
        const token = authtoken.slice(0,-1);

        config.headers['Authorization']= `Bearer ${token}`;
    }

    //AXIOS INSTANCE
    return axios.request(config).then((data) => {
        return data;
    })

        .catch((error) => {
            return error;
        })
}