import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../src/slices/auth.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const reducer = {
  auth: authReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;