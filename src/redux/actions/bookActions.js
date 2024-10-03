import axios from "axios";
import { ActionTypes } from "../constants/action-types";

export const bookHalls = (info) => {
  return {
    type: ActionTypes.BOOK_HALL,
    payload: info,
  };
};

export const bookHall = (info) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/bookings", {
        info,
      });

      dispatch({
        type: ActionTypes.BOOK_HALL,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };
};

export const getBookings = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5000/bookings");

      dispatch({
        type: ActionTypes.GET_BOOKINGS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error getting name:", error);
    }
  };
};

export const validateBooking = (info) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/validatedBookings",
        {
          info,
        }
      );

      dispatch({
        type: ActionTypes.VALIDATE_BOOKING,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };
};

export const rejectBooking = (info) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/rejectedBookings",
        {
          info,
        }
      );

      dispatch({
        type: ActionTypes.CANCEL_BOOKING,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };
};

export const removeBooking = (val) => {
  return {
    type: ActionTypes.REMOVE_BOOKING,
    payload: val,
  };
};
