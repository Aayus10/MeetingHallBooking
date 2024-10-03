import { ActionTypes } from "../constants/action-types";

const initialState = {
  halls: [],
};

export const hallReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_HALLS:
      return {
        ...state,
        halls: payload,
      };
    case ActionTypes.GET_HALLS:
      return { ...state, halls: payload };

    default:
      return state;
  }
};
