import React from 'react';
import { connect } from 'react-redux';
import { login, selectLoading } from '@store/auth';

import LoginForm from './LoginForm';

const mapStateToProps = state => ({
  loading: selectLoading(state),
});

const mapDispatchToProps = {
  login,
};

function Login({ login, loading }) {
  return (
    <LoginForm onSubmit={login} loading={loading} />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
