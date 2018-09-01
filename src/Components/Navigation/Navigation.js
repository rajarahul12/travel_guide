import React, { Component } from "react";
import "./Navigation.css";
export default class Navigation extends Component {
  onBtnClick = route => {
    this.props.onRouteChange(route);
  };
  render() {
    return (
      <div className="flexadj" style={{ color: this.props.styles }}>
        <div
          className="nav_margin"
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.onBtnClick("home");
          }}
        >
          Home
        </div>

        <div
          className="nav_margin"
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.onBtnClick("about");
          }}
        >
          About
        </div>
        <div
          className="nav_margin"
          style={{
            cursor: "pointer",
            borderLeft: `2px solid ${this.props.border}`
          }}
          onClick={() => {
            this.onBtnClick("travel");
          }}
        >
          Travel Spots
        </div>
        <div
          className="nav_margin"
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.onBtnClick("search");
          }}
        >
          Search Flights
        </div>
        <div
          className="nav_margin"
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.onBtnClick("contact");
          }}
        >
          Contact Us
        </div>
      </div>
    );
  }
}
