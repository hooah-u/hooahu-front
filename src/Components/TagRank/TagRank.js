// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";

const defaultProps = {};
const propTypes = {};

class DefaultComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tag, index, onClick } = this.props;
    return (
      <div className="tagRank" onClick={() => onClick(tag.title)}>
        <div className="tagRank__number">
          <div className="tagRank__number-wrapper">{index + 1}</div>
        </div>
        <div className="tagRank__content">
          <p className="tagRank__content-title">
            {tag.title.length > 15
              ? tag.title.substring(0, 15) + "..."
              : tag.title}
          </p>
        </div>
        <div className="tagRank__next">
          <p className="tagRank__content-count">
            <strong>{tag.counted_value}</strong>
            posts
          </p>
        </div>
      </div>
    );
  }
}

DefaultComponent.defaultProps = defaultProps;
DefaultComponent.propTypes = propTypes;

export default DefaultComponent;
