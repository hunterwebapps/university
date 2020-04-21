import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PrimaryLayout from '@layouts/PrimaryLayout';
import Login from '@/components/login/Login';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%'
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  return (
    <PrimaryLayout>
      <div className={classes.container}>
        <Login />
      </div>
    </PrimaryLayout>
  );
}
