import React from 'react';
import { connect } from 'react-redux';
import { selectSnack } from '@/store/snackbar/reducer';

import { Snackbar as MaterialSnackbar, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { popSnacks } from '@/store/snackbar/actions';

const mapStateToProps = state => ({
  snack: selectSnack(state),
});

const mapDispatchToProps = {
  popSnacks,
};

function Snackbar({ snack, popSnacks }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    snack && setOpen(true);
  }, [snack]);

  const handleClose = (_e, reason) => {
    if (reason === 'clickaway') return;

    setOpen(false);
    setTimeout(popSnacks, 500);
  };

  const {
    message,
    autoHideDuration = 5000,
  } = (snack || {});

  return (
    <MaterialSnackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
