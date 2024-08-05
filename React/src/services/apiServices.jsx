import axios from 'axios';

const API_BASE = axios.create({
    baseURL: 'http://localhost:8000/ProximityFinder/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  });
const API_BASE_USER = axios.create({
    baseURL: 'http://localhost:8000/userauth/',
    headers: {
      'Content-Type': 'application/json',
      
    },
  });

export const API_createHouse = async (data) => {
  try {
    const response = await API_BASE.post('create_house/',data);
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
    const response = await API_BASE.get('buildings/');
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
    const response = await API_BASE.get(`search/?q=${q}`);
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

