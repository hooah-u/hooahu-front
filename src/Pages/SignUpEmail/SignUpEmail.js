// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { NavBar, RoundButton, RoundInput } from "../../Components";
import { Container, Row } from "reactstrap";
import * as UserAction from "../../ActionCreators/UserAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class SignUpEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isValid: true,
      isExist: false,
      isLength: true,
      isSecure: true
    };
  }

  render() {
    const { isValid, isExist, isLength, isSecure } = this.state;
    return (
      <Container className="signUpEmail">
        <NavBar menuVisible={true} isActive="auth" />
        <Row className="signUpEmail__content">
          <div className="signUpEmail__content__title">
            <h1 className="signUpEmail__content__title__text">
              What is your email?
            </h1>
            <div className="signUpEmail__content__title__inputArea">
              <RoundInput
                type="email"
                placeholder="ex) abc@gmail.com"
                onChange={this.handleEmailInput}
                errorText={
                  isValid
                    ? isExist
                      ? "This account exists."
                      : null
                    : "Please check your Email again."
                }
              />
            </div>

            <div className="signUpEmail__content__title__passwordArea">
              <RoundInput
                type="password"
                placeholder="password"
                onChange={this.handlePasswordInput}
                errorText={
                  isLength
                    ? isSecure
                      ? null
                      : "Password must be in English and numbers."
                    : "Minimum Length is 8."
                }
              />
            </div>
            <RoundButton
              className="signUpEmail__content__title__button"
              text="Next"
              onClick={this.handleNext}
              textClassName="signUpEmail__content__title__text"
              disabled={!(isValid && !isExist && isLength && isSecure)}
            />
          </div>
        </Row>
      </Container>
    );
  }

  handleNext = () => {
    if (!(this.state.email === "" || this.state.password === "")) {
      this.props.history.push({
        pathname: "/signup/username",
        state: {
          type: this.props.location.state.type,
          c_type: this.props.location.state.c_type,
          email: this.state.email,
          password: this.state.password
        }
      });
    }
  };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleEmailInput = e => {
    this.setState({ email: e.target.value });
    const { dispatch } = this.props;
    const params = { email: e.target.value };
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    this.setState({ isValid: re.test(e.target.value) });

    dispatch(UserAction.checkEmail(params)).then(value => {
      if (value.isExists) {
        this.setState({ isExist: true });
      } else {
        this.setState({ isExist: false });
      }
    });
  };

  handlePasswordInput = e => {
    this.setState({ password: e.target.value });
    const re = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z!@#$%^&*?~{}`\[\]=\-\/+_\()\\><|,\.$;:'"]{8,}$/;
    this.setState({ isSecure: re.test(e.target.value) });
    if (e.target.value.length >= 8) {
      this.setState({ isLength: true });
    } else {
      this.setState({ isLength: false });
    }
  };
}

SignUpEmail.defaultProps = defaultProps;
SignUpEmail.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(SignUpEmail));
