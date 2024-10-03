import { ActionTypes } from "../constants/action-types";

const initialState = {
  rejectedBookings: [],
};

export const cancellationReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.CANCEL_BOOKING:
      return {
        ...state,
        rejectedBookings: [...state.rejectedBookings, payload],
      };
    case ActionTypes.GET_CANCELLED_BOOKINGS:
      return { ...state, rejectedBookings: payload };

    default:
      return state;
  }
};
