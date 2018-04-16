import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit({ email, password, confirmPassword }) {
    // Call action creator to sign up the user
    this.props.signupUser({ email, password });
  }

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

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
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
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    );
  }
}

function validate({ email, password, confirmPassword }) {
  const errors = {};

  if (!email) {
    errors.email = 'Please enter a email';
  }

  if (!password) {
    errors.password = 'Please enter a password';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please enter a password confirmation';
  }

  if (password && password !== confirmPassword) {
    errors.confirmPassword = 'Password must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'confirmPassword'],
  validate
})(connect(mapStateToProps, actions)(Signup));
