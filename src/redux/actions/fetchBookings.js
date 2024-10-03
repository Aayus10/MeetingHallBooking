import axios from "axios";
import { ActionTypes } from "../constants/action-types";

export const getValidatedBookings = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/validatedBookings"
      );

      dispatch({
        type: ActionTypes.GET_VALIDATED_BOOKINGS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error getting name:", error);
    }
  };
};

export const getRejectedBookings = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/rejectedBookings"
      );

      dispatch({
        type: ActionTypes.GET_CANCELLED_BOOKINGS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error getting name:", error);
    }
  };
};
