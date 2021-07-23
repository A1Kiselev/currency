import { configureStore} from '@reduxjs/toolkit'
import currencyReducer from "./Reducers/Currencies";
import datesReducer from "./Reducers/Dates";

export default configureStore({
  reducer: {
    currency: currencyReducer,
    dates: datesReducer,
  },
});
