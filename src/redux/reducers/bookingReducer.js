import { ActionTypes } from "../constants/action-types";

const initialState = {
  bookings: [],
};

export const bookingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.BOOK_HALL:
      return { ...state, bookings: [...state.bookings, payload] };
    case ActionTypes.GET_BOOKINGS:
      return { ...state, bookings: payload };

    default:
      return state;
  }
};
