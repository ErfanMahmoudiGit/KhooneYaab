import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  loginStep1: false,
  loginStep2: "idle",
  modalLoginStep1: "idle",
  modalLoginStep2: "idle",
  isLoading : false
  
};


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
    //   .addCase(loadCaptchaImage.pending, (state) => {
    //     state.captchaMode = "loading";
    //   })
    //   .addCase(loadCaptchaImage.fulfilled, (state, action) => {
    //     state.captchaMode = "idle";
    //     state.captcha_text = "";
    //     state.captcha_ref = action.payload.refId;
    //     state.captcha_image = action.payload.image;
    //   })
    //   .addCase(validateSSoCode.pending, (state) => {
    //     state.userLoading = "loading";
    //   })
    //   .addCase(validateSSoCode.fulfilled, (state) => {
    //     state.userLoading = "idle";
    //   });
  },
});

export const { handle_variables } = authSlice.actions;

export const authState = (state) => state.auth;

export default authSlice.reducer;
