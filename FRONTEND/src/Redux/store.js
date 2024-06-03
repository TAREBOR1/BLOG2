import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import themeReducer from './Theme/themeSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

const RootReducer=combineReducers({
  user:userReducer,
  theme:themeReducer
})

const persistconfig= {
  key:'root',
  storage,
  version:1

}
const persistedReducer= persistReducer(persistconfig,RootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false
  })
})

export const persistor= persistStore(store)