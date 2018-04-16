import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
    // Need to do something to log the user in
    this.props.signinUser({ email, password });
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
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(connect(null, actions)(Signin));
