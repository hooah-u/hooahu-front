// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";

import { connect } from "react-redux";

import { NavBar, Post, SocialInput, Comment, TagRank } from "../../Components";
import { LandingPage } from "../../Pages";
import ec from "../../Json/ec";
import nprogress from "nprogress";
import filterJson from "../../Json/filter";
import cx from "classnames";
import ProgressiveImage from "react-progressive-image";
import ContentLoader from "react-content-loader";
import * as FeedAction from "../../ActionCreators/FeedAction";
import * as AuthAction from "../../ActionCreators/AuthAction";
import * as UserAction from "../../ActionCreators/UserAction";
import { Bounce } from "react-activity";
import { Modal, ModalBody, ModalFooter, Collapse } from "reactstrap";
import _ from "lodash";
import BottomScrollListener from "react-bottom-scroll-listener";
import Autosuggest from "react-autosuggest";

// import list from "../../Json/HotTopic.json";
const defaultProps = {};
const propTypes = {};

const renderSuggestion = (suggestion, { query, isHighlighted }) => (
  <div className="homePage__suggestion">
    <p className="homePage__suggestion-title">{suggestion.title}</p>
    <span className="homePage__suggestion-count">{suggestion.C + "posts"}</span>
  </div>
);

const FeedLoader = props => (
  <div className="homePage__feed__content-loading">
    <ContentLoader
      height={160}
      width={400}
      speed={2}
      primaryColor="#a8a8a8"
      secondaryColor="#ecebeb"
      {...props}
    >
      <rect x="69" y="33" rx="3" ry="3" width="117" height="5" />
      <rect x="69" y="51" rx="3" ry="3" width="85" height="5" />
      <rect x="15.02" y="81.63" rx="3" ry="3" width="320" height="5" />
      <rect x="15" y="98" rx="3" ry="3" width="350" height="5" />
      <rect x="15" y="116" rx="3" ry="3" width="201" height="5" />
      <circle cx="39.2" cy="45.2" r="16" />
    </ContentLoader>
  </div>
);

const TagRankLoader = props => (
  <ContentLoader
    height={160}
    width={400}
    speed={2}
    primaryColor="#d1d1d1"
    secondaryColor="#ecebeb"
    {...props}
  >
    <circle cx="10" cy="20" r="8" />
    <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
    <circle cx="10" cy="50" r="8" />
    <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
    <circle cx="10" cy="80" r="8" />
    <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
    <circle cx="10" cy="110" r="8" />
    <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
  </ContentLoader>
);

