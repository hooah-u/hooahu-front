// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.
/* global google */

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, SocialInput, Comment } from "../../Components";

import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import * as ChoiceAction from "../../ActionCreators/ChoiceAction";
import ec from "../../Json/ec";
import cx from "classnames";
import NumberFormat from "react-number-format";
import nprogress from "nprogress";

import scrollToComponent from "react-scroll-to-component";
import { withGoogleMap, GoogleMap, withScriptjs } from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import ImageGallery from "react-image-gallery";

const defaultProps = {};
const propTypes = {};

// const styles = {
//   image: {
//     width: "100%"
//   }
// };

const mapStateToProps = state => {
  return {
    isLogin: state.reducer.isLogin,
    user: state.reducer.user,
    token: state.reducer.token
  };
};

class EditorDetailPage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.places = [];
    this.state = {
      activeTab: "1",
      activeIndex: 0,
      slideIndex: 0,
      comment: "",
      isLiked: false,
      showModal: false,
      Map: null,
      selectedChoice: null,
      selectedPlaces: null,
      commentList: null
    };
  }

  componentWillMount() {
    nprogress.start();
    window.scrollTo(0, 0);
    const choice = Number(this.props.match.params.package);
    const ecJson = Object.create(ec.editorChoice);
    let selectedChoiceIndex = 0;

    for (let i = 0; i < ecJson.length; i++) {
      if (ecJson[i].id === choice) {
        selectedChoiceIndex = i;
      }
    }

    const { token } = this.props;
    const params = {
      id: Number(this.props.match.params.package),
      props: this.props,
      token
    };
    this.props.dispatch(ChoiceAction.getLikeChoiceCheck(params)).then(like => {
      if (like.isChoiceLiked) {
        this.setState({ isLiked: true });
      }
      this.props.dispatch(ChoiceAction.getChoiceComment(params)).then(value => {
        this.setState({ commentList: value.reverse() });
        nprogress.done();
      });
    });

    let selectedChoice = Object.create(ecJson[selectedChoiceIndex]);
    selectedChoice.image_url = selectedChoice.image_url.map((data, index) => {
      return { original: data };
    });

    let selectedPlaces = JSON.parse(JSON.stringify(selectedChoice.places));
    for (let i = 0; i < selectedPlaces.length; i++) {
      selectedPlaces[i].image_url = selectedPlaces[i].image_url.map(
        (data, index) => {
          return { original: data };
        }
      );
    }

    this.setState(state => ({ selectedChoice, selectedPlaces }));

    const starLength = selectedChoice.rating;
    let starArray = [];
    for (let i = 0; i < starLength; i++) {
      starArray.push("");
    }

    const MapWithAMarker = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={14}
          defaultCenter={{
            lat: Number(selectedChoice.places[0].locationX),
            lng: Number(selectedChoice.places[0].locationY)
          }}
        >
          {selectedChoice.places.map((data, index) => {
            return (
              <MarkerWithLabel
                key={index}
                position={{
                  lat: Number(data.locationX),
                  lng: Number(data.locationY)
                }}
                onClick={() => {
                  scrollToComponent(this.places[index], {
                    offset: -75,
                    align: "top",
                    duration: 1200,
                    ease: "outCirc"
                  });
                }}
                labelAnchor={new google.maps.Point(0, 0)}
                labelStyle={{
                  backgroundColor: "#5b5e6d",
                  opacity: 0.8,
                  color: "white",
                  fontSize: "16px",
                  padding: "8px"
                }}
              >
                <div className="editorDetail__googlemapLabel">{index + 1}</div>
              </MarkerWithLabel>
            );
          })}
        </GoogleMap>
      ))
    );
    this.setState({ Map: MapWithAMarker });
  }

  // componentWillUpdate() {
  //   const choice = Number(this.props.match.params.package);
  //   const ecJson = ec.editorChoice;
  //   let selectedChoiceIndex = 0;
  //   for (let i = 0; i < ecJson.length; i++) {
  //     if (ecJson[i].id === choice) {
  //       selectedChoiceIndex = i;
  //     }
  //   }
  //   const selectedChoice = ecJson[selectedChoiceIndex];
  //   selectedChoice.image_url = selectedChoice.image_url.map((data, index) => {
  //     return data;
  //   });

  //   for (let i = 0; i < selectedChoice.places.length; i++) {
  //     selectedChoice.places[i].image_url = selectedChoice.places[
  //       i
  //     ].image_url.map((data, index) => {
  //       return data;
  //     });
  //   }
  // }

  componentDidMount() {}

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  handleTravel = () => {
    scrollToComponent(this.test, {
      offset: -75,
      align: "top",
      duration: 1200,
      ease: "outCirc"
    });
  };

  handleTop = () => {
    scrollToComponent(this.top, {
      offset: 0,
      align: "top",
      duration: 1200,
      ease: "outCirc"
    });
  };

  handleLike = () => {
    const params = {
      id: Number(this.props.match.params.package),
      props: this.props
    };
    if (this.props.isLogin === false) {
      this.props.history.push({
        pathname: "/signup"
      });
    } else {
      if (!this.state.isLiked) {
        this.setState({ isLiked: true });
        this.props.dispatch(ChoiceAction.postLikeChoice(params));
      } else {
        this.setState({ isLiked: false });
        this.props.dispatch(ChoiceAction.postDislikeChoice(params));
      }
    }
  };

  handleInput = e => {
    this.setState({ comment: e.target.value });
  };

  handlePost = () => {
    const params = {
      id: Number(this.props.match.params.package),
      comment: this.state.comment,
      token: this.props.token
    };
    // console.log(params);
    this.props.dispatch(ChoiceAction.postChoiceComment(params)).then(value => {
      const date = new Date();
      const newComment = this.state.commentList.slice();
      const content = {
        nickname: this.props.user.nickname,
        comment: this.state.comment,
        created_at: date
      };
      newComment.splice(0, 0, content);
      this.setState({ commentList: newComment, comment: "" });
    });
  };

  handleCommentUser = user_id => {
    this.props.history.push({
      pathname: "/@" + user_id
    });
  };

  convert = type => {
    if (type === "Bus") {
      return <i className="xi-bus" />;
    } else if (type === "Subway") {
      return <i className="xi-subway" />;
    } else if (type === "Taxi") {
      return <i className="xi-taxi" />;
    } else if (type === "Bike") {
      return <i className="xi-bicycle" />;
    } else if (type === "Ship") {
      return <i className="xi-ship" />;
    } else {
      return <i className="xi-walk" />;
    }
  };

  render() {
    const {
      isLiked,
      Map,
      commentList,
      comment,
      selectedChoice,
      selectedPlaces
    } = this.state;
    const { user, isLogin } = this.props;

    const starLength = selectedChoice.rating;
    let starArray = [];
    for (let i = 0; i < starLength; i++) {
      starArray.push("");
    }

    return (
      <div
        className="editorDetail"
        ref={section => {
          this.top = section;
        }}
      >
        <Modal
          isOpen={this.state.showModal}
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
                <Comment comment={commentList && commentList} />
              </div>
              <SocialInput
                className="editorDetail__modal__input"
                user={user}
                value={comment}
                isLogin={isLogin}
                onChange={this.handleInput}
                placeholder="Leave a comment"
                onClick={this.handlePost}
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
        <div className="editorDetail__sideBar">
          {isLiked === false ? (
            <span
              className="editorDetail__sideBar__icon"
              onClick={this.handleLike}
            >
              <i className="xi-heart-o" />
            </span>
          ) : (
            <span
              className="editorDetail__sideBar__icon-liked"
              onClick={this.handleLike}
            >
              <i className="xi-heart" />
            </span>
          )}
          <span
            onClick={this.toggleModal}
            className="editorDetail__sideBar__icon"
          >
            <i className="xi-speech-o" />
          </span>
          <span
            className="editorDetail__sideBar__icon"
            onClick={this.handleTop}
          >
            <i className="xi-arrow-up" />
          </span>
        </div>
        <NavBar isActive="editor" />
        <div className="editorDetail__content">
          <div className="editorDetail__content__package">
            <div className="editorDetail__content__package__text">
              <div className="editorDetail__content__package__text__stars">
                {starArray.map((data, index) => {
                  return (
                    <span
                      key={index}
                      className="editorDetail__content__package__text__stars__star"
                    >
                      <i className="xi-star" />
                    </span>
                  );
                })}
              </div>
              <h2 className="editorDetail__content__package__text__title">
                {selectedChoice.name}
              </h2>
              <div className="editorDetail__content__package__text__infoArea">
                <p className="editorDetail__content__package__text__infoArea__info">
                  {selectedChoice.days + " / " + selectedChoice.area}
                </p>
                <p className="editorDetail__content__package__text__infoArea__info">
                  {selectedChoice.places.length +
                    " places" +
                    " / " +
                    selectedChoice.distance +
                    " km"}
                </p>
              </div>

              <p className="editorDetail__content__package__text__desc">
                {selectedChoice.description}
              </p>

              <div className="editorDetail__content__package__text__priceArea">
                <div className="editorDetail__content__package__text__priceArea__price">
                  <p className="editorDetail__content__package__text__priceArea__price__text">
                    Average expense
                  </p>
                  <h4 className="editorDetail__content__package__text__priceArea__price__price">
                    <NumberFormat
                      value={selectedChoice.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₩"}
                    />
                  </h4>
                </div>
                <div className="editorDetail__content__package__text__priceArea__travel">
                  <div
                    className="editorDetail__content__package__text__priceArea__travel__button"
                    onClick={this.handleTravel}
                  >
                    Start travel!
                  </div>
                </div>
              </div>

              <div className="editorDetail__content__package__text__detail">
                <div className="editorDetail__content__package__text__detail__concept">
                  <div className="editorDetail__content__package__text__detail__concept__row">
                    <span
                      className={cx(
                        "editorDetail__content__package__text__detail__concept__row__icon",
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-1":
                            selectedChoice.concept.calm === 1
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-2":
                            selectedChoice.concept.calm === 2
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-3":
                            selectedChoice.concept.calm === 3
                        }
                      )}
                    >
                      <i className="xi-cafe" />
                    </span>
                    <span
                      className={cx(
                        "editorDetail__content__package__text__detail__concept__row__icon",
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-1":
                            selectedChoice.concept.sightSeeing === 1
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-2":
                            selectedChoice.concept.sightSeeing === 2
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-3":
                            selectedChoice.concept.sightSeeing === 3
                        }
                      )}
                    >
                      <i className="xi-eye" />
                    </span>
                    <span
                      className={cx(
                        "editorDetail__content__package__text__detail__concept__row__icon",
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-1":
                            selectedChoice.concept.dandy === 1
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-2":
                            selectedChoice.concept.dandy === 2
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-3":
                            selectedChoice.concept.dandy === 3
                        }
                      )}
                    >
                      <i className="xi-glass" />
                    </span>
                    <span
                      className={cx(
                        "editorDetail__content__package__text__detail__concept__row__icon",
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-1":
                            selectedChoice.concept.food === 1
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-2":
                            selectedChoice.concept.food === 2
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-3":
                            selectedChoice.concept.food === 3
                        }
                      )}
                    >
                      <i className="xi-restaurant" />
                    </span>
                  </div>
                  <div className="editorDetail__content__package__text__detail__concept__row">
                    <span
                      className={cx(
                        "editorDetail__content__package__text__detail__concept__row__icon",
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-1":
                            selectedChoice.concept.activity === 1
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-2":
                            selectedChoice.concept.activity === 2
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-3":
                            selectedChoice.concept.activity === 3
                        }
                      )}
                    >
                      <i className="xi-run" />
                    </span>
                    <span
                      className={cx(
                        "editorDetail__content__package__text__detail__concept__row__icon",
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-1":
                            selectedChoice.concept.luxury === 1
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-2":
                            selectedChoice.concept.luxury === 2
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-3":
                            selectedChoice.concept.luxury === 3
                        }
                      )}
                    >
                      <i className="xi-sketch" />
                    </span>
                    <span
                      className={cx(
                        "editorDetail__content__package__text__detail__concept__row__icon",
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-1":
                            selectedChoice.concept.love === 1
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-2":
                            selectedChoice.concept.love === 2
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-3":
                            selectedChoice.concept.love === 3
                        }
                      )}
                    >
                      <i className="xi-heart" />
                    </span>
                    <span
                      className={cx(
                        "editorDetail__content__package__text__detail__concept__row__icon",
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-1":
                            selectedChoice.concept.party === 1
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-2":
                            selectedChoice.concept.party === 2
                        },
                        {
                          "editorDetail__content__package__text__detail__concept__row__icon-3":
                            selectedChoice.concept.party === 3
                        }
                      )}
                    >
                      <i className="xi-emoticon-happy" />
                    </span>
                  </div>
                </div>
                <div className="editorDetail__content__package__text__detail__comment">
                  <div className="editorDetail__content__package__text__detail__comment__like">
                    {isLiked === false ? (
                      <span
                        className="editorDetail__content__package__text__detail__comment__like__icon"
                        onClick={this.handleLike}
                      >
                        <i className="xi-heart-o" />
                      </span>
                    ) : (
                      <span
                        className="editorDetail__content__package__text__detail__comment__like__icon-liked"
                        onClick={this.handleLike}
                      >
                        <i className="xi-heart" />
                      </span>
                    )}
                  </div>
                  <div className="editorDetail__content__package__text__detail__comment__review">
                    <span
                      onClick={this.toggleModal}
                      className="editorDetail__content__package__text__detail__comment__review__icon"
                    >
                      <i className="xi-speech-o" />
                    </span>
                  </div>
                </div>
              </div>
              <hr />
              <div className="editorDetail__content__package__text__comment">
                <Comment
                  comment={commentList && commentList.slice(0, 3)}
                  onClick={this.handleCommentUser}
                />
              </div>
            </div>
            <div className="editorDetail__content__package__image">
              <Nav tabs>
                <NavItem className="editorDetail__content__package__image__tabs">
                  <NavLink
                    className={cx(
                      "editorDetail__content__package__image__tabs__tab",
                      {
                        active: this.state.activeTab === "1"
                      }
                    )}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    Photos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={cx(
                      "editorDetail__content__package__image__tabs__tab",
                      {
                        active: this.state.activeTab === "2"
                      }
                    )}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    Map
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <div className="editorDetail__carousel">
                    <ImageGallery
                      items={selectedChoice.image_url}
                      showThumbnails={false}
                      showPlayButton={false}
                      showBullets={true}
                    />
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXyr_w-hrjwCHZblSHVsFSxsvyDPDvrVc&language=en&region=US"
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "400px" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                  />
                </TabPane>
              </TabContent>
            </div>
          </div>
          <div className="editorDetail__content__places">
            <div className="editorDetail__content__places__title">
              <h1
                ref={section2 => {
                  this.test = section2;
                }}
                className="editorDetail__content__places__title__text"
              >
                Places
              </h1>
            </div>
            <hr className="editorDetail__hr" />

            {selectedPlaces &&
              selectedPlaces.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="editorDetail__content__places__place"
                  >
                    <div className="editorDetail__content__places__place__image">
                      <ImageGallery
                        items={data.image_url}
                        showThumbnails={false}
                        showPlayButton={false}
                        showBullets={true}
                      />
                    </div>
                    <div
                      className="editorDetail__content__places__place__text"
                      ref={section3 => {
                        this.places[index] = section3;
                      }}
                    >
                      <h2 className="editorDetail__content__places__place__text__title">
                        {String("0" + (index + 1)).slice(-2)}
                      </h2>
                      <h2 className="editorDetail__content__places__place__text__title__text">
                        {data.name}
                      </h2>
                      <p className="editorDetail__content__places__place__text__function">
                        {data.function}
                      </p>
                      <div className="editorDetail__content__places__place__text__infoArea">
                        <div className="editorDetail__content__places__place__text__infoArea__row">
                          <span className="editorDetail__content__places__place__text__infoArea__row__icon">
                            <i className="xi-maker" />
                          </span>
                          <span className="editorDetail__content__places__place__text__infoArea__row__text">
                            {data.address}
                          </span>
                        </div>
                        {data.hours === "" ? null : (
                          <div className="editorDetail__content__places__place__text__infoArea__row">
                            <span className="editorDetail__content__places__place__text__infoArea__row__icon">
                              <i className="xi-time-o" />
                            </span>
                            <span className="editorDetail__content__places__place__text__infoArea__row__text">
                              {data.hours}
                            </span>
                          </div>
                        )}
                        {data.homepage === "" ? null : (
                          <div className="editorDetail__content__places__place__text__infoArea__row">
                            <span className="editorDetail__content__places__place__text__infoArea__row__icon">
                              <i className="xi-external-link" />
                            </span>
                            <span className="editorDetail__content__places__place__text__infoArea__row__text">
                              <a href={data.homepage}>Website</a>
                            </span>
                          </div>
                        )}
                        {data.phone === "" ? null : (
                          <div className="editorDetail__content__places__place__text__infoArea__row">
                            <span className="editorDetail__content__places__place__text__infoArea__row__icon">
                              <i className="xi-call" />
                            </span>
                            <span className="editorDetail__content__places__place__text__infoArea__row__text">
                              {data.phone}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="editorDetail__content__places__place__text__desc">
                        <p className="editorDetail__content__places__place__text__desc__text">
                          {'"' + data.content.sgt + '"'}
                        </p>
                        <hr />
                        <p className="editorDetail__content__places__place__text__desc__text__formal">
                          {data.content.formal}
                        </p>
                      </div>

                      {index === 0 ? (
                        <div className="editorDetail__content__places__place__text__infoArea">
                          <div className="editorDetail__content__places__place__text__infoArea__container">
                            <span className="editorDetail__content__places__place__text__infoArea__row__icon">
                              <i className="xi-map" />
                            </span>
                            <span className="editorDetail__content__places__place__text__infoArea__row__text">
                              Direction
                            </span>
                          </div>
                          <div className="editorDetail__content__places__place__text__infoArea__row">
                            <br />
                            <span className="editorDetail__content__places__place__text__infoArea__row__area">
                              Area 1 :
                            </span>
                            <span className="editorDetail__content__places__place__text__infoArea__row__text">
                              <a href={data.transport.Area1.link}>
                                {data.transport.Area1.time}
                              </a>
                            </span>
                          </div>
                          <div className="editorDetail__content__places__place__text__infoArea__row">
                            <span className="editorDetail__content__places__place__text__infoArea__row__area">
                              Area 2 :
                            </span>
                            <span className="editorDetail__content__places__place__text__infoArea__row__text">
                              <a href={data.transport.Area2.link}>
                                {data.transport.Area2.time}
                              </a>
                            </span>
                          </div>
                          <div className="editorDetail__content__places__place__text__infoArea__row">
                            <span className="editorDetail__content__places__place__text__infoArea__row__area">
                              Area 3 :
                            </span>
                            <span className="editorDetail__content__places__place__text__infoArea__row__text">
                              <a href={data.transport.Area3.link}>
                                {data.transport.Area3.time}
                              </a>
                            </span>
                          </div>
                          <div className="editorDetail__content__places__place__text__infoArea__row">
                            <span className="editorDetail__content__places__place__text__infoArea__row__area">
                              Area 4 :
                            </span>
                            <span className="editorDetail__content__places__place__text__infoArea__row__text">
                              <a href={data.transport.Area4.link}>
                                {data.transport.Area4.time}
                              </a>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="editorDetail__content__places__place__text__infoArea">
                          <div className="editorDetail__content__places__place__text__infoArea__row">
                            {data.transport.time.map((type, index) => {
                              return (
                                <div
                                  className="editorDetail__content__places__place__text__infoArea__container"
                                  key={index}
                                >
                                  <span className="editorDetail__content__places__place__text__infoArea__row__icon">
                                    {this.convert(type.type)}
                                  </span>
                                  <span className="editorDetail__content__places__place__text__infoArea__row__text">
                                    {type.time}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="editorDetail__content__places__place__text__infoArea__row">
                            {data.transport.time.map((item, index) => {
                              if (
                                item.type !== "On Foot" &&
                                item.type !== "Ship"
                              ) {
                                return (
                                  <div
                                    className="editorDetail__content__places__place__text__infoArea__container"
                                    key={index}
                                  >
                                    <span className="editorDetail__content__places__place__text__infoArea__row__icon">
                                      <i className="xi-map" />
                                    </span>
                                    <span className="editorDetail__content__places__place__text__infoArea__row__text">
                                      <a
                                        href={data.transport.link}
                                        target="_blank"
                                      >
                                        Direction
                                      </a>
                                    </span>
                                  </div>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

EditorDetailPage.defaultProps = defaultProps;
EditorDetailPage.propTypes = propTypes;

export default connect(mapStateToProps)(EditorDetailPage);
