// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import { Button } from "reactstrap";

import cx from "classnames";

const defaultProps = {};
const propTypes = {};

class RoundButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { text, textClassName, className, onClick, disabled } = this.props;
    return (
      <div className="roundButton">
        <Button
          onClick={onClick}
          className={cx("roundButton__content", className)}
          disabled={disabled}
        >
          <div className="roundButton__content__wrapper">
            <div className="roundButton__content__wrapper__textArea">
              <span
                className={
                  (cx("roundButton__content__wrapper__textArea__text"),
                  textClassName)
                }
              >
                {text}
              </span>
            </div>
          </div>
        </Button>
      </div>
    );
  }
}

RoundButton.defaultProps = defaultProps;
RoundButton.propTypes = propTypes;

export default RoundButton;
