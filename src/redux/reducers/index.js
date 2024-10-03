import { combineReducers } from "redux";
import { hallReducer } from "./hallReducer";
import { bookingReducer } from "./bookingReducer";
import { validationReducer } from "./validationReducer";
import { cancellationReducer } from "./cancellationReducer";

const rootReducer = combineReducers({
  allHalls: hallReducer,
  bookings: bookingReducer,
  validatedBookings: validationReducer,
  cancelledBookings: cancellationReducer,
});

export default rootReducer;
