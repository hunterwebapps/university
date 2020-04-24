import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Button as MuiButton, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'inline-block',
    position: 'relative',
  },
  progress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function Button({ children, loading, ...props }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <MuiButton
        disabled={loading}
        {...props}
      >
        {children}
      </MuiButton>
      {loading && (
        <CircularProgress
          size={24}
          className={classes.progress}
        />
      )}
    </div>
  )
}

export default Button;

export { Button };
