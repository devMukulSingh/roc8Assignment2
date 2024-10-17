import { IinitialState } from "@/app/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IinitialState = {
  activeEmail: null,
  readEmails: [],
  unreadEmails: [],
  favorites: [],
  emailsList: [],
};

const rootReducer = createSlice({
  initialState,
  name: "root",
  reducers: {
    setActiveEmail: (state, action) => {
      if (state.activeEmail?.id === action.payload.id) {
        state.activeEmail = null;
        return;
      }
      state.activeEmail = action.payload;
    },
    removeActivEmail: (state) => {
      state.activeEmail = null;
    },
    setReadEmail: (state, action) => {
      if (
        state.readEmails?.find(
          (readEmail) => readEmail.id === action.payload.id,
        )
      )
        return;
      state.readEmails?.push(action.payload);
    },
    setFavoriteEmail: (state, action) => {
      if (state.favorites?.find((fav) => fav.id === action.payload.id)) {
        const filtered = state.favorites.filter(
          (fav) => fav.id !== action.payload.id,
        );
        state.favorites = filtered;
        return;
      }
      state.favorites?.push(action.payload);
    },
    setEmailsList: (state, action) => {
      state.emailsList = action.payload;
    },
  },
});

export default rootReducer.reducer;

export const {
  setActiveEmail,
  setFavoriteEmail,
  setReadEmail,
  setEmailsList,
  removeActivEmail,
} = rootReducer.actions;
