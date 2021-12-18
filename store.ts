import { createWrapper, MakeStore } from "next-redux-wrapper"
import { applyMiddleware, createStore, Middleware, StoreEnhancer } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import createSagaMiddleware from "redux-saga"
import { AppState } from "./interfaces"
import rootReducer from "./reducer"
import rootSaga from "./saga"

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(persistedReducer, bindMiddleware([sagaMiddleware]))

export const makeStore: MakeStore<AppState> = () => {
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

export const persistor = persistStore(store)

export const wrapper = createWrapper<AppState>(makeStore, { debug: true })
