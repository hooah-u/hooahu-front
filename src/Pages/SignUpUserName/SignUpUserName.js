// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { NavBar, RoundButton, RoundInput } from "../../Components";
import { Container, Row } from "reactstrap";

const defaultProps = {};
const propTypes = {};

class SignUpUserName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "",
      last: "",
      nick: ""
    };
  }

  handleNext = () => {
    const { c_type, email, password, type } = this.props.location.state;

    if (
      c_type === "Military Family" ||
      c_type === "Army Civilian" ||
      c_type === "Military" ||
      (c_type === "" && type === "Military") ||
      (c_type === null && type === "Military") ||
      (c_type === undefined && type === "Military")
    ) {
      this.props.history.push({
        pathname: "/signup/unit",
        state: {
          type: type,
          c_type: c_type,
          email: email,
          password: password,
          first: this.state.first,
          last: this.state.last,
          nick: this.state.nick
        }
      });
    } else {
      this.props.history.push({
        pathname: "/signup/business",
        state: {
          type: type,
          c_type: c_type,
          email: email,
          password: password,
          first: this.state.first,
          last: this.state.last,
          nick: this.state.nick
        }
      });
    }
  };

  handleFirst = e => {
    this.setState({ first: e.target.value });
  };

  handleLast = e => {
    this.setState({ last: e.target.value });
  };

  handleNick = e => {
    this.setState({ nick: e.target.value });
  };

  render() {
    return (
      <Container className="signUpUserName">
        <NavBar menuVisible={true} isActive="auth" />
        <Row className="signUpUserName__content">
          <div className="signUpUserName__content__title">
            <h1 className="signUpUserName__content__title__text">
              What is your name?
            </h1>
            <div className="signUpUserName__content__title__input">
              <RoundInput
                type="text"
                placeholder="First name"
                onChange={this.handleFirst}
              />
              <div className="signUpUserName__content__title__input__sub">
                <RoundInput
                  type="text"
                  placeholder="Last name"
                  onChange={this.handleLast}
                />
              </div>
              <div className="signUpUserName__content__title__input__sub">
                <RoundInput
                  type="text"
                  placeholder="Nick name"
                  onChange={this.handleNick}
                />
              </div>
            </div>
            <RoundButton
              className="signUpUserName__content__title__button"
              text="Next"
              onClick={this.handleNext}
              textClassName="signUpUserName__content__title__text"
            />
          </div>
        </Row>
      </Container>
    );
  }
}

SignUpUserName.defaultProps = defaultProps;
SignUpUserName.propTypes = propTypes;

export default SignUpUserName;
