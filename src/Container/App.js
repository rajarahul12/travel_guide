import React, { Component } from "react";

//Importing Components
// import Booking from "../Components/Booking/Booking";
import FormsDemo from "../Components/Flight/Flight";

class App extends Component {
  constructor() {
    super();
    this.state = {
      flightstate: {}
    };
  }

  sendData = data => {
    this.setState({ flightstate: data });
    console.log(this.state.flightstate);
  };

  render() {
    return (
      <div>
        <FormsDemo sendData={this.sendData} />
      </div>
    );
  }
}

export default App;
