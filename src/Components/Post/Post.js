// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import cx from "classnames";
import moment from "moment";
import NumericLabel from "react-pretty-numbers";
import { Thumb, Comment } from "../";
import ImageGallery from "react-image-gallery";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const defaultProps = {};
const propTypes = {};
const styles = {
  noMargin: {
    margin: 0
  }
};

let option = {
  title: true,
  shortFormat: true,
  shortFormatMinValue: 10000,
  shortFormatPrecision: 1
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  };

  render() {
    const {
      user,
      feed,
      index,
      isTag,
      onClickComment,
      onClickLike,
      onClickDisLike,
      onClickUser,
      onClickTag,
      onClickThumb,
      onClickCommentUser,
      onClickDelete
    } = this.props;

    return (
      <div className="post">
        <div className="post__header">
          <div className="post__header__userInfo">
            <div className="post__header__userInfo__thumb">
              <Thumb
                onClick={() => onClickThumb(feed.user_id)}
                size={50}
                src={
                  isTag
                    ? feed && feed.user[0].profile_img
                    : feed && feed.profile_img
                }
              />
            </div>
            <div className="post__header__userInfo__nameArea">
              <p className="post__header__userInfo__nameArea__name">
                <strong
                  onClick={() => onClickUser(feed.user_id)}
                  className="homePage__strong"
                >
                  {isTag
                    ? feed && feed.user[0].nickname
                    : feed && feed.nickname}
                </strong>
                {"in " + this.handlePostType(feed.post_type)}
              </p>
              <p className="post__header__userInfo__nameArea__time">
                {feed && moment(feed.created_at).fromNow()}
              </p>
            </div>
          </div>
          {user.id === feed.user_id ? (
            <div className="post__header__option">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle tag="span">
                  <span className="post__header__option__icon">
                    <i className="xi-ellipsis-h" />
                  </span>
                </DropdownToggle>
                <DropdownMenu onClick={() => onClickDelete(feed.id)}>
                  <DropdownItem>delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : null}
        </div>
        <div className="post__body">
          <div className="post__body__image">
            {(feed && feed.images === null) ||
            (feed && feed.images === undefined) ||
            (feed && feed.images.length === 0) ? null : (
              <ImageGallery
                items={feed.images && feed.images}
                showThumbnails={false}
                showPlayButton={false}
                showBullets={true}
              />
            )}
          </div>

          <p className="post__body__text">{feed && feed.content}</p>
          <div className="post__body__tags">
            {feed.tags &&
              feed.tags.map((data, index) => {
                return (
                  <span
                    onClick={() => onClickTag(data.title)}
                    key={index}
                    className="post__body__tags__tag"
                  >
                    {/* <i className="xi-tag" />
                  MP */}
                    {data.title}
                  </span>
                );
              })}
          </div>
        </div>
        <hr style={styles.noMargin} />
        <div className="post__footer">
          <div className="post__footer__wrapper">
            <div className="post__footer__wrapper__likeArea">
              <div
                className={cx("post__footer__wrapper__likeArea__count", {
                  "post__footer__wrapper__likeArea__count-liked": feed.isLiked
                })}
              >
                <NumericLabel params={option}>
                  {feed && feed.like_cnt}
                </NumericLabel>
              </div>
              {feed.isLiked ? (
                <span
                  className="post__footer__wrapper__likeArea__icon-liked"
                  onClick={() => onClickDisLike(feed.id)}
                >
                  <i className="xi-heart" />
                </span>
              ) : (
                <span
                  className="post__footer__wrapper__likeArea__icon"
                  onClick={() => onClickLike(feed.id)}
                >
                  <i className="xi-heart-o" />
                </span>
              )}
            </div>
            <div className="post__footer__wrapper__commentArea">
              <div className="post__footer__wrapper__commentArea__count">
                {feed.comments && feed.comments.length}
              </div>
              <span
                className="post__footer__wrapper__commentArea__icon"
                onClick={() => onClickComment(feed.id, feed.comments)}
              >
                <i className="xi-speech-o" />
              </span>
            </div>
          </div>
        </div>
        <hr style={styles.noMargin} />
        <div className="post__footer__wrapper__commentList">
          <Comment
            isFeed
            onClick={onClickCommentUser}
            comment={
              feed.comments && feed.comments.length > 3
                ? feed.comments.slice(
                    feed.comments.length - 3,
                    feed.comments.length
                  )
                : feed.comments
            }
          />
        </div>
      </div>
    );
  }

  handlePostType = postType => {
    if (postType === 1) {
      return "Walkie Takie";
    } else if (postType === 2) {
      return "Question";
    } else if (postType === 3) {
      return "Selling/Giving Away";
    } else if (postType === 4) {
      return "HangOut";
    } else if (postType === 5) {
      return "Area1";
    } else if (postType === 6) {
      return "Area2";
    } else if (postType === 7) {
      return "Area3";
    } else if (postType === 8) {
      return "Area4";
    } else if (postType === 9) {
      return "KATUSA";
    } else if (postType === 10) {
      return "Ville Channel";
    } else {
      return "Walkie Takie";
    }
  };
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
