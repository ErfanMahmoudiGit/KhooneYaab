
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from './pages/login/Redux/authSlice.jsx'; // Update with your actual path
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
  <Provider store={store}>
  <BrowserRouter>
    {/* <React.StrictMode> */}
      <App /> 
    {/* </React.StrictMode>, */}
    <ToastContainer />

  </BrowserRouter>

  </Provider>
  
)
