// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as AuthAction from "../../ActionCreators/AuthAction";
import * as UserAction from "../../ActionCreators/UserAction";
import { RoundButton } from "../../Components";
import { Container, Row } from "reactstrap";
import FacebookLogin from "react-facebook-login";
import { Fade } from "react-slideshow-image";
import MainLogo from "../../Assets/Images/hooahu_main.png";
import Background1 from "../../Assets/BgImage/bg1.jpg";
import Background2 from "../../Assets/BgImage/bg2.jpg";
import Background3 from "../../Assets/BgImage/bg3.jpg";
import Background4 from "../../Assets/BgImage/bg4.jpg";

const defaultProps = {};
const propTypes = {};

const bgImages = [Background1, Background2, Background3, Background4];

const fadeProperties = {
  duration: 4000,
  transitionDuration: 1000,
  infinite: true,
  indicators: false,
  arrows: false
};

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
      <div className="signUp">
        <div className="signUp__logo" onClick={this.handleLandingPage}>
          <img src={MainLogo} width={160} alt="hooahu-logo" />
        </div>
        <Fade {...fadeProperties}>
          <div className="signUp__background">
            <div className="signUp__background-image">
              <img src={bgImages[0]} />
            </div>
            <Container className="signUp__container">
              <Row className="signUp__container__content">
                <div className="signUp__container__content__title">
                  <h1 className="signUp__container__content__title__header">
                    Share <span>Your</span> Story<span>.</span>
                  </h1>
                  <p className="signUp__container__content__title__parag">
                    Share your moments with colleagues <br />
                    here in the world's strongest alliance.
                  </p>
                </div>
                <br /> <br /> <br />
                <div className="signUp__container__content__title__buttonArea">
                  <Link to="/">
                    <RoundButton
                      text="Sign In"
                      icon="xi-mail"
                      className="signUp__container__content__title__buttonIn"
                      textClassName="signUp__container__content__title__textF"
                      iconClassName="signUp__container__content__title__icon"
                    />
                  </Link>
                </div>
                <div className="signUp__container__content__title__buttonArea">
                  <Link to="/signup/choose">
                    <RoundButton
                      text="Sign Up With Email"
                      icon="xi-mail"
                      className="signUp__container__content__title__button"
                      textClassName="signUp__container__content__title__text"
                      iconClassName="signUp__container__content__title__icon"
                    />
                  </Link>
                </div>
                <div className="signUp__container__content__title">
                  <div className="signUp__container__content__title__buttonArea">
                    <FacebookLogin
                      appId="1974817842817382"
                      autoLoad={false}
                      fields="name,email,picture"
                      scope="public_profile"
                      callback={this.responseFacebook}
                      textButton="Sign up with Facebook"
                      cssClass="signUp__container__content__title__buttonF"
                      textClassName="signUp__container__content__title__textF"
                      iconClassName="signUp__container__content__title__iconF"
                    />
                  </div>
                </div>
              </Row>
            </Container>
          </div>
          <div className="signUp__background">
            <div className="signUp__background-image">
              <img src={bgImages[1]} />
            </div>
            <Container className="signUp__container">
              <Row className="signUp__container__content">
                <div className="signUp__container__content__title">
                  <h1 className="signUp__container__content__title__header">
                    Face <span>the New</span> Culture<span>.</span>
                  </h1>
                  <p className="signUp__container__content__title__parag">
                    Share your moments with colleagues <br />
                    here in the world's strongest alliance.
                  </p>
                </div>
                <br /> <br /> <br />
                <div className="signUp__container__content__title__buttonArea">
                  <Link to="/">
                    <RoundButton
                      text="Sign In"
                      icon="xi-mail"
                      className="signUp__container__content__title__buttonIn"
                      textClassName="signUp__container__content__title__textF"
                      iconClassName="signUp__container__content__title__icon"
                    />
                  </Link>
                </div>
                <div className="signUp__container__content__title__buttonArea">
                  <Link to="/signup/choose">
                    <RoundButton
                      text="Sign Up With Email"
                      icon="xi-mail"
                      className="signUp__container__content__title__button"
                      textClassName="signUp__container__content__title__text"
                      iconClassName="signUp__container__content__title__icon"
                    />
                  </Link>
                </div>
                <div className="signUp__container__content__title">
                  <div className="signUp__container__content__title__buttonArea">
                    <FacebookLogin
                      appId="1974817842817382"
                      autoLoad={false}
                      fields="name,email,picture"
                      scope="public_profile"
                      callback={this.responseFacebook}
                      textButton="Sign up with Facebook"
                      cssClass="signUp__container__content__title__buttonF"
                      textClassName="signUp__container__content__title__textF"
                      iconClassName="signUp__container__content__title__iconF"
                    />
                  </div>
                </div>
              </Row>
            </Container>
          </div>
          <div className="signUp__background">
            <div className="signUp__background-image">
              <img src={bgImages[2]} />
            </div>
            <Container className="signUp__container">
              <Row className="signUp__container__content">
                <div className="signUp__container__content__title">
                  <h1 className="signUp__container__content__title__header">
                    Feel <span>Your</span> Alliance<span>.</span>
                  </h1>
                  <p className="signUp__container__content__title__parag">
                    Share your moments with colleagues <br />
                    here in the world's strongest alliance.
                  </p>
                </div>
                <br /> <br /> <br />
                <div className="signUp__container__content__title__buttonArea">
                  <Link to="/">
                    <RoundButton
                      text="Sign In"
                      icon="xi-mail"
                      className="signUp__container__content__title__buttonIn"
                      textClassName="signUp__container__content__title__textF"
                      iconClassName="signUp__container__content__title__icon"
                    />
                  </Link>
                </div>
                <div className="signUp__container__content__title__buttonArea">
                  <Link to="/signup/choose">
                    <RoundButton
                      text="Sign Up With Email"
                      icon="xi-mail"
                      className="signUp__container__content__title__button"
                      textClassName="signUp__container__content__title__text"
                      iconClassName="signUp__container__content__title__icon"
                    />
                  </Link>
                </div>
                <div className="signUp__container__content__title">
                  <div className="signUp__container__content__title__buttonArea">
                    <FacebookLogin
                      appId="1974817842817382"
                      autoLoad={false}
                      fields="name,email,picture"
                      scope="public_profile"
                      callback={this.responseFacebook}
                      textButton="Sign up with Facebook"
                      cssClass="signUp__container__content__title__buttonF"
                      textClassName="signUp__container__content__title__textF"
                      iconClassName="signUp__container__content__title__iconF"
                    />
                  </div>
                </div>
              </Row>
            </Container>
          </div>
          <div className="signUp__background">
            <div className="signUp__background-image">
              <img src={bgImages[3]} />
            </div>
            <Container className="signUp__container">
              <Row className="signUp__container__content">
                <div className="signUp__container__content__title">
                  <h1 className="signUp__container__content__title__header">
                    Create <span>the New</span> Memory<span>.</span>
                  </h1>
                  <p className="signUp__container__content__title__parag">
                    Share your moments with colleagues <br />
                    here in the world's strongest alliance.
                  </p>
                </div>
                <br /> <br /> <br />
                <div className="signUp__container__content__title__buttonArea">
                  <Link to="/">
                    <RoundButton
                      text="Sign In"
                      icon="xi-mail"
                      className="signUp__container__content__title__buttonIn"
                      textClassName="signUp__container__content__title__textF"
                      iconClassName="signUp__container__content__title__icon"
                    />
                  </Link>
                </div>
                <div className="signUp__container__content__title__buttonArea">
                  <Link to="/signup/choose">
                    <RoundButton
                      text="Sign Up With Email"
                      icon="xi-mail"
                      className="signUp__container__content__title__button"
                      textClassName="signUp__container__content__title__text"
                      iconClassName="signUp__container__content__title__icon"
                    />
                  </Link>
                </div>
                <div className="signUp__container__content__title">
                  <div className="signUp__container__content__title__buttonArea">
                    <FacebookLogin
                      appId="1974817842817382"
                      autoLoad={false}
                      fields="name,email,picture"
                      scope="public_profile"
                      callback={this.responseFacebook}
                      textButton="Sign up with Facebook"
                      cssClass="signUp__container__content__title__buttonF"
                      textClassName="signUp__container__content__title__textF"
                      iconClassName="signUp__container__content__title__iconF"
                    />
                  </div>
                </div>
              </Row>
            </Container>
          </div>
        </Fade>
      </div>
    );
  }

  handleLandingPage = () => {
    this.props.history.push({
      pathname: "/signup"
    });
  };

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

  responseFacebook = response => {
    const { history } = this.props;
    if (response.hasOwnProperty("status") && response.status === undefined) {
      history.replace({
        pathname: "/signup"
      });
    } else {
      let fbLogin;
      if (response.email === undefined || response.email === "") {
        response.email = response.userID + "@facebook.com";
        fbLogin = response;
      } else {
        fbLogin = response;
      }
      history.push({
        pathname: "/signup/choose",
        state: {
          fbLogin
        }
      });
    }
  };
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default connect(mapStateToProps)(SignUpPage);
