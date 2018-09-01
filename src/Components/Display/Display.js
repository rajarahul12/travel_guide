import React, { Component } from "react";
import "tachyons";
import "./Display.css";
import Card from "../Card/Card";
var ind_min = 999999;
var vis_min = 999999;
var jet_min = 999999;
var air_min = 999999;
var arr = [0, 1, 2, 3];
export default class Display extends Component {
  render() {
    // console.log(this.props);
    const { data } = this.props;
    // console.log(data.length);
    return (
      <div className="back anim">
        <h1 className="margin-adj" style={{ color: "white" }}>
          Available Flights
        </h1>
        <h3 style={{ color: "white" }}>
          Results fetched for lowest flight fares
        </h3>
        {data.map((flight, i) => {
          if (
            flight.airline === "Indigo" &&
            flight.fare.grossamount < ind_min
          ) {
            ind_min = flight.fare.grossamount;
            arr[0] = i;
          } else if (
            flight.airline === "Vistara" &&
            flight.fare.grossamount < vis_min
          ) {
            vis_min = flight.fare.grossamount;
            arr[1] = i;
          } else if (
            flight.airline === "Jet Airways" &&
            flight.fare.grossamount < jet_min
          ) {
            jet_min = flight.fare.grossamount;
            arr[2] = i;
          } else if (
            flight.airline === "Air India" &&
            flight.fare.grossamount < air_min
          ) {
            air_min = flight.fare.grossamount;
            arr[3] = i;
          }
          //  return <Card key={i} flight={flight} />;
        })}
        {/* {console.log(data[ind_i], data[vis_i], data[air_i], data[jet_i])} */}
        {arr.map((val, i) => {
          return <Card key={i} flight={data[val]} />;
        })}
        }
      </div>
    );
  }
}
