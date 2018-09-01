import React, { Component } from "react";
import "./Home.css";
import Tilt from "react-tilt";
export default class Home extends Component {
  routeChange = route => {
    this.props.onRouteChange(route);
  };

  render() {
    return (
      <div>
        <video autoPlay muted id="myVideo">
          <source src={require("./2.mp4")} type="video/mp4" />
        </video>
        <div className="font-adj">
          <Tilt className="Tilt" options={{ max: 45 }}>
            <h1 className="font">TRAVEL GUIDE</h1>
          </Tilt>

          <p className="capt mar-adj">
            One stop guide for planning your travel
          </p>
          <div class="button_cont" align="center">
            <p
              class="example_e"
              onClick={() => {
                this.routeChange("travel");
              }}
            >
              Explore Places
            </p>
          </div>
        </div>
      </div>
    );
  }
}
