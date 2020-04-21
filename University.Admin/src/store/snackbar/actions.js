import { ADD_SNACK, POP_SNACKS } from './types';

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

// Pure Actions

export const addSnack = snack => ({
  type: ADD_SNACK,
  payload: snack,
});

export const popSnacks = () => ({
  type: POP_SNACKS,
});
