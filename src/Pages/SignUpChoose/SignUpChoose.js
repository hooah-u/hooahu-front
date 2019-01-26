// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import { NavBar } from "../../Components";
import { Container, Row, Col, Button } from "reactstrap";
import TextField from "material-ui/TextField";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";

const defaultProps = {};
const propTypes = {};
const styles = {
  block: {
    marginTop: 20,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 10
  },
  radioButton: {
    marginBottom: 16
  },
  label: {
    width: 200,
    fontSize: 18,
    color: "#9b9b9b"
  },
  labelCivilian: {
    fontSize: 18,
    color: "#9b9b9b"
  }
};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class SignUpChoose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Military"
    };
  }

  handleChoose = (event, value) => {
    this.setState({ status: value });
  };

  handleNext = () => {
    const { location } = this.props;
    if (location.state === undefined) {
      //일반 로그인
      if (this.state.status === "Military") {
        this.props.history.push({
          pathname: "/signup/email",
          state: { type: this.state.status }
        });
      } else {
        this.props.history.push({
          pathname: "/signup/civ",
          state: { type: this.state.status }
        });
      }
    } else {
      //페이스북 로그인 시
      if (this.state.status === "Military") {
        this.props.history.push({
          pathname: "/signup/unit",
          state: {
            type: this.state.status,
            fbLogin: location.state.fbLogin
          }
        });
      } else {
        this.props.history.push({
          pathname: "/signup/civ",
          state: { type: this.state.status, fbLogin: location.state.fbLogin }
        });
      }
    }
  };

  componentDidMount() {
    console.log("SignUpChoose --component Did Mount");
    console.log(this.props.location);
  }

  render() {
    // console.log(this.state.status);
    return (
      <div>
        <Container className="signUpChoose">
          <NavBar menuVisible={true} isActive="auth" />
          <Row className="signUpChoose__content">
            <div className="signUpChoose__content__title">
              <h1 className="signUpChoose__content__title__text">
                Who are you?
              </h1>

              <RadioButtonGroup
                name="shipSpeed"
                valueSelected={this.state.status}
                onChange={this.handleChoose}
                style={styles.block}
              >
                <RadioButton
                  value="Military"
                  label="Military Personnel"
                  style={styles.radioButton}
                  labelStyle={styles.label}
                />
                <RadioButton
                  value="Civ"
                  label="Civilian"
                  style={styles.radioButton}
                  labelStyle={styles.labelCivilian}
                />
              </RadioButtonGroup>

              <Button
                className="signUpChoose__content__title__button"
                onClick={this.handleNext}
              >
                <span className="signUpChoose__content__title__button__text">
                  Next
                </span>
              </Button>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

SignUpChoose.defaultProps = defaultProps;
SignUpChoose.propTypes = propTypes;

export default connect(mapStateToProps)(SignUpChoose);
