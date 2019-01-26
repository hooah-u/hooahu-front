// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import moment from "moment";
import FlipMove from "react-flip-move";

const defaultProps = {};
const propTypes = {};

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isFeed, comment, onClick } = this.props;
    return (
      <div className="comment">
        <FlipMove enterAnimation="fade" leaveAnimation="fade">
          {comment &&
            comment.map((data, index) => {
              return (
                <div key={index} className="comment__wrapper">
                  <div className="comment-content">
                    <strong
                      onClick={() => onClick(data.user_id)}
                      className="comment-name"
                    >
                      {data.nickname}
                    </strong>
                    {isFeed ? data.content : data.comment}
                  </div>
                  <p className="comment-date">
                    {moment(data.created_at).fromNow()}
                  </p>
                </div>
              );
            })}
        </FlipMove>
      </div>
    );
  }
}

Comment.defaultProps = defaultProps;
Comment.propTypes = propTypes;

export default Comment;
