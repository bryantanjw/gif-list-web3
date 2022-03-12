import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnimatedNavbar from "./AnimatedNavbar";
import styled from "styled-components";
import "./styles.css";
import "normalize.css";

class Header extends Component {
  state = { duration: 300 };

  onChange = data => {
      this.setState(data);
  };
  
  render() {
    return (
      <div className="AppContainer">
        <AnimatedNavbar duration={this.state.duration} />
      </div>
    );
  };
};

export default Header;