// Thunks

export const success = ({ ...config }) => dispatch => {
  dispatch(_toast({
    ...config
  }));
};

export const error = () => dispatch => {

};

export const info = () => dispatch => {

};

export const warning = () => dispatch => {

};

const _toast = snack => (dispatch, getState) => {
  dispatch(addSnack(snack));

  const isSnackSet = !!getState().snackbar.snack;

  if (!isSnackSet) {
    dispatch(popSnacks());
  }
};

// Types

const
  ADD_SNACK = '@snackbar/addSnack',
  POP_SNACKS = '@snackbar/popSnacks';

// Pure Actions

export const addSnack = snack => ({
  type: ADD_SNACK,
  payload: snack,
});

export const popSnacks = () => ({
  type: POP_SNACKS,
});

// Reducers

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

// Selectors

export const selectSnack = state => state.snackbar.snack;
