// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import filterJson from "../../Json/filter";
import Textarea from "react-textarea-autosize";
import Badge from "material-ui/Badge";
import { Thumb } from "../";
import { Bounce } from "react-activity";
import TagsInput from "react-tagsinput";
import FileInputComponent from "react-file-input-previews-base64";
import cx from "classnames";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const defaultProps = {};
const propTypes = {};

class SocialInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreview: [],
      dropdownOpen: false,
      selectedPostType: "Walkie Takie"
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handlePostType = type => {
    this.setState({ selectedPostType: type });
  };

  handlePreview = file_arr => {
    let imagePreview = this.state.imagePreview.slice();
    for (let i = 0; i < file_arr.length; i++) {
      imagePreview.push(file_arr[i].base64);
    }
    this.setState({ imagePreview });
  };

  handleBadge = value => {
    let imagePreview = this.state.imagePreview.slice();
    imagePreview.splice(imagePreview.indexOf(value), 1);
    this.setState({ imagePreview });
  };

  render() {
    const postType = filterJson.post_type;
    const {
      user,
      isLogin,
      showCamera,
      showType,
      showTag,
      onChange,
      placeholder,
      handleBase,
      handleType,
      selectedPostType,
      imagePreview,
      handleDelete,
      onClick,
      value,
      className,
      isPosting,
      tagsValue,
      renderInput,
      onChangeTags,
      onChangeTagInput
    } = this.props;
    return (
      <div className={cx("socialInput", className)}>
        <div className="socialInput__body">
          <div className="socialInput__body__thumbArea">
            <Thumb size={50} src={user && user.profile_img} />
          </div>
          <Textarea
            maxRows={4}
            value={value}
            onChange={e => onChange(e)}
            placeholder={isLogin === true ? placeholder : "Sign in to post!"}
            className="socialInput__body__input"
          />
        </div>
        {/* <hr className="homePage__noMargin" /> */}
        <div>
          {showTag ? (
            <TagsInput
              addKeys={[9, 13, 32]}
              value={tagsValue}
              inputProps={{
                placeholder: "Add Tags ex) #557MPCO"
              }}
              onChange={onChangeTags}
              renderInput={renderInput}
              onChangeInput={onChangeTagInput}
            />
          ) : null}
        </div>

        <hr className="homePage__noMargin" />
        <div className="socialInput__footer">
          {showCamera === true ? (
            <div className="socialInput__footer__camera">
              <FileInputComponent
                parentStyle={{ margin: 0 }}
                labelStyle={{ display: "none", margin: 0 }}
                imagePreview={false}
                buttonComponent={
                  <span className="socialInput__footer__camera__icon">
                    <i className="xi-camera" />
                  </span>
                }
                multiple={true}
                callbackFunction={handleBase}
                accept="image/*"
              />
            </div>
          ) : null}

          <div className="socialInput__footer__postArea">
            {showType === true ? (
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                style={{ marginRight: 10 }}
                toggle={this.toggle}
                size="sm"
                direction="down"
              >
                <DropdownToggle caret>{selectedPostType}</DropdownToggle>
                <DropdownMenu>
                  {postType.map((data, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => handleType(index, data)}
                      >
                        {data}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </ButtonDropdown>
            ) : null}
            <span
              onClick={onClick}
              className="socialInput__footer__postArea__postButton"
            >
              {isPosting ? <Bounce size={20} color="white" /> : "post"}
            </span>
          </div>
        </div>
        <div className="socialInput__footer__imagePreview">
          {imagePreview && imagePreview.length === 0
            ? null
            : imagePreview &&
              imagePreview.map((data, index) => {
                return (
                  <Badge
                    key={index}
                    badgeContent={
                      <i className="xi-minus-min" style={{ fontSize: 20 }} />
                    }
                    primary={true}
                    badgeStyle={{ top: 12, right: 12, cursor: "pointer" }}
                    onClick={() => handleDelete(data)}
                  >
                    <img
                      alt={data + index}
                      className="socialInput__footer__imagePreview__image"
                      src={data}
                    />
                  </Badge>
                );
              })}
        </div>
      </div>
    );
  }
}

SocialInput.defaultProps = defaultProps;
SocialInput.propTypes = propTypes;

export default SocialInput;
