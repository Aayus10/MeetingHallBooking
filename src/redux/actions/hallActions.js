import axios from "axios";
import { ActionTypes } from "../constants/action-types";

export const setHalls = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/listedHalls", {
        data,
      });

      dispatch({
        type: ActionTypes.SET_HALLS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding name:", error);
    }
  };
};

export const getHalls = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5000/listedHalls");

      dispatch({
        type: ActionTypes.GET_HALLS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error getting name:", error);
    }
  };
};
