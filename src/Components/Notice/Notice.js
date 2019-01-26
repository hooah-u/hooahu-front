// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";

const defaultProps = {};
const propTypes = {};

class DefaultComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="notice">
        <div className="notice__content__wrapper__list">
          <div className="notice__content__wrapper__list__bar" />
          <div className="notice__content__wrapper__list__content">
            <p>
              <span className="notice__content__wrapper__notice-name">
                Hyun Jong Shin
              </span>and 3 more people liked your post
            </p>
          </div>
        </div>
      </div>
    );
  }
}

DefaultComponent.defaultProps = defaultProps;
DefaultComponent.propTypes = propTypes;

export default DefaultComponent;
