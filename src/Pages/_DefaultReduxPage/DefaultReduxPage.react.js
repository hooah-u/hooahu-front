// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import { NavBar } from "../../Components";
import { Container, Row, Col } from "reactstrap";
import filterJson from "../../Json/filter";
import ec from "../../Json/ec";
import cx from "classnames";
import NumberFormat from "react-number-format";
import ProgressiveImage from "react-progressive-image-loading";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class DefaultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="defaultPage">
        <NavBar />
        This is Default Redux Page
      </div>
    );
  }
}

DefaultPage.defaultProps = defaultProps;
DefaultPage.propTypes = propTypes;

export default connect(mapStateToProps)(DefaultPage);
