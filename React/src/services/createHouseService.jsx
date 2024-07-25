// import http from "./httpService";
import axios from 'axios';

export function createHouse(data){
    return axios.post("http://localhost:8000/ProximityFinder/api/create_house/" ,{
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "method": 'POST',
        },
       
        data
    } )
}
// export function createHouse(data){
//     return http.post('/create_house/' , data)
// }