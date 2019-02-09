// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import unitJson from "../../Json/unit";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { NavBar } from "../../Components";

import * as AuthAction from "../../ActionCreators/AuthAction";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult,
    user: state.reducer.user,
    token: state.reducer.token
  };
};

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      nickname: "",
      area: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.id === 0 && nextProps.user.id !== 0) {
      this.setState({ area: nextProps.user.area });
      this.setState({ nickname: nextProps.user.nickname });
    }
  }

  componentWillMount() {
    if (this.props.user.id !== 0) {
      this.setState({ area: this.props.user.area });
      this.setState({ nickname: this.props.user.nickname });
    }
  }

  render() {
    // console.log(this.props.user);
    const { user } = this.props;
    const unit = unitJson.data;
    return (
      <div className="profilePage">
        <NavBar />
        <div className="profilePage__editForm">
          <div>
            Nickname{" "}
            <input
              type="text"
              name="nickname"
              placeholder="NICKNAME"
              defaultValue={user && user.nickname}
              onChange={e => this.setState({ nickname: e.target.value })}
            />
          </div>
          <div>
            Area
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>{this.state.area}</DropdownToggle>
              <DropdownMenu>
                {unit.map((data, index) => {
                  return (
                    <DropdownItem
                      key={`profile-page-area${data.area}`}
                      onClick={() => this.setState({ area: data.area })}
                    >
                      {data.area}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </div>

          <br />
          <button value="Submit" onClick={this.onClickChangeProfile}>
            프로필 정보 변경
          </button>
        </div>
      </div>
    );
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onClickChangeProfile = () => {
    const params = {
      props: this.props,
      body: {
        nickname: this.state.nickname,
        area: this.state.area
      }
    };
    this.props.dispatch(AuthAction.postChangeProfile(params)).then(result => {
      this.props.history.push({
        pathname: `/@${this.props.user.id}`
      });
    });
  };
}

ProfilePage.defaultProps = defaultProps;
ProfilePage.propTypes = propTypes;

export default connect(mapStateToProps)(ProfilePage);
