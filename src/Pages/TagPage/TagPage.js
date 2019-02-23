// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";

import { connect } from "react-redux";
import * as FeedAction from "../../ActionCreators/FeedAction";

import { NavBar, Post, Thumb, SocialInput, Comment } from "../../Components";
import ec from "../../Json/ec";
import nprogress from "nprogress";
import ContentLoader from "react-content-loader";
import ProgressiveImage from "react-progressive-image";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import Lightbox from "react-image-lightbox";
import StackGrid from "react-stack-grid";

const defaultProps = {};
const propTypes = {};

const MyLoader = props => (
  <div className="userPage__notice__content-loader">
    <ContentLoader
      height={330}
      width={400}
      speed={2}
      primaryColor="#a8a8a8"
      secondaryColor="#ecebeb"
      {...props}
    >
      <rect x="110" y="200" rx="3" ry="3" width="190" height="10" />
      <rect x="110" y="270" rx="3" ry="3" width="190" height="15" />
      <rect x="45" y="310" rx="3" ry="3" width="300" height="10" />
      <circle cx="200" cy="80" r="80" />
    </ContentLoader>
  </div>
);

const mapStateToProps = state => {
  return {
    isLogin: state.reducer.isLogin,
    user: state.reducer.user,
    token: state.reducer.token
  };
};

const styles = {
  customWidth: {
    width: 200,
    margin: 0,
    padding: 0
  },
  image: {
    height: 130,
    cursor: "pointer"
  },
  noMargin: {
    margin: 0
  }
};

class TagPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      index: 0,
      selectedEC: [],
      selectedFeed: 0,
      selectedPost: 0,
      showModal: false,
      dropdownOpen: false,
      tagLoading: true,
      selectedPostIndex: 0,
      selectedComment: [],
      isPosting: false,
      comment: "",
      feeds: [],
      tagUser: [],
      tagImage: [],
      lightboxIsOpen: false,
      photoIndex: 0
    };
  }

  componentWillMount() {
    nprogress.start();
    const randomPackage = Math.floor(Math.random() * 26);
    const selectedEC = ec.editorChoice[randomPackage];
    this.setState({ selectedEC });
    this.getAllFeeds();
    this.getTagRank();
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      previousProps.match.params.tag_name !== this.props.match.params.tag_name
    ) {
      this.getAllFeeds();
      this.getTagRank();
    }
  }

  componentDidMount() {
    nprogress.done();
  }

  render() {
    const { isLogin, user, match } = this.props;
    const {
      selectedEC,
      feeds,
      tagLoading,
      showModal,
      isPosting,
      selectedComment,
      comment,
      tagUser,
      tagImage,
      lightboxIsOpen,
      photoIndex
    } = this.state;
    return (
      <div className="tagPage">
        {!lightboxIsOpen ? (
          <NavBar listClassName="tagPage__tabBar__list" />
        ) : null}
        <Modal
          isOpen={showModal}
          toggle={this.toggleModal}
          wrapClassName="hooahu__modal"
          size="lg"
          modalTransition={{ timeout: 20 }}
          backdropTransition={{ timeout: 10 }}
          centered={true}
        >
          <ModalBody>
            <div className="editorDetail__modal">
              <div className="editorDetail__modal__comment">
                <Comment isFeed comment={selectedComment} />
              </div>
              <SocialInput
                className="editorDetail__modal__input"
                user={user}
                value={comment}
                isLogin={isLogin}
                isPosting={isPosting}
                onChange={this.handleInput}
                placeholder="Leave a comment"
                onClick={this.handlePostComment}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <span
              onClick={this.toggleModal}
              className="editorDetail__modal__close"
            >
              <i className="xi-close" />
            </span>
          </ModalFooter>
        </Modal>
        <div className="tagPage__notice">
          {tagLoading ? (
            <MyLoader />
          ) : (
            <div className="tagPage__notice__content">
              <div className="tagPage__notice__content__wrapper">
                <Thumb isTag size={100} fontSize={60} />
                <p className="tagPage__notice__content__wrapper__tagName">{`#${
                  match.params.tag_name
                }`}</p>
                <p className="tagPage__notice__content__wrapper__tagCount">
                  <span className="tagPage__notice__content__wrapper__tagCount-number">
                    {feeds.length}
                  </span>{" "}
                  Posts
                </p>
              </div>
              <div className="tagPage__notice__content__tagUser">
                <p>People mentioned</p>
                <div className="tagPage__notice__content__tagUser__thumbArea">
                  {tagUser.slice(0, 5).map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="tagPage__notice__content__tagUser__thumbArea-item"
                      >
                        <Thumb
                          src={data.profile_img}
                          size={40}
                          fontSize={30}
                          marginTop={8}
                          onClick={() => this.handleUser(data.id)}
                        />
                        <p>
                          {data.nickname.length > 7
                            ? data.nickname.substring(0, 7) + "..."
                            : data.nickname}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <button
                type="button"
                onClick={() => this.setState({ lightboxIsOpen: true })}
              >
                Open Lightbox
              </button> */}
              {tagImage.length === 0 ? null : (
                <div className="tagPage__notice__content__gallery">
                  <p style={{ marginBottom: 10 }}>Images</p>
                  <StackGrid
                    columnWidth={79}
                    monitorImagesLoaded={true}
                    // style={{ width: "100%" }}
                    gutter={5}
                  >
                    {tagImage.map((data, index) => {
                      return (
                        <div key={index}>
                          <img
                            alt={index}
                            src={data}
                            onClick={() => this.handleGallery(index)}
                            className="tagPage__notice__content__gallery__image"
                          />
                        </div>
                      );
                    })}
                  </StackGrid>
                </div>
              )}

              {lightboxIsOpen && (
                <Lightbox
                  mainSrc={tagImage[photoIndex]}
                  nextSrc={tagImage[(photoIndex + 1) % tagImage.length]}
                  prevSrc={
                    tagImage[
                      (photoIndex + tagImage.length - 1) % tagImage.length
                    ]
                  }
                  onCloseRequest={() =>
                    this.setState({ lightboxIsOpen: false })
                  }
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex:
                        (photoIndex + tagImage.length - 1) % tagImage.length
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % tagImage.length
                    })
                  }
                />
              )}
            </div>
          )}
        </div>

        <div className="tagPage__feed">
          <div className="tagPage__feed__content">
            {/* <div className="tagPage__feed__content-mobile">
              <Thumb isTag size={40} fontSize={60} />
            </div> */}
            {feeds &&
              feeds.map((data, index) => {
                return (
                  <Post
                    isTag
                    feed={data}
                    user={user}
                    key={index}
                    index={index}
                    onClickTag={this.handleTag}
                    onClickThumb={this.handleUser}
                    onClickUser={this.handleUser}
                    onClickComment={this.handleComment}
                    onClickCommentUser={this.handleUser}
                    onClickLike={id => this.handleLike(id, index)}
                    onClickDisLike={id => this.handleDisLike(id, index)}
                  />
                );
              })}
          </div>
        </div>
        <div className="tagPage__filter">
          <div className="tagPage__filter__wrapper">
            <div className="tagPage__filter__content">
              <div className="tagPage__filter__content__editor">
                <p className="tagPage__filter__content__editor__label">
                  See what experience you can have
                </p>
                <ProgressiveImage
                  src={selectedEC.image_url[0]}
                  placeholder={selectedEC.image_url[0]}
                >
                  {src => (
                    <img
                      src={src}
                      onClick={() => this.handleEditor(selectedEC.id)}
                      alt={selectedEC.id}
                      style={styles.image}
                    />
                  )}
                </ProgressiveImage>
                <p
                  onClick={() => this.handleEditor(selectedEC.id)}
                  className="tagPage__filter__content__editor__title"
                >
                  {selectedEC.name}
                </p>
                <div>
                  <span className="tagPage__filter__content__editor__detail">
                    {selectedEC.area + " / " + selectedEC.days}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getAllFeeds = () => {
    const { match, dispatch, token } = this.props;
    const tag_name = match.params.tag_name;
    const params = { tag_name, token, index: 0, props: this.props, all: 1 };
    dispatch(FeedAction.getFeedsByTagName(params)).then(feeds => {
      dispatch(FeedAction.getImageByTagName(params)).then(tagImage => {
        const newFeeds = feeds.result.slice();
        const newTagImage = [];
        for (let i = 0; i < newFeeds.length; i++) {
          if (newFeeds[i].isLiked) {
            newFeeds[i].isLiked = true;
          }
          newFeeds[i].images = feeds.result[i].images.map(data => {
            return { original: data.img_url };
          });
        }
        tagImage.result.map((data, index) => {
          return newTagImage.push(data.img_url);
        });
        this.setState(() => ({
          feeds: newFeeds,
          tagLoading: false,
          tagImage: newTagImage
        }));
        nprogress.done();
      });
    });
  };

  getTagRank = () => {
    const { dispatch, token, match } = this.props;
    const tag_name = match.params.tag_name;
    const params = { token, tag_name };
    dispatch(FeedAction.getTagUser(params)).then(tagUser => {
      this.setState(() => ({ tagUser }));
    });
  };

  handleLike = (id, index) => {
    const { dispatch, token } = this.props;
    const { feeds } = this.state;
    const params = { token, post_id: id };
    const newFeeds = feeds.slice();
    newFeeds[index].isLiked = true;
    newFeeds[index].like_cnt += 1;
    this.setState(() => ({ feeds: newFeeds }));
    dispatch(FeedAction.postLike(params));
  };

  toggleModal = () => {
    this.setState(() => ({
      showModal: !this.state.showModal
    }));
  };

  closeLightbox = () => {
    this.setState(() => ({ lightboxIsOpen: false }));
  };

  handleDisLike = (id, index) => {
    const { dispatch, token } = this.props;
    const params = { token, post_id: id };
    const { feeds } = this.state;
    const newFeeds = feeds.slice();
    newFeeds[index].isLiked = false;
    newFeeds[index].like_cnt -= 1;
    this.setState(() => ({ feeds: newFeeds }));
    dispatch(FeedAction.disLike(params));
  };

  handleComment = (id, comments) => {
    this.setState(() => ({
      selectedPostIndex: id,
      selectedComment: comments
      // showModal: true
    }));
    this.toggleModal();
  };

  handleUser = user_id => {
    const { history } = this.props;
    history.push({
      pathname: "/@" + user_id
    });
  };

  handleEditor = id => {
    this.props.history.push({
      pathname: "/editor_choice/" + id
    });
  };

  handleInput = e => {
    this.setState({ comment: e.target.value });
  };

  handlePostComment = () => {
    const { dispatch, token, user } = this.props;
    const { comment, selectedPostIndex, selectedComment, feeds } = this.state;
    const newFeed = feeds.slice();
    newFeed.map(data => {
      if (data.id === selectedPostIndex) {
        data.comments.push({
          content: comment,
          post_id: selectedPostIndex,
          id: selectedComment.length,
          nickname: user.nickname,
          created_at: new Date()
        });
      }
      return null;
    });

    const params = { post_id: selectedPostIndex, content: comment, token };
    this.setState(() => ({ isPosting: true, feeds: newFeed }));
    dispatch(FeedAction.postComment(params)).then(() => {
      this.setState(() => ({ isPosting: false, comment: "" }));
    });
  };

  handleTag = name => {
    name = name.substring(1);
    const { history } = this.props;
    history.push({
      pathname: "/tag/" + name
    });
  };

  handleGallery = index => {
    this.setState(() => ({ photoIndex: index, lightboxIsOpen: true }));
  };
}

TagPage.defaultProps = defaultProps;
TagPage.propTypes = propTypes;

export default connect(mapStateToProps)(TagPage);
