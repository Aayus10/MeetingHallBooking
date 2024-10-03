import { thunk } from "redux-thunk";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { legacy_createStore as createStore, applyMiddleware } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
