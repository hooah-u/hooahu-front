// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";

const defaultProps = {};
const propTypes = {};

class Thumb extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      size,
      src,
      fontSize,
      onClick,
      isTag,
      marginRight,
      marginTop
    } = this.props;
    if (src === null || (src === undefined && isTag === undefined)) {
      return (
        <span
          onClick={onClick}
          className="thumb__default"
          style={{
            width: size,
            height: size,
            fontSize: fontSize && fontSize,
            marginRight: marginRight,
            marginTop: marginTop
          }}
        >
          <i className="xi-user-o" />
        </span>
      );
    } else if (isTag && src === undefined) {
      return (
        <span
          onClick={onClick}
          className="thumb__default"
          style={{
            width: size,
            height: size,
            marginRight: marginRight,
            marginTop: marginTop
          }}
        >
          <p>#</p>
        </span>
      );
    } else {
      return (
        <span
          onClick={onClick}
          className="thumb"
          style={{
            width: size,
            height: size,
            marginRight: marginRight,
            marginTop: marginTop
          }}
        >
          <img
            className="thumb__image"
            width={size}
            height={size}
            src={src}
            alt="profile"
          />
        </span>
      );
    }
  }
}

Thumb.defaultProps = defaultProps;
Thumb.propTypes = propTypes;

export default Thumb;
