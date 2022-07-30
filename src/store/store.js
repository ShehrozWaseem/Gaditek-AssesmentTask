import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/reducer/useSlicer";
import fetchReducer from "../redux/reducer/userSlicer2";
import countryReducer from "../redux/reducer/contSlicer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "loggedin_user",
  storage,
};
const userPersistConfig = {
  key: "users",
  storage,
};
const countryPersistConfig = {
  key: "country",
  storage,
};
const persistedReducer_user = persistReducer(persistConfig, userReducer);
const persistedReducer_fetchedUser = persistReducer(
  userPersistConfig,
  fetchReducer
);
const persistedReducer_country = persistReducer(
  countryPersistConfig,
  countryReducer
);

export const store = configureStore({
  reducer: {
    user: persistedReducer_user,
    userList: persistedReducer_fetchedUser,
    countryList: persistedReducer_country,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware.concat(logger)({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }),
    middleware: [thunk],
  },
});
export const persistor = persistStore(store);
