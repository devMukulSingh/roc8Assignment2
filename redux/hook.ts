
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, rootState } from "./store";



export const useAppSelector :  TypedUseSelectorHook<rootState> = useSelector;

export const useAppDispatch : () => AppDispatch = useDispatch;