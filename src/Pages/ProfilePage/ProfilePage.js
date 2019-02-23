// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import unitJson from "../../Json/unit";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import FileInputComponent from "react-file-input-previews-base64";

import { NavBar, Thumb, RoundInput } from "../../Components";

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
      area: "",
      old_pass: "",
      new_pass: "",
      isvalid: false,
      showCrop: false,
      targetImg: "",
      croppedImg: ""
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
    const { showCrop } = this.state;
    const unit = unitJson.data;
    return (
      <div className="profilePage">
        <NavBar />
        <div className="profilePage__editForm">
          <div className="profilePage__editForm__form">
            <p>Nickname</p>
            <RoundInput
              type="text"
              name="nickname"
              defaultValue={user && user.nickname}
              onChange={e => this.setState({ nickname: e.target.value })}
            />
          </div>
          <br />
          <div className="profilePage__editForm__form">
            <p>Area</p>
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
            <br />
            <button
              className="profilePage__button"
              onClick={this.onClickChangeProfile}
            >
              save
            </button>
          </div>

          <br />

          {user && user.password === null ? null : (
            <div className="profilePage__editForm__form">
              <p>Password</p>
              <br />
              <RoundInput
                type="text"
                name="password"
                placeholder="ORIGINAL PASSWORD"
                onChange={e => this.setState({ old_pass: e.target.value })}
              />
              <br />
              <RoundInput
                type="text"
                name="password"
                placeholder="NEW PASSWORD"
                onChange={e => this.setState({ new_pass: e.target.value })}
              />
              <br />
              <RoundInput
                type="text"
                name="password"
                placeholder="CONFIRM PASSWORD"
                onChange={e => this.handleConfirm(e.target.value)}
              />
              <button
                value="Submit"
                onClick={this.onClickChangePassword}
                disabled={!this.state.isvalid}
                className="profilePage__button"
              >
                save
              </button>
            </div>
          )}
          <br />
        </div>
        <div className="profilePage__image">
          {user && user.password === null ? null : (
            <Fragment>
              <FileInputComponent
                parentStyle={{
                  margin: 0,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column"
                }}
                labelText="Select Image"
                labelStyle={{ fontSize: 14 }}
                multiple={true}
                callbackFunction={this.handleFile}
                imagePreview={false}
                buttonComponent={
                  showCrop ? (
                    <span className="socialInput__footer__camera__icon">
                      <i className="xi-camera" />
                    </span>
                  ) : (
                    <Thumb
                      src={user && user.profile_img}
                      fontSize={100}
                      size={100}
                    />
                  )
                }
                accept="image/*"
              />
              {showCrop ? (
                <Cropper
                  ref="cropper"
                  src={this.state.targetImg}
                  style={{ height: "60%", width: "90%" }}
                  // Cropper.js options
                  aspectRatio={1}
                  guides={false}
                  crop={this._crop}
                />
              ) : null}
              {showCrop ? (
                <button
                  value="Submit"
                  onClick={this.updateProfileImage}
                  className="profilePage__button"
                >
                  save
                </button>
              ) : null}
            </Fragment>
          )}
        </div>
      </div>
    );
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleConfirm = value => {
    if (value === this.state.new_pass) {
      this.setState({ isvalid: true });
    } else {
      this.setState({ isvalid: false });
    }
  };

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

  _crop = () => {
    this.setState({
      croppedImg: this.refs.cropper.getCroppedCanvas().toDataURL()
    });
  };

  handleFile = e => {
    this.setState({ targetImg: e[0].base64, showCrop: true });
  };

  updateProfileImage = () => {
    const { croppedImg } = this.state;
    const params = {
      props: this.props,
      body: {
        base64: croppedImg
      }
    };
    this.props.dispatch(AuthAction.updateProfileImage(params)).then(() => {
      this.setState({ showCrop: false });
    });
  };

  onClickChangePassword = () => {
    const params = {
      props: this.props,
      body: {
        old_pass: this.state.old_pass,
        new_pass: this.state.new_pass
      }
    };
    this.props.dispatch(AuthAction.postChangePassword(params)).then(result => {
      console.log("result:");
      console.log(result);
      if (result.message === "password_is_wrong") {
        alert("password is wrong");
      } else {
        alert("updated password successfully");
        this.props.history.push({
          pathname: `/@${this.props.user.id}`
        });
      }
    });
  };
}

ProfilePage.defaultProps = defaultProps;
ProfilePage.propTypes = propTypes;

export default connect(mapStateToProps)(ProfilePage);
