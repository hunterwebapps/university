import React from 'react';
import { connect } from 'react-redux';
import { login } from '@store/auth';

import LoginForm from './LoginForm';

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  login,
};

function Login({ login, success }) {
  return (
    <LoginForm onSubmit={login} />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
