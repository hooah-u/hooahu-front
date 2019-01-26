// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import Checkbox from "material-ui/Checkbox";
import { Container, Row, Col } from "reactstrap";

const defaultProps = {};
const propTypes = {};
const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 8,
    paddingRight: 20
  },
  label: {
    marginLeft: "0px"
  },
  icon: {},
  input: {
    border: "1px red solid"
  }
};

class CheckBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, onCheck, checked } = this.props;
    return (
      <Col xs="5">
        <Checkbox
          color="primary1Color"
          label={label}
          checked={checked}
          onCheck={onCheck}
          style={styles.checkbox}
          inputStyle={styles.input}
          iconStyle={styles.icon}
          labelStyle={styles.label}
        />
      </Col>
    );
  }
}

CheckBox.defaultProps = defaultProps;
CheckBox.propTypes = propTypes;

export default CheckBox;
