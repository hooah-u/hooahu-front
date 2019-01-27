// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { NavBar, RoundButton } from "../../Components";
import { Container, Row } from "reactstrap";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import businessJson from "../../Json/business";
import regularJson from "../../Json/regular";
import areaJson from "../../Json/unit";

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
  },
  menu: {}
};

class SignUpBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArea: 0,
      selectedBusiness: 0
    };
  }

  handleDrop = (event, key, value) => {
    this.setState({ selectedBusiness: value });
  };

  handleArea = (event, key, value) => {
    this.setState({ selectedArea: value });
  };

  handleNext = () => {
    const business = businessJson.data;
    const area = areaJson.data;
    const {
      email,
      password,
      first,
      last,
      nick,
      type,
      c_type
    } = this.props.location.state;
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
        w_type: business[this.state.selectedBusiness],
        area: area[this.state.selectedArea].area,
        camp: ""
      }
    });
  };

  render() {
    const { c_type } = this.props.location.state;
    const business = businessJson.data;
    const regular = regularJson.data;
    const area = areaJson.data;
    return (
      <Container className="signUpBusiness">
        <NavBar menuVisible={true} isActive="auth" />
        <Row className="signUpBusiness__content">
          <div className="signUpBusiness__content__title">
            <h1>Choose your detail that describes you</h1>
            <DropDownMenu
              value={this.state.selectedArea}
              onChange={this.handleArea}
              style={styles.customWidth}
              listStyle={styles.menu}
            >
              {area.map((data, index) => {
                return (
                  <MenuItem key={index} value={index} primaryText={data.area} />
                );
              })}
            </DropDownMenu>
            {c_type === "Business Owner" ? (
              <DropDownMenu
                value={this.state.selectedBusiness}
                onChange={this.handleDrop}
                style={styles.customWidth}
                listStyle={styles.menu}
              >
                {business.map((data, index) => {
                  return (
                    <MenuItem key={index} value={index} primaryText={data} />
                  );
                })}
              </DropDownMenu>
            ) : (
              <DropDownMenu
                value={this.state.selectedBusiness}
                onChange={this.handleDrop}
                style={styles.customWidth}
                autoWidth={false}
              >
                {regular.map((data, index) => {
                  return (
                    <MenuItem key={index} value={index} primaryText={data} />
                  );
                })}
              </DropDownMenu>
            )}

            <RoundButton
              className="signUpBusiness__content__title__button"
              text="Next"
              onClick={this.handleNext}
              textClassName="signUpBusiness__content__title__button__text"
            />
          </div>
        </Row>
      </Container>
    );
  }
}

SignUpBusiness.defaultProps = defaultProps;
SignUpBusiness.propTypes = propTypes;

export default SignUpBusiness;
