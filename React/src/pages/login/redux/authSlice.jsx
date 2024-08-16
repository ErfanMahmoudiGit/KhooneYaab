import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_GET_CAPTCHA_CODE } from "../../../services/apiServices";

const initialState = {
  loginModalStep1: false,
  loginModalStep2: false,
  isSendCode : false , 
  phoneNumber: '',
  captcha_text: "",
  captcha_ref: "",
  captcha_image: "",
  isModalOpen: false,
  captchaMode: "idle",
  userLoading: "idle",
  isAuthorized : false,
  

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
});

export const { handle_variables } = authSlice.actions;

export const authState = (state) => state.auth;
export default authSlice.reducer;
