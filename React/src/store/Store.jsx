import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import homeReducer from '../page/Home/Redux/businessAndIssueSlice';
// import searchReducer from '../page/Search/Redux/searchSlice';
// import licenseReducer from '../page/License/Redux/licenseSlice';
import authReducer from '../pages/login/redux/authSlice';
// import userReducer from '../page/Auth/Redux/userSlice';
// import complaintsReducer from '../page/Complaints/Redux/complaintsSlice';
// import requestsListReducer from '../page/RequestsList/Redux/requestsListSlice';

// import storage from 'redux-persist/lib/storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER, persistStore,
// } from 'redux-persist';
// import thunk from "redux-thunk";


export const rootReducer = combineReducers({
  auth: authReducer,

});

// const persistConfig = {
//   key: 'root',
//   storage: storage,
//   whitelist: ['user'] // which reducer want to store
// };
// const middleware = applyMiddleware(thunk);

// const pReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(pReducer,middleware);
// export const persistor = persistStore(store);
export default store;