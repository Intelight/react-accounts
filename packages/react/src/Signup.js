import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { PasswordSignupFields, validators } from '@accounts/common';
import isString from 'lodash/isString';
import { Form, FormInput } from 'react-form';

class Signup extends Component {
  static propTypes = {
    accounts: PropTypes.object,
    Container: PropTypes.func,
    Content: PropTypes.func,
    Avatar: PropTypes.func,
    SignupFields: PropTypes.func,
    SignupEmailOptionalField: PropTypes.func,
    SignupEmailField: PropTypes.func,
    SignupUsernameField: PropTypes.func,
    SignupPasswordField: PropTypes.func,
    SignupPasswordConfirmField: PropTypes.func,
    SignupButton: PropTypes.func,
    Header: PropTypes.func,
    Footer: PropTypes.func,
    FormError: PropTypes.func,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      formError: '',
    };
  }
  onSubmit = async ({
    username,
    email,
    password,
  }) => {
    const { accounts } = this.props;
    this.setState({
      formError: '',
    });
    try {
      await accounts.createUser({
        username,
        email,
        password,
      });
    } catch (err) {
      this.setState({
        formError: err.message,
      });
    }
  }
  validate = ({
    username,
    email,
    password,
    passwordConfirm,
  }) => {
    const { passwordSignupFields } = this.props.accounts.options();
    const {
          EMAIL_ONLY,
          USERNAME_ONLY,
          USERNAME_AND_EMAIL,
          USERNAME_AND_OPTIONAL_EMAIL,
      } = PasswordSignupFields;
    const toReturn = {
      password: (() => { //eslint-disable-line
        const { minimumPasswordLength } = this.props.accounts.options();
        if (!password) {
          return 'Password is required';
        }
        if (isString(password) && password.length < minimumPasswordLength) {
          return `Password must be at least ${minimumPasswordLength} characters`;
        }
      })(),
      passwordConfirm: password !== passwordConfirm ? 'Passwords do not match' : undefined,
    };

    if (passwordSignupFields === EMAIL_ONLY || USERNAME_AND_EMAIL) {
      toReturn.email = (() => {
        if (!email) {
          return 'Email is required';
        }
        if (!validators.isEmail(email)) {
          return 'Email is not valid';
        }
        return undefined;
      })();
    }

    if (passwordSignupFields === USERNAME_AND_OPTIONAL_EMAIL) {
      toReturn.email = (() => {
        if (!validators.isEmail(email)) {
          return 'Email is not valid';
        }
        return undefined;
      })();
    }

    if (passwordSignupFields === USERNAME_ONLY || USERNAME_AND_EMAIL) {
      toReturn.username = !username ? 'Username is required' : undefined;
    }

    return toReturn;
  }
  renderSignupFields = (form) => {
    const {
      accounts,
      SignupFields,
      SignupEmailField,
      SignupEmailOptionalField,
      SignupUsernameField,
      SignupPasswordField,
      SignupPasswordConfirmField,
    } = this.props;
    const type = accounts.options().passwordSignupFields;
    const {
          EMAIL_ONLY,
          USERNAME_ONLY,
          USERNAME_AND_EMAIL,
          USERNAME_AND_OPTIONAL_EMAIL,
      } = PasswordSignupFields;
    switch (type) {
      case EMAIL_ONLY:
        return (
          <SignupFields>
            <FormInput field="email" showErrors={false}>
              {() =>
                <SignupEmailField
                  {...form}
                  label="Email"
                  value={form.getValue('email', '')}
                  onChange={e => form.setValue('email', e.target.value)}
                  errorText={form.getTouched('email') && isString(form.getError('email')) ? form.getError('email') : ''}
                />
              }
            </FormInput>
            <FormInput field="password" showErrors={false}>
              {() =>
                <SignupPasswordField
                  {...form}
                  label="Password"
                  value={form.getValue('password', '')}
                  onChange={e => form.setValue('password', e.target.value)}
                  errorText={form.getTouched('password') && isString(form.getError('password')) ? form.getError('password') : ''}
                />
              }
            </FormInput>
            <FormInput field="passwordConfirm" showErrors={false}>
              {() =>
                <SignupPasswordConfirmField
                  {...form}
                  label="Confirm password"
                  value={form.getValue('passwordConfirm', '')}
                  onChange={e => form.setValue('passwordConfirm', e.target.value)}
                  errorText={form.getTouched('passwordConfirm') && isString(form.getError('passwordConfirm')) ? form.getError('passwordConfirm') : ''}
                />
              }
            </FormInput>
          </SignupFields>);
      case USERNAME_ONLY:
        return (
          <SignupFields>
            <FormInput field="username" showErrors={false}>
              {() =>
                <SignupUsernameField
                  {...form}
                  label="Username"
                  value={form.getValue('username', '')}
                  onChange={e => form.setValue('username', e.target.value)}
                  errorText={form.getTouched('username') && isString(form.getError('username')) ? form.getError('username') : ''}
                />
              }
            </FormInput>
            <FormInput field="password" showErrors={false}>
              {() =>
                <SignupPasswordField
                  {...form}
                  label="Password"
                  value={form.getValue('password', '')}
                  onChange={e => form.setValue('password', e.target.value)}
                  errorText={form.getTouched('password') && isString(form.getError('password')) ? form.getError('password') : ''}
                />
              }
            </FormInput>
            <FormInput field="passwordConfirm" showErrors={false}>
              {() =>
                <SignupPasswordConfirmField
                  {...form}
                  label="Confirm password"
                  value={form.getValue('passwordConfirm', '')}
                  onChange={e => form.setValue('passwordConfirm', e.target.value)}
                  errorText={form.getTouched('passwordConfirm') && isString(form.getError('passwordConfirm')) ? form.getError('passwordConfirm') : ''}
                />
              }
            </FormInput>
          </SignupFields>
        );
      case USERNAME_AND_EMAIL:
        return (
          <SignupFields>
            <FormInput field="username" showErrors={false}>
              {() =>
                <SignupUsernameField
                  {...form}
                  label="Username"
                  value={form.getValue('username', '')}
                  onChange={e => form.setValue('username', e.target.value)}
                  errorText={form.getTouched('username') && isString(form.getError('username')) ? form.getError('username') : ''}
                />
              }
            </FormInput>
            <SignupEmailField
              {...form}
              label="Email"
              value={form.getValue('email', '')}
              onChange={e => form.setValue('email', e.target.value)}
              errorText={form.getTouched('email') && isString(form.getError('email')) ? form.getError('email') : ''}
            />
            <FormInput field="password" showErrors={false}>
              {() =>
                <SignupPasswordField
                  {...form}
                  label="Password"
                  value={form.getValue('password', '')}
                  onChange={e => form.setValue('password', e.target.value)}
                  errorText={form.getTouched('password') && isString(form.getError('password')) ? form.getError('password') : ''}
                />
              }
            </FormInput>
            <FormInput field="passwordConfirm" showErrors={false}>
              {() =>
                <SignupPasswordConfirmField
                  {...form}
                  label="Confirm password"
                  value={form.getValue('passwordConfirm', '')}
                  onChange={e => form.setValue('passwordConfirm', e.target.value)}
                  errorText={form.getTouched('passwordConfirm') && isString(form.getError('passwordConfirm')) ? form.getError('passwordConfirm') : ''}
                />
              }
            </FormInput>
          </SignupFields>
        );
      case USERNAME_AND_OPTIONAL_EMAIL:
        return (
          <SignupFields>
            <SignupUsernameField
              {...form}
              label="Username"
              onChange={e => this.onChangeUsernameField(e)}
              errorText={this.state.usernameFieldErrorText}
            />
            <SignupEmailOptionalField
              {...form}
              label="Email (optional)"
              value={form.getValue('email', '')}
              onChange={e => form.setValue('email', e.target.value)}
              errorText={form.getTouched('email') && isString(form.getError('email')) ? form.getError('email') : ''}
            />
            <SignupPasswordField
              {...form}
              label="Password"
              onChange={e => this.onChangePasswordField(e)}
              errorText={this.state.passwordFieldErrorText}
            />
            <SignupPasswordConfirmField
              {...form}
              label="Confirm password"
              onChange={e => this.onChangePasswordConfirmField(e)}
              errorText={this.state.passwordConfirmFieldErrorText}
            />
          </SignupFields>
        );
      default:
        return null;
    }
  }
  render() {
    const {
      Container,
      Content,
      Header,
      Footer,
      Avatar,
      SignupButton,
      FormError,
      ...otherProps
    } = this.props;
    return (
      <Container>
        <Header />
        <Content {...otherProps}>
          <Avatar />
          <Form
            onSubmit={this.onSubmit}
            validate={this.validate}
          >
            {form =>
              <div>
                {this.renderSignupFields(form)}
                <SignupButton
                  label="Sign up"
                  onClick={form.submitForm}
                />
              </div>
            }
          </Form>
          <FormError errorText={this.state.formError} />
        </Content>
        <Footer />
      </Container>
    );
  }
}

export default Signup;
