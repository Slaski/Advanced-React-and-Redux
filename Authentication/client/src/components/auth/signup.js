import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit({ email, password, confirmPassword }) {}

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <fieldset className={className}>
        <label>{field.label}</label>
        <input className="form-control" type={field.type} {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </fieldset>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          component={this.renderField}
          type="text"
        />
        <Field
          label="Password"
          name="password"
          component={this.renderField}
          type="password"
        />
        <Field
          label="Confirm Password"
          name="confirmPassword"
          component={this.renderField}
          type="password"
        />
        <button type="submit">Sign up</button>
      </form>
    );
  }
}

function validate({ email, password, confirmPassword }) {
  const errors = {};

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Password must match';
  }

  return errors;
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'confirmPassword'],
  validate
})(Signup);
