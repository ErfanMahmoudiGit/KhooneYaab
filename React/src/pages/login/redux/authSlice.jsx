import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_GET_CAPTCHA_CODE } from "../../../services/apiServices";

const initialState = {
  loginModalStep1: false,
  loginModalStep2: false,
  loginModalStep3: false,
  isSendCode : false , 
  phoneNumber: '',
  isModalOpen: false,
  captchaMode: "idle",
  userLoading: "idle",
  isAuthorized : false,
  captcha_image: "",
  captcha_string : "",
  user_string:"",
  name : "",
  email : "",
  is_verified_user : false,
  welcome_message : "",

  searchResults : [],
  seachedValue:"",
  cityResults :[],
  selectedCity : "",
  selectedCityId : "",
  

  signInModalopen: false,
  isCompanySelectModalOpen: false,
  userSignInModal:false,
  isUserSignIn:false,
  accessToken: undefined,
  loginBtnValue: undefined,
  invalid_captcha: false,
  genuineAddNewCompany: 0,
  isLoading: false,
  access_key: undefined,
  showGenuineBtn:false,
  showLegalBtn:false,
  showForeignersBtn:false,
  errorModal:false,
  errorToast:false,
  errorMessage:null

};

export const loadCaptchaImage = createAsyncThunk(
  "auth/loadCaptchaImage",
  async () => {
    const response = await API_GET_CAPTCHA_CODE();
    return response.data;
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handle_variables: (state, action) => {
      const data = action.payload;
      state = { ...state, ...data };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCaptchaImage.pending, (state) => {
        state.captchaMode = "loading";
      })
      .addCase(loadCaptchaImage.fulfilled, (state, action) => {
        state.captchaMode = "idle";
        state.user_string = "";
        state.captcha_string = action.payload.captcha_string;
        state.captcha_image = action.payload.image;
      })
      
  },
});

export const { handle_variables } = authSlice.actions;

export const authState = (state) => state.auth;
export default authSlice.reducer;
