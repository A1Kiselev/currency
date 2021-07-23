import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  usd: [],
  rub: [],
  eur: [],
};

const currencySlice = createSlice({
  name:     'currency',
  initialState,
  reducers: {
    updateUSD: (state, data) => {
      state.usd = data.payload
    },
    updateEUR: (state, data) => {
      state.eur = data.payload
    },
    updateRUB: (state, data) => {
      state.rub = data.payload
    },
  },
});

export const {updateEUR, updateRUB, updateUSD} = currencySlice.actions;

export default currencySlice.reducer
