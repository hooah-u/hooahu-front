// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as AuthAction from "../../ActionCreators/AuthAction";
import * as UserAction from "../../ActionCreators/UserAction";
import { NavBar, RoundButton } from "../../Components";
import { Container, Row } from "reactstrap";
import FacebookLogin from "react-facebook-login";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult,
    email: "",
    password: ""
  };
};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userID: "",
      name: "",
      picture: "",
      fbLogin: {}
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Container className="signUp">
          <NavBar isActive="auth" />
          <Row className="signUp__content">
            {/* <br /> <br /> <br /> <br /> <br /> <br /> */}
            <div className="signUp__content__title">
              <h1 className="signUp__content__title__header">
                Sign In to Hooah!U
              </h1>
            </div>
            <br />
            {/* <br />
            <br /> */}
            {/* <div className="signUp__content__inputArea">
              <RoundInput onChange={this.handleEmail} placeholder="Email" />
            </div>
            <div className="signUp__content__inputArea">
              <RoundInput
                onChange={this.handlePassword}
                placeholder="Password"
                type="password"
              />
            </div> 
            <div className="signUp__content__title__buttonArea">
              <RoundButton
                text="Sign In"
                icon="xi-mail"
                className="signUp__content__title__buttonIn"
                textClassName="signUp__content__title__buttonIn__text"
                iconClassName="signUp__content__title__icon"
                onClick={this.handleSignIn}
              />
            </div> */}
            <div className="signUp__content__title__buttonArea">
              <Link to="/">
                <RoundButton
                  text="Sign In"
                  icon="xi-mail"
                  className="signUp__content__title__button"
                  textClassName="signUp__content__title__text"
                  iconClassName="signUp__content__title__icon"
                />
              </Link>
            </div>
            <div className="signUp__content__title__buttonArea">
              <Link to="/signup/choose">
                <RoundButton
                  text="Sign Up With Email"
                  icon="xi-mail"
                  className="signUp__content__title__button"
                  textClassName="signUp__content__title__text"
                  iconClassName="signUp__content__title__icon"
                />
              </Link>
            </div>
            <div className="signUp__content__title">
              <div className="signUp__content__title__buttonArea">
                <FacebookLogin
                  appId="1974817842817382"
                  autoLoad={true}
                  fields="name,email,picture"
                  onClick={this.componentClicked}
                  callback={this.responseFacebook}
                  textButton="Sign up with Facebook"
                  className="signUp__content__title__buttonF"
                  textClassName="signUp__content__title__textF"
                  iconClassName="signUp__content__title__iconF"
                />
              </div>
            </div>
          </Row>
        </Container>
      </div>
    );
  }

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleSignIn = () => {
    const params = { email: this.state.email, password: this.state.password };
    this.props.dispatch(AuthAction.postSignIn(params)).then(async value => {
      if (value === "failed") {
        return null;
      } else {
        await this.props.dispatch(UserAction.getUser(value));
        await this.props.history.push({
          pathname: "/"
        });
      }
    });
  };

  componentClicked = () => {
    const { history } = this.props;
    history.push({
      pathname: "/signup/choose",
      state: {
        fbLogin: JSON.parse(localStorage.getItem("hooahu-signup-facebookObj"))
      }
    });
  };

  responseFacebook = response => {
    if (response.email === undefined || response.email === "") {
      response.email = response.userID + "@facebook.com";
      const fbLogin = response;
      localStorage.setItem(
        "hooahu-signup-facebookObj",
        JSON.stringify(fbLogin)
      );
    } else {
      localStorage.setItem(
        "hooahu-signup-facebookObj",
        JSON.stringify(response)
      );
    }
  };
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default connect(mapStateToProps)(SignUpPage);
