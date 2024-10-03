import { ActionTypes } from "../constants/action-types";

const initialState = {
  successfulBookings: [],
};

export const validationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.VALIDATE_BOOKING:
      return {
        ...state,
        successfulBookings: [...state.successfulBookings, payload],
      };
    case ActionTypes.GET_VALIDATED_BOOKINGS:
      return {
        ...state,
        successfulBookings: payload,
      };

    default:
      return state;
  }
};
