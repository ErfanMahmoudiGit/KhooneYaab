// import http from "./httpService";
import axios from 'axios';

// export function createHouse(data){
//     return axios.post("http://localhost:8000/ProximityFinder/api/create_house/" ,{
//         headers: {
//             'Content-Type': 'application/json',
//             "Access-Control-Allow-Origin": "*",
//             "method": 'POST',
//         },
       
//         data
//     } )
// }
const API_BASE = axios.create({
    baseURL: 'http://localhost:8000/ProximityFinder/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export const API_createHouse = async (data) => {
    try {
      const response = await API_BASE.post('create_house/',data);
      return { ...response.data, status: response.status };
    } catch (error) {
      try{
        return({...error?.response?.data,status: error.response.status}) ;
      }catch(err){
        return({error:{message:'--سرویس در دسترس نیست'}}) ;
      }  
    }
  };
// export function createHouse(data){
//     return http.post('/create_house/' , data)
// }