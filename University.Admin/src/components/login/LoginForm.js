import React from 'react';
import { Form, withFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

import TextBox from '@controls/TextBox';
import CheckBox from '@controls/CheckBox';
import Button from '@controls/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function LoginForm({ isSubmitting }) {
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
      <div className={classes.actions}>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to="/"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
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
