import React, { Component } from "react";
import "./Card.css";
export default class Card extends Component {
  render() {
    const { flight } = this.props;
    // console.log(flight);
    return (
      <div
        style={{
          marginLeft: "30px",
          marginRight: "30px",
          marginTop: "30px",
          marginBottom: "30px"
        }}
      >
        <div className="tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5">
          <p>
            <img className="svg_adj" src={require("./1.svg")} alt="" />
          </p>
          <p>
            Origin:
            {flight.origin}
          </p>
          <p>Fare : {flight.fare.grossamount}</p>
          <p>CabinClass : {flight.CabinClass}</p>
          <p>
            Departure Date:
            {flight.DepartureTime.slice(0, 10)}
          </p>
          <p>
            Airline:
            {flight.airline}
          </p>
          <p>
            Flight No:
            {flight.flightno}
          </p>
        </div>
      </div>
    );
  }
}
