import { ADD_SNACK, POP_SNACKS } from './types';

const initialState = {
  snacks: [],
  snack: null,
};

export default (state = initialState, { type, payload  }) => {
  switch (type) {
    case ADD_SNACK:
      return {
        ...state,
        snacks: [
          ...state.snacks,
          payload,
        ],
      };
    case POP_SNACKS:
      return {
        ...state,
        snacks: state.snacks.slice(1),
        snack: state.snacks[0],
      };
    default:
      return state;
  }
};

export const selectSnack = state => state.snackbar.snack;
