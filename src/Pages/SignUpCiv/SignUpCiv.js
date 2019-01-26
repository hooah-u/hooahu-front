// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { NavBar, RoundButton } from "../../Components";
import { Container, Row, Col } from "reactstrap";
import { Link, Route } from "react-router-dom";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import unitJson from "../../Json/unit";

const defaultProps = {};
const propTypes = {};

const styles = {
  customWidth: {
    width: 320
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

class SignUpCiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Military Family"
    };
  }

  handleDrop = (event, key, value) => {
    this.setState({ status: value });
  };

  handleNext = () => {
    const { location } = this.props;
    if (location.state.fbLogin) {
      this.props.history.push({
        pathname: "/signup/unit",
        state: {
          type: this.props.location.state.type,
          c_type: this.state.status,
          fbLogin: location.state.fbLogin
        }
      });
    } else {
      this.props.history.push({
        pathname: "/signup/email",
        state: {
          type: this.props.location.state.type,
          c_type: this.state.status
        }
      });
    }
  };

  render() {
    return (
      <Container className="signUpCiv">
        <NavBar menuVisible={true} isActive="auth" />
        <Row className="signUpCiv__content">
          <div className="signUpCiv__content__title">
            <h1>Choose your type</h1>
            <DropDownMenu
              value={this.state.status}
              onChange={this.handleDrop}
              style={styles.customWidth}
              listStyle={styles.menuItem}
            >
              <MenuItem value="Military Family" primaryText="Military Family" />
              <MenuItem value="Army Civilian" primaryText="Army Civilian" />
              <MenuItem value="Business Owner" primaryText="Business Owner" />
              <MenuItem value="Regular User" primaryText="Regular User" />
            </DropDownMenu>

            <RoundButton
              className="signUpCiv__content__title__button"
              text="Next"
              onClick={this.handleNext}
              textClassName="signUpCiv__content__title__button__text"
            />
          </div>
        </Row>
      </Container>
    );
  }
}

SignUpCiv.defaultProps = defaultProps;
SignUpCiv.propTypes = propTypes;

export default SignUpCiv;
