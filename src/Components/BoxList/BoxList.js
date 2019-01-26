// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";

const defaultProps = {};
const propTypes = {};

class BoxList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="boxList">
        {this.props.list.map((list, index) => {
          return (
            <div key={index} className="boxList__content">
              <div className="boxList__content__text">
                <span className="boxList__content__text__icon">
                  <i className="xi-pen-o" />
                </span>
                <span className="boxList__content_text__list">
                  {list.content}
                </span>
              </div>
              <div className="boxList__content__date">
                <span>{list.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

BoxList.defaultProps = defaultProps;
BoxList.propTypes = propTypes;

export default BoxList;
