import React from 'react';
import { connect } from 'react-redux';
import { login } from '@/store/auth/actions';

import LoginForm from './LoginForm';
import { success } from '@/store/snackbar/actions';

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  login,
  success,
};

function Login({ login, success }) {
  success({ message: 'Saved Successfully!' })
  success({ message: 'Making gains :)' });
  return (
    <LoginForm onSubmit={login} />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
