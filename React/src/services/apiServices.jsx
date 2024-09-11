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
export const API_SEARCH = async (q,body) => {
  try {
    // const response = await API_BASE.get(`building/search/?q=${q}`,body);
    const response = await API_BASE.get('building/search/', {
      params: {
          q: q,
          min_price: body.min_price,
          max_price: body.max_price,
          min_meterage: body.min_meterage,
          max_meterage: body.max_meterage,
          room_count: body.room_count,
      }
  });
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
    const response = await API_BASE_USER.post('/check-otp/',data);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};

export const API_LOGIN_USER = async (data) => {
  try {
    const response = await API_BASE_USER.post('/update-user/',data);
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

export const API_GET_BY_STATE= async (data) => {
  try {
    const response = await API_BASE.post(`building/state/`,data);
    return response;
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

export const API_RECOMMENDER= async (data) => {
  try {
    const response = await API_BASE.post(`building/recommend_buildings/`,data);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};

export const API_GET_CONTACT_INFO = async (data) => {
  try {
    const response = await API_BASE_USER.post('/get-user-info/',data);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};

// path('api/building/delete-building/<int:building_id>/', delete_building, name='delete_building'),

export const API_DELETE_HOUSE = async (id) => {
  try {
    const response = await API_BASE.post(`building/delete-building/${id}/`);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};


export const API_ADD_COMMENT = async (data) => {
  try {
    const response = await API_BASE.post(`building/comments/add-comment/`,data);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};


export const API_GET_BUILDING_COMMENT = async (id) => {
  try {
    const response = await API_BASE.get(`building/comments/${id}`);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};


export const API_GET_MY_BUILDINGS= async (data) => {
  try {
    const response = await API_BASE.post(`building/my_buildings/`,data);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};

// path('api/building/get_state_by_categories/', get_state_by_categories, name='get_state_by_categories')



export const API_GET_CATEGORIES_COUNT_STATE= async () => {
  try {
    const response = await API_BASE.get(`building/get_state_by_categories/`);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};

// path('remove/', remove_user, name='remove_user'),
// path('logout/', logout_user, name='logout_user')

export const API_REMOVE_USER = async (data) => {
  try {
    const response = await API_BASE_USER.post('/remove/',data);
    return response;
  } catch (error) {
    try{
      return({...error?.response?.data,status: error.response.status}) ;  // check
    }catch(err){
      return({error:{message:'--سرویس در دسترس نیست'}}) ;
    }  
  }
};