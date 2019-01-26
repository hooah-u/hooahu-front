// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
const defaultProps = {};
const propTypes = {};

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const tabBar = [
      "GUIDE",
      "EDITOR'S CHOICE",
      "PLACE LIST",
      "COMMUNITY",
      "FORUM",
      "ABOUT US",
      "SUPPORT"
    ];
    const { className, listClassName } = this.props;
    return (
      <nav className={cx("tabBar", className)}>
        <ul className="tabBar__items">
          {tabBar.map((data, index) => {
            return (
              <li
                key={index}
                className={cx("tabBar__items__item", listClassName)}
              >
                {data}
              </li>
            );
          })}
        </ul>
        <div className="tabBar__user">
          <Link to="/signup">
            <div className={cx("tabBar__user__signIn", listClassName)}>
              SIGN IN
            </div>
          </Link>
          <span className={cx("tabBar__user__icon", listClassName)}>
            <i className="xi-user-o" />
          </span>
        </div>
      </nav>
    );
  }
}

TabBar.defaultProps = defaultProps;
TabBar.propTypes = propTypes;

export default TabBar;
