import React, { Component } from "react";
//IMporting components
import Navigation from "../Components/Navigation/Navigation";
// import Particle from "../Components/Particle/Particle";
import Home from "../Components/Home/Home";
import Search from "../Components/Search/Search";
import Display from "../Components/Display/Display";
import About from "../Components/About/About";
import OurTeam from "../Components/OurTeam/OurTeam";
import Contact from "../Components/Contact/Contact";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "home",
      colors: "white",
      border: "white",
      data: []
    };
  }

  getFlightData = data => {
    this.setState({ data: data.data.onwardflights });
  };

  onRouteChange = route => {
    this.setState({ route: route });
    if (route !== "home") {
      this.setState({ colors: "black", border: "black" });
    } else {
      this.setState({ colors: "white", border: "white" });
    }
  };

  render() {
    return (
      <div>
        <Navigation
          styles={this.state.colors}
          onRouteChange={this.onRouteChange}
        />

        {this.state.route === "home" ? (
          <div>
            <Home onRouteChange={this.onRouteChange} />
          </div>
        ) : this.state.route === "travel" ? (
          <h1>Travel</h1>
        ) : this.state.route === "search" ? (
          <Search
            getFlightData={this.getFlightData}
            onRouteChange={this.onRouteChange}
          />
        ) : this.state.route === "about" ? (
          <About onRouteChange={this.onRouteChange} />
        ) : this.state.route === "Error" ? (
          <h1>Bad Api Request.Reload</h1>
        ) : this.state.route === "Display" ? (
          <Display data={this.state.data} />
        ) : this.state.route === "us" ? (
          <OurTeam />
        ) : (
          <Contact />
        )}
      </div>
    );
  }
}

export default App;
