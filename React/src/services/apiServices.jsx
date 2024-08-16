import axios from 'axios';

const API_BASE = axios.create({
    baseURL: 'http://localhost:8000/ProximityFinder/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  });
const API_BASE_USER = axios.create({
    baseURL: 'http://localhost:8000/UserAuth/',
    headers: {
      'Content-Type': 'application/json',
      
    },
  });

export const API_createHouse = async (data) => {
  try {
    const response = await API_BASE.post('building/create_house/',data);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};
export const API_GETHOUSE = async () => {
  try {
    const response = await API_BASE.get('building/buildings/');
    return response;    // response.data , response.status

  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};
export const API_GETHOUSE_DETAILS = async (id) => {
  try {
    const response = await API_BASE.get(`building/${id}/`);
    return response;    // response.data , response.status

  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};
export const API_SEARCH = async (q) => {
  try {
    const response = await API_BASE.get(`building/search/?q=${q}`);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};
export const API_CATEGORY = async (category) => {
  try {
    const response = await API_BASE.post('building/category/',category);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};
export const API_GETOTP = async (data) => {
  try {
    const response = await API_BASE_USER.post('/get-otp/',data);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};
export const API_CHECKOTP = async (data) => {
  try {
    const response = await API_BASE_USER.post('/check-otp',data);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};



export const API_GET_CAPTCHA_CODE = async () => {
  try {
    const response = await API_BASE_USER.get('captcha/');
    return response;    // response.data , response.status

  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};

// path('api/building/recommend_buildings/', recommend_buildings, name='recommend_buildings'),
// path('api/building/state/', get_buildings_by_state, name='get_buildings_by_state'),