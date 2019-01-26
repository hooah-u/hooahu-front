// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { NavBar, RoundButton } from "../../Components";
import { Container, Row, Col } from "reactstrap";
import { Link, Route } from "react-router-dom";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import unitJson from "../../Json/unit";
import { connect } from "react-redux";
import * as AuthAction from "../../ActionCreators/AuthAction";
import * as UserAction from "../../ActionCreators/UserAction";

const mapStateToProps = state => {
  return {};
};

const defaultProps = {};
const propTypes = {};

const styles = {
  customWidth: {
    width: 400,
    marginTop: 30
  },
  button: {
    marginLeft: 10,
    backgroundColor: "red"
  },
  buttonColor: {
    backgroundColor: "#E25F70"
  },
  input: {
    marginLeft: 24,
    marginRight: 25,
    width: 155
  }
};

class SignUpWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "A"
    };
  }

  handleDrop = (event, key, value) => {
    this.setState({ status: value });
  };

  handleNext = () => {
    const {
      email,
      password,
      first,
      last,
      nick,
      type,
      c_type,
      w_type,
      area,
      camp,
      picture,
      fbToken
    } = this.props.location.state;

    console.log("이메일 :" + email);
    console.log("비밀번호 :" + password);
    console.log("성 :" + last);
    console.log("이름 :" + first);
    console.log("닉네임 :" + nick);
    console.log("타입 :" + type);
    console.log("c타입: " + c_type);
    console.log("w타입 :" + w_type);
    console.log("Area :" + area);
    console.log("Camp :" + camp);
    console.log("picture :" + picture);
    console.log("fbToken :" + fbToken);

    const params = {
      first_name: first,
      last_name: last,
      nickname: nick,
      email: email,
      password: password,
      picture: picture,
      fbToken: fbToken,
      type: type,
      c_type: c_type,
      w_type: w_type,
      area: area,
      camp: camp,
      reason: this.state.status
    };
    console.log(params);
    this.props.dispatch(AuthAction.postSignUp(params)).then(async value => {
      const params = { props: { token: value } };
      await this.props.dispatch(UserAction.getUser(params));
      await this.props.history.replace({
        pathname: "/"
      });
    });
  };

  render() {
    return (
      <Container className="signUpWork">
        <NavBar menuVisible={true} isActive="auth" />
        <Row className="signUpWork__content">
          <div className="signUpWork__content__title">
            <h1>Choose your interest</h1>
            <DropDownMenu
              value={this.state.status}
              onChange={this.handleDrop}
              style={styles.customWidth}
              autoWidth={false}
            >
              <MenuItem value="A" primaryText="Travel Information" />
              <MenuItem value="B" primaryText="Local Community" />
              <MenuItem value="C" primaryText="Yard Sale" />
              <MenuItem value="D" primaryText="Making friends" />
              <MenuItem value="E" primaryText="Real Estate" />
              <MenuItem value="F" primaryText="Other" />
            </DropDownMenu>

            <RoundButton
              className="signUpWork__content__title__button"
              text="Sign Up"
              onClick={this.handleNext}
              textClassName="signUpWork__content__title__button__text"
            />
          </div>
        </Row>
      </Container>
    );
  }
}

SignUpWork.defaultProps = defaultProps;
SignUpWork.propTypes = propTypes;

export default connect(mapStateToProps)(SignUpWork);
