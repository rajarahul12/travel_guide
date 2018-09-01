import React, { Component } from "react";
import "./About.css";
export default class About extends Component {
  routeChange = route => {
    this.props.onRouteChange(route);
  };

  render() {
    return (
      <div className="anim">
        <div>
          <img className="img_adj" src={require("./1.jpg")} alt="" />
        </div>
        <div className="flex_adj">
          <h1 className="header">Travel Guide</h1>
          <p className="mar-adjust">
            Creating an ever-lasting travel experience for you is what we always
            crave for. Travel Guide is a tool which helps us to achieve this
            feat.
          </p>
        </div>
        <div class="button_cont" align="center">
          <p
            class="example_e"
            onClick={() => {
              this.routeChange("us");
            }}
          >
            Our Team
          </p>
        </div>
      </div>
    );
  }
}
