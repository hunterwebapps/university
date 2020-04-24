import React from 'react';

import { Field } from 'formik';
import { Input, InputLabel, FormControl, FormHelperText } from '@material-ui/core';

export default function TextBox({
  id,
  name,
  label,
  type = 'text',
  ...rest
}) {
  return (
    <Field name={name}>
      {({ field, meta }) => {
        const showError = !!meta.error && meta.touched;
        id = id || name;
        return (
          <FormControl error={showError}>
            <InputLabel htmlFor={id}>
              {label}
            </InputLabel>
            <Input
              id={id}
              error={showError}
              type={type}
              {...field}
              {...rest}
            />
            {showError && <FormHelperText>{meta.error}</FormHelperText>}
          </FormControl>
        );
      }}
    </Field>
  )
}

export { TextBox };
