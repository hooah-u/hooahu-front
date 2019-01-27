// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { NavBar, RoundButton } from "../../Components";
import { Container, Row } from "reactstrap";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import unitJson from "../../Json/unit";

const defaultProps = {};
const propTypes = {};

const styles = {
  customWidth: {
    width: 320,
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

class SignUpUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArea: 0,
      selectedUnit: 0
    };
  }

  componentDidMount() {
    console.log("SignUpUnit -- component did mount");
    console.log(this.props.location.state);
  }

  handleArea = (event, key, value) => {
    this.setState({ selectedArea: value });
  };

  handleUnit = (event, key, value) => {
    this.setState({ selectedUnit: value });
  };

  handleNext = () => {
    console.log(this.props.location.state);
    const unit = unitJson.data;
    const {
      email,
      password,
      first,
      last,
      nick,
      type,
      c_type,
      fbLogin
    } = this.props.location.state;
    if (fbLogin) {
      //페이스북 로그인 시
      // 군인 일 경우
      if (c_type === undefined || c_type === null) {
        this.props.history.push({
          pathname: "/signup/reason",
          state: {
            email: fbLogin.email,
            password: "",
            first: fbLogin.name,
            last: "",
            nick: fbLogin.name,
            type: type,
            picture: fbLogin.picture.data.url,
            fbToken: fbLogin.accessToken,
            c_type: "",
            w_type: "",
            area: unit[this.state.selectedArea].area,
            camp: unit[this.state.selectedArea].unit[this.state.selectedUnit]
          }
        });
      } else {
        //일반인일 경우
        this.props.history.push({
          pathname: "/signup/reason",
          state: {
            email: fbLogin.email,
            password: "",
            first: fbLogin.name,
            last: "",
            nick: fbLogin.name,
            picture: fbLogin.picture.data.url,
            fbToken: fbLogin.accessToken,
            type: type,
            c_type: c_type,
            w_type: "",
            area: unit[this.state.selectedArea].area,
            camp: unit[this.state.selectedArea].unit[this.state.selectedUnit]
          }
        });
      }
    } else {
      if (c_type === undefined || c_type === null) {
        this.props.history.push({
          pathname: "/signup/reason",
          state: {
            email: email,
            password: password,
            first: first,
            last: last,
            nick: nick,
            type: type,
            c_type: "",
            w_type: "",
            picture: "",
            fbToken: "",
            area: unit[this.state.selectedArea].area,
            camp: unit[this.state.selectedArea].unit[this.state.selectedUnit]
          }
        });
      } else {
        this.props.history.push({
          pathname: "/signup/reason",
          state: {
            email: email,
            password: password,
            first: first,
            last: last,
            nick: nick,
            type: type,
            c_type: c_type,
            w_type: "",
            picture: "",
            fbToken: "",
            area: unit[this.state.selectedArea].area,
            camp: unit[this.state.selectedArea].unit[this.state.selectedUnit]
          }
        });
      }
    }
  };

  render() {
    const unit = unitJson.data;
    return (
      <Container className="signUpUnit">
        <NavBar menuVisible={true} isActive="auth" />
        <Row className="signUpUnit__content">
          <div className="signUpUnit__content__title">
            <h1>Please enter your Unit.</h1>
            <DropDownMenu
              value={this.state.selectedArea}
              onChange={this.handleArea}
              style={styles.customWidth}
              autoWidth={false}
            >
              {unit.map((data, index) => {
                return (
                  <MenuItem key={index} value={index} primaryText={data.area} />
                );
              })}
            </DropDownMenu>

            <DropDownMenu
              value={this.state.selectedUnit}
              onChange={this.handleUnit}
              style={styles.customWidth}
              autoWidth={false}
            >
              {unit[this.state.selectedArea].unit.map((data, index) => {
                return (
                  <MenuItem key={index} value={index} primaryText={data} />
                );
              })}
            </DropDownMenu>
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

SignUpUnit.defaultProps = defaultProps;
SignUpUnit.propTypes = propTypes;

export default SignUpUnit;
