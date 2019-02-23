// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import TextField from "material-ui/TextField";

const defaultProps = {};
const propTypes = {};

const styles = {
  input: {
    width: 290
  },
  inputText: {
    fontSize: 18,
    color: "#5b5e6d",
    paddingBottom: 20,
    paddingLeft: 10
  },
  hint: {
    marginBottom: 10,
    marginLeft: 10
  }
};

class RoundInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      type,
      onChange,
      onKeyPress,
      placeholder,
      errorText,
      defaultValue
    } = this.props;
    return (
      <div className="roundInput">
        <TextField
          hintText={placeholder}
          onChange={onChange}
          onKeyPress={onKeyPress}
          defaultValue={defaultValue}
          type={type}
          style={styles.input}
          inputStyle={styles.inputText}
          hintStyle={styles.hint}
          underlineStyle={styles.underline}
          errorText={errorText}
        />
      </div>
    );
  }
}

RoundInput.defaultProps = defaultProps;
RoundInput.propTypes = propTypes;

export default RoundInput;
