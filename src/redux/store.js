import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from "./index.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "todoApp",
  storage,
  whitelist: ["todoReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk),
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
);

const persistor = persistStore(store);
export { store, persistor };
