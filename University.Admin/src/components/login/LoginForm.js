import React from 'react';
import { Form, withFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

import TextBox from '@components/shared/controls/TextBox';
import CheckBox from '@components/shared/controls/CheckBox';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  cancelButton: {
    float: 'right',
  },
}));

function LoginForm() {
  const classes = useStyles();

  return (
    <Form>
      <div>
        <TextBox
          name="email"
          label="Email"
          autoFocus
        />
      </div>
      <div>
        <TextBox
          name="password"
          type="password"
          label="Password"
        />
      </div>
      <div>
        <CheckBox
          name="remember"
          label="Remember Me"
        />
      </div>
      <Button
        type="submit"
        color="primary"
        variant="contained"
      >
        Login
      </Button>
      <Button
        variant="outlined"
        component={Link}
        to="/"
        className={classes.cancelButton}
      >
        Cancel
      </Button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues: props => ({
    email: '',
    password: '',
    remember: false,
  }),
  validationSchema: Yup.object().shape({
    email: Yup
      .string()
      .email('Invalid Email')
      .required('Required'),
    password: Yup.string().required('Required'),
    remember: Yup.boolean().required('Required'),
  }),
  handleSubmit: (values, bag) => bag.props.onSubmit(values),
})(LoginForm);
