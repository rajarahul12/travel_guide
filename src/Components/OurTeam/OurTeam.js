import React, { Component } from "react";
import "./OurTeam.css";
export default class OurTeam extends Component {
  render() {
    return (
      <div className="anim">
        <h2>Our Team</h2>
        <div className="flex-adjs">
          <div className="anil">
            <img className="profiles" src={require("./pic01.jpg")} alt="" />
            <div className="profile_des">
              <h1>Anil Raj</h1>
              <p>FrontEnd Developer</p>
            </div>
          </div>
          <div className="rahul">
            <img className="profiles" src={require("./pic02.jpg")} alt="" />
            <div className="profile_des">
              <h1>Raja Rahul</h1>
              <p>FullStack Developer</p>
            </div>
          </div>
          <div className="nikhil">
            <img className="profiles" src={require("./pic03.jpg")} alt="" />
            <h1>Nikhil JSK</h1>
          </div>
          <div className="lokesh">
            <img className="profiles" src={require("./pic04.jpg")} alt="" />
            <h1>Lokesh Varma</h1>
          </div>
        </div>
      </div>
    );
  }
}
