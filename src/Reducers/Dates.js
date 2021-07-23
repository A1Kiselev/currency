import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  startDate: '2021-07-01',
  endDate:   '2021-07-07',
};

const datesSlice = createSlice({
  name:     'dates',
  initialState,
  reducers: {
    updateStartDate: (state, data) => {
      state.startDate = data.payload
    },
    updateEndDate:   (state, data) => {
      state.endDate = data.payload
    },
  },
});

export const {updateStartDate, updateEndDate} = datesSlice.actions;

export default datesSlice.reducer