const mapStateToProps = state => {
  return {
    isLogin: state.reducer.isLogin,
    user: state.reducer.user,
    token: state.reducer.token,
    feeds: state.reducer.feeds
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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isValid: true,
      isEmpty: true,
      height: window.innerHeight,
      message: "not at bottom",
      isPosting: false,
      expandNotice: false,
      selectedFeed: 0,
      selectedPost: 0, //우측 포스트 타입 필터링 인덱스
      feeds: [],
      index: 0,
      feedText: "",
      feedLoading: true,
      footerLoading: true,
      selectedEC: [],
      dropdownOpen: false,
      selectedPostTypeIndex: 1, //중앙 인풋 포스트 타입 인덱스
      selectedPostType: "Walkie Talkie",
      selectedPostIndex: 0,
      showModal: false,
      imagePreview: [],
      selectedComment: [],
      comment: "",
      collapse: false,
      tags: [],
      tagRank: [],
      tagRankLoading: true,
      suggestion: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentWillMount() {
    nprogress.start();
    const randomPackage = Math.floor(Math.random() * 26);
    const selectedEC = ec.editorChoice[randomPackage];
    const { isLogin } = this.props;
    if (isLogin) {
      this.setState({ selectedEC, feedLoading: true });
      this.getAllFeed(0, 1);
    } else {
      this.setState({ selectedEC });
      nprogress.done();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLogin && !this.props.isLogin) {
      nprogress.done();
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = (value && value.trim().toLowerCase()) || "";
    // const inputLength = inputValue.length;
    const { dispatch } = this.props;
    let finalValue = inputValue.replace(/\#/g, "");
    const params = { props: this.props, tag_name: finalValue };

    dispatch(FeedAction.searchTag(params)).then(suggestion => {
      // let suggestion = tags.result.filter(state => {
      //   return state.title.toLowerCase().slice(0, inputLength) === inputValue;
      // });

      this.setState(state => ({ suggestion: suggestion.result }));
    });
  };

  onClickDelete = feed_id => {
    const params = { props: this.props, id: feed_id };
    this.props.dispatch(FeedAction.deleteFeed(params)).then(() => {
      this.getAllFeed(0, 1);
    });
  };

  autocompleteRenderInput = ({ addTag, ...props }) => {
    const { suggestion } = this.state;
    const handleOnChange = (e, { newValue, method }) => {
      if (method === "enter") {
        e.preventDefault();
      } else {
        props.onChange(e);
      }
    };

    return (
      <Autosuggest
        ref={props.ref}
        suggestions={suggestion}
        shouldRenderSuggestions={value => value && value.trim().length > 0}
        getSuggestionValue={suggestion => suggestion.title}
        renderSuggestion={renderSuggestion}
        inputProps={{ ...props, onChange: handleOnChange }}
        onSuggestionSelected={(e, { suggestion }) => {
          addTag(suggestion.title);
        }}
        onSuggestionsClearRequested={() => {}}
        highlightFirstSuggestion
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      />
    );
  };

  render() {
    const feedType = filterJson.feed_type;
    const postType = filterJson.post_type_filter;
    const {
      selectedFeed,
      selectedPost,
      selectedPostType,
      selectedEC,
      selectedComment,
      showModal,
      imagePreview,
      feeds,
      feedLoading,
      footerLoading,
      comment,
      collapse,
      isPosting,
      tags,
      tagRank,
      tagRankLoading
    } = this.state;
    const { isLogin, user } = this.props;

    if (isLogin) {
      return (
        <div className="homePage">
          <NavBar isActive="feed" listClassName="homePage__tabBar__list" />
          <BottomScrollListener onBottom={this.handleScroll} offset={150} />
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
                  <Comment
                    isFeed
                    comment={selectedComment}
                    onClick={this.handleUser}
                  />
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
          <div className="homePage__notice">
            <div className="homePage__notice__content">
              <div className="homePage__notice__content__wrapper">
                <p>Welcome to Hooah!U </p>
                <p>
                  <strong>{user && user.full_name}</strong>{" "}
                </p>
              </div>
              <div className="homePage__notice__content__tags">
                <p className="homePage__notice__content__tags-title">
                  Are you tracking these?
                </p>
                {tagRankLoading ? (
                  <div style={{ paddingLeft: 10, paddingTop: 10 }}>
                    <TagRankLoader />
                  </div>
                ) : (
                  tagRank &&
                  tagRank.slice(0, 5).map((data, index) => {
                    return (
                      <TagRank
                        key={index}
                        onClick={this.handleTag}
                        index={index}
                        tag={data}
                      />
                    );
                  })
                )}
                {!collapse ? (
                  <div className="homePage__notice__content__tags__more">
                    <p
                      className="homePage__notice__content__tags__more-text"
                      onClick={this.toggleTag}
                    >
                      {tagRank.length > 5 ? `+${tagRank.length - 5}more` : null}
                    </p>
                  </div>
                ) : null}
                <Collapse isOpen={collapse}>
                  {tagRank &&
                    tagRank.slice(5, tagRank.length).map((data, index) => {
                      return (
                        <TagRank
                          key={index + 5}
                          onClick={this.handleTag}
                          index={index + 5}
                          tag={data}
                        />
                      );
                    })}
                </Collapse>
                {collapse ? (
                  <div className="homePage__notice__content__tags__more">
                    <p
                      className="homePage__notice__content__tags__more-text"
                      onClick={this.toggleTag}
                    >
                      close
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="homePage__feed">
            <div className="homePage__feed__content">
              <SocialInput
                placeholder="What's in your mind????"
                user={user}
                isLogin={isLogin}
                showType
                showCamera
                showTag
                handleBase={this.handlePreview}
                handleType={this.handlePostType}
                handleDelete={this.handleBadge}
                imagePreview={imagePreview}
                selectedPostType={selectedPostType}
                onChange={this.handleText}
                tagsValue={tags}
                onChangeTags={this.handleTags}
                onChangeTagInput={tag => this.setState({ tag })}
                onClick={this.handlePostFeed}
                value={this.state.feedText}
                renderInput={this.autocompleteRenderInput}
              />

              {feedLoading ? (
                <div>
                  <FeedLoader />
                  <FeedLoader />
                </div>
              ) : isPosting ? (
                <div className="homePage__feed__content-isPosting">
                  <Bounce size={35} color="#fdd835" />
                </div>
              ) : (
                feeds &&
                feeds.map((data, index) => {
                  return (
                    <Post
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
                      onClickDelete={this.onClickDelete}
                    />
                  );
                })
              )}
              {feeds.length === 0 && !feedLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10%"
                  }}
                >
                  There are no posts yet.
                </div>
              ) : null}
              {footerLoading ? (
                <div className="homePage__feed__content-footerLoading">
                  <Bounce size={35} color="#fdd835" />
                </div>
              ) : null}
            </div>
          </div>
          <div className="homePage__filter">
            <div className="homePage__filter__wrapper">
              <div className="homePage__filter__content">
                <div className="homePage__filter__content__label">
                  <p className="homePage__filter__content__label__text">
                    Feed Types
                  </p>
                </div>
                <div className="homePage__filter__content__items">
                  {feedType.map((data, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => this.handleFeed(index)}
                        className={cx(
                          "homePage__filter__content__items__item",
                          {
                            "homePage__filter__content__items__item-clicked":
                              selectedFeed === index
                          }
                        )}
                      >
                        {data}
                      </div>
                    );
                  })}
                </div>
                <div className="homePage__filter__content__label">
                  <p className="homePage__filter__content__label__text">
                    Post Types
                  </p>
                </div>
                <div className="homePage__filter__content__items">
                  {postType.map((data, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => this.handlePost(index)}
                        className={cx(
                          "homePage__filter__content__items__item",
                          {
                            "homePage__filter__content__items__item-clicked":
                              selectedPost === index
                          }
                        )}
                      >
                        {data}
                      </div>
                    );
                  })}
                </div>
                <hr />
                <div className="homePage__filter__content__editor">
                  <p className="homePage__filter__content__editor__label">
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
                    className="homePage__filter__content__editor__title"
                  >
                    {selectedEC.name}
                  </p>
                  <div>
                    <span className="homePage__filter__content__editor__detail">
                      {selectedEC.area + " / " + selectedEC.days}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <LandingPage
          onChangeEmail={this.handleEmail}
          onChangePassword={this.handlePassword}
          onClickSign={this.handleSignIn}
          onClickFacebook={this.handleFacebookSignIn}
          isValid={this.state.isValid}
          isEmpty={this.state.isEmpty}
        />
      );
    }
  }

  handleScroll = () => {
    const { dispatch } = this.props;
    const { selectedPost, index, footerLoading } = this.state;

    if (footerLoading) {
      if (selectedPost === 0) {
        this.getAllFeed(index, 2);
      } else {
        const params = {
          type: selectedPost,
          props: this.props,
          index
        };
        dispatch(FeedAction.getFeed(params)).then(value => {
          const newFeeds = value.result.slice();
          for (let i = 0; i < newFeeds.length; i++) {
            newFeeds[i].images = value.result[i].images.map((data, index) => {
              return { original: data.img_url };
            });
          }
          this.setState(state => ({
            index: value.nextIndex,
            feeds: [...state.feeds, ...newFeeds],
            isPosting: false,
            footerLoading: value.result.length < 20 ? false : true
          }));
        });
      }
    }
  };

  getAllFeed = (count, typeIndex) => {
    /**
     * typeIndex
     * 0: 포스팅 로딩
     * 1:
     * 2: 스크롤
     * count => back 호출시 index
     */
    const { dispatch } = this.props;
    const index = count;
    const params = { props: this.props, index };
    this.setState(state => ({
      footerLoading: typeIndex === 2 ? true : false,
      isPosting: typeIndex === 0 ? true : false // 맨처음 로딩인지, 필터링 로딩인지
    }));
    dispatch(FeedAction.getAllFeed(params)).then(value => {
      if (value === "token_expired") {
        nprogress.done();
      } else {
        const newFeeds = value.result.slice();
        for (let i = 0; i < newFeeds.length; i++) {
          if (newFeeds[i].isLiked) {
            newFeeds[i].isLiked = true;
          }
          newFeeds[i].images = value.result[i].images.map((data, index) => {
            return { original: data.img_url };
          });
        }
        this.setState(state => ({
          feeds: typeIndex === 2 ? [...state.feeds, ...newFeeds] : newFeeds,
          feedLoading: false,
          isPosting: false,
          index: value.nextIndex,
          footerLoading: value.result.length < 20 ? false : true
        }));
        dispatch(FeedAction.getTagRank(params)).then(tagRank => {
          this.setState(state => ({ tagRank, tagRankLoading: false }));
          nprogress.done();
        });
      }
    });
  };

  //우측 최근, 인기순
  handleFeed = index => {
    this.setState({ selectedFeed: index });
  };

  //우측 포스트 타입 필터링
  handlePost = typeIndex => {
    window.scrollTo(0, 0);
    const { isLogin } = this.props;
    const params = {
      type: typeIndex,
      props: this.props,
      index: 0
    };
    if (!isLogin) {
      this.props.history.push({ pathname: "/signup" });
    } else {
      if (typeIndex === 0) {
        this.setState({ selectedPost: typeIndex, isPosting: true });
        this.getAllFeed(0, 0);
      } else {
        this.setState({
          selectedPost: typeIndex,
          isPosting: true,
          footerLoading: false
        });
        this.props.dispatch(FeedAction.getFeed(params)).then(value => {
          const newFeeds = value.result.slice();
          for (let i = 0; i < newFeeds.length; i++) {
            newFeeds[i].images = value.result[i].images.map((data, index) => {
              return { original: data.img_url };
            });
          }
          this.setState({
            index: value.nextIndex,
            feeds: newFeeds,
            isPosting: false,
            footerLoading: value.result.length < 20 ? false : true
          });
        });
      }
    }
  };

  handlePostComment = () => {
    const { dispatch, token, user } = this.props;
    const { comment, selectedPostIndex, selectedComment, feeds } = this.state;
    const newFeed = feeds.slice();
    newFeed.map((data, index) => {
      if (data.id === selectedPostIndex) {
        data.comments.push({
          content: comment,
          user_id: user.id,
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

  handlePostType = (index, type) => {
    this.setState({ selectedPostType: type, selectedPostTypeIndex: index + 1 });
  };

  handleEditor = id => {
    this.props.history.push({
      pathname: "/editor_choice/" + id
    });
  };

  handleExpand = () => {
    this.state.expandNotice === false
      ? this.setState({ expandNotice: true })
      : this.setState({ expandNotice: false });
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

  handleText = e => {
    this.setState({ feedText: e.target.value });
  };

  handleAuth = () => {
    this.props.history.push({
      pathname: "/signup"
    });
  };

  handlePostFeed = () => {
    const { user, isLogin, token } = this.props;
    if (!isLogin) {
      this.props.history.push({
        pathname: "/signup"
      });
    } else {
      const {
        feedText,
        selectedPostTypeIndex,
        imagePreview,
        feeds,
        tags,
        tagRank
      } = this.state;
      const newFeeds = feeds.slice();
      let date = new Date();

      const params = {
        token,
        content: feedText,
        tags,
        type: selectedPostTypeIndex,
        pic_list: imagePreview
      };

      const images = imagePreview.map(data => {
        return { original: data };
      });

      //feeds배열에 추가
      let newTags = [];
      if (tags.length === 0) {
        newTags = [];
      } else {
        tags.map((data, index) => {
          return newTags.push({ title: data });
        });
      }
      // 태그 랭킹에 카운트 추가
      const newTagRank = tagRank.slice();
      for (let i = 0; i < newTags.length; i++) {
        newTagRank.map(data => {
          if (newTags[i].title === data.title) {
            data.counted_value += 1;
          }
          return null;
        });
      }
      newTagRank.sort((a, b) => {
        return b.counted_value - a.counted_value;
      });

      this.setState(state => ({ isPosting: true, tagRank: newTagRank }));
      this.props.dispatch(FeedAction.postFeed(params)).then(value => {
        const frontParams = {
          id: value.newPostId,
          user_id: user.id,
          content: feedText,
          post_type: selectedPostTypeIndex,
          images,
          comments: [],
          tags: newTags,
          created_at: date,
          nickname: user.nickname,
          like_cnt: 0,
          isLiked: false,
          profile_img: user.profile_img
        };
        newFeeds.splice(0, 0, frontParams);
        this.setState(() => ({
          feedText: "",
          imagePreview: [],
          tags: [],
          isPosting: false,
          feeds: newFeeds
        }));
      });
    }
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !this.state.showModal
    }));
  };

  toggleTag = () => {
    this.setState(state => ({
      collapse: !this.state.collapse
    }));
  };

  handleInput = e => {
    this.setState({ comment: e.target.value });
  };

  handleLike = (id, index) => {
    const { dispatch, token } = this.props;
    const { feeds } = this.state;
    const params = { token, post_id: id };
    const newFeeds = feeds.slice();
    newFeeds[index].isLiked = true;
    newFeeds[index].like_cnt += 1;
    this.setState(state => ({ feeds: newFeeds }));
    dispatch(FeedAction.postLike(params));
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
    this.setState(state => ({
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

  handleTags = tags => {
    const hashTags = tags
      .filter(a => {
        return a !== "#";
      })
      .map(tag => {
        tag = tag.replace(/#/g, "").toLowerCase();
        return `#${tag}`;
      });
    this.setState({ tags: _.uniq(hashTags) });
  };

  handleTag = name => {
    name = name.substring(1);
    const { history } = this.props;
    history.push({
      pathname: "/tag/" + name
    });
  };

  handleEmail = e => {
    this.setState({ email: e.target.value, isValid: true });
    if (e.target.value === "" || this.state.password === "") {
      this.setState({ isEmpty: true });
    } else {
      this.setState({ isEmpty: false });
    }
  };

  handlePassword = e => {
    this.setState({ password: e.target.value, isValid: true });
    if (e.target.value === "" || this.state.email === "") {
      this.setState({ isEmpty: true });
    } else {
      this.setState({ isEmpty: false });
    }
  };

  handleSignIn = () => {
    const { email, password, isEmpty } = this.state;
    const randomPackage = Math.floor(Math.random() * 26);
    const selectedEC = ec.editorChoice[randomPackage];
    const params = { email, password };
    if (!isEmpty) {
      this.props.dispatch(AuthAction.postSignIn(params)).then(async value => {
        const token = { props: { token: value } };
        if (value === "failed") {
          this.setState({ isValid: false });
        } else {
          this.setState({ isValid: true });
          await this.props.dispatch(UserAction.getUser(token));
          await this.props.history.push({
            pathname: "/"
          });
          nprogress.start();
          this.setState({ selectedEC, feedLoading: true });
          this.getAllFeed(0, 1);
        }
      });
    }
  };

  handleFacebookSignIn = () => {
    nprogress.start();
    this.getAllFeed(0, 1);
  };
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
