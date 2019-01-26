// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

const defaultProps = {};
const propTypes = {};

class GoogleMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>This is Default Component</div>;
  }
}

GoogleMap.defaultProps = defaultProps;
GoogleMap.propTypes = propTypes;

export default GoogleMap;
