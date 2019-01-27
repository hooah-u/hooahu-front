// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import cx from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as AuthAction from "../../ActionCreators/AuthAction";
import { Thumb } from "../";
import { confirmAlert } from "react-confirm-alert";
import MainLogo from "../../Assets/Images/hooahu_main.png";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    isLogin: state.reducer.isLogin,
    user: state.reducer.user
  };
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleEditor = () => {
    const { isLogin } = this.props;
    if (!isLogin) {
      this.props.history.push({
        pathname: "/signup"
      });
    } else {
      this.props.history.push({
        pathname: "/editor_choice"
      });
    }
  };

  handleSignUp = () => {
    this.props.history.push({
      pathname: "/signup"
    });
  };

  handleHome = () => {
    this.props.history.push({
      pathname: "/"
    });
  };

  handleUser = () => {
    this.props.history.push({
      pathname: "/@" + this.props.user.id
    });
  };

  handleAuth = () => {
    confirmAlert({
      title: "Confirm to sign out",
      message: "Are you sure to sign out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.dispatch(AuthAction.signOut()).then(value => {
              this.props.history.replace({ pathname: "/" });
            });
          }
        },
        {
          label: "No",
          onClick: () => null
        }
      ]
    });
  };

  handleGuide = () => {
    this.props.history.push({
      pathname: "/guide"
    });
  };

  handlePrivacy = () => {
    this.props.history.push({
      pathname: "/privacypolicy"
    });
  };

  handleTerms = () => {
    this.props.history.push({
      pathname: "/termsofsevice"
    });
  };

  render() {
    const { isLogin, isActive, user, isStart } = this.props;
    return (
      <Navbar className="navBar" light expand="md" fixed="top">
        <NavbarBrand className="navBar__logo" onClick={this.handleHome}>
          <img src={MainLogo} width={130} alt="hooahu-logo" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          {this.props.menuVisible === true ? null : (
            <Nav className={cx("ml-auto", "navBar__items")} navbar>
              {/* {isLogin === true ? (
                <NavItem className="navBar__items__item">
                  <span className="navBar__items__item-bell">
                    <i className="xi-bell" />
                  </span>
                </NavItem>
              ) : null} */}
              {isLogin === true ? (
                <NavItem
                  className="navBar__items__item"
                  onClick={this.handleUser}
                >
                  <Thumb
                    size={30}
                    fontSize={20}
                    src={user && user.profile_img}
                  />
                </NavItem>
              ) : null}

              {isStart === true ? null : (
                <NavItem>
                  <NavLink
                    onClick={this.handleHome}
                    className={cx("navBar__items__item", {
                      "navBar__items__item-active": isActive === "feed"
                    })}
                  >
                    Feed
                  </NavLink>
                </NavItem>
              )}

              {isStart === true ? null : (
                <NavItem>
                  <NavLink
                    className={cx("navBar__items__item", {
                      "navBar__items__item-active": isActive === "editor"
                    })}
                  >
                    <div onClick={this.handleEditor}>Package Trip</div>
                  </NavLink>
                </NavItem>
              )}

              {/* {isStart === true ? null : (
                <NavItem>
                  <NavLink
                    className={cx("navBar__items__item", {
                      "navBar__items__item-active": isActive === "place"
                    })}
                    href="/"
                  >
                    Place List
                  </NavLink>
                </NavItem>
              )} */}

              {isStart === true ? null : (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret />
                  <DropdownMenu right>
                    <DropdownItem onClick={this.handleGuide}>
                      Guide
                    </DropdownItem>
                    {user && user.type === "Civ" && isLogin === true ? (
                      <DropdownItem>Business Solution</DropdownItem>
                    ) : null}
                    <DropdownItem>About</DropdownItem>
                    <DropdownItem onClick={this.handlePrivacy}>
                      Privacy Policy
                    </DropdownItem>
                    <DropdownItem onClick={this.handleTerms}>
                      Terms of Service
                    </DropdownItem>
                    <DropdownItem divider />
                    {isLogin === true ? (
                      <DropdownItem onClick={this.handleAuth}>
                        Sign Out
                      </DropdownItem>
                    ) : (
                      <DropdownItem onClick={this.handleSignUp}>
                        Sign In
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
          )}
        </Collapse>
      </Navbar>
    );
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(NavBar));
