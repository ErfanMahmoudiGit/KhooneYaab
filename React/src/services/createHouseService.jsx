import http from "./httpService";


export function createHouse(data){
    return http.post('/create_house/' , data)
}