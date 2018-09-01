import React, { Component } from "react";
import "./Search.css";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
mobiscroll.settings = {
  theme: "ios",
  lang: "en"
};

class Search extends Component {
  constructor(props) {
    super(props);

    var now = new Date(),
      departureDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 3
      ),
      returnDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 7
      );

    this.state = {
      tripType: "round",
      origin: "DEL",
      destination: "BOM",
      timeRange: [departureDate, returnDate],
      adults: 1,
      children: 0,
      infant: 0,
      tripClass: "economy",
      app_key: "3ef02fa6e90117990fcb719881a335b6	",
      app_id: "a4b1f9f8"
    };
  }

  changeTripType = (value, event) => {
    // set default time range depending on trip type
    var returnDate = null,
      departureDate = this.state.timeRange[0];
    if (value === "round") {
      if (this.state.timeRange[1] != null) {
        returnDate = this.state.timeRange[1];
      } else {
        returnDate = new Date(
          departureDate.getFullYear(),
          departureDate.getMonth(),
          departureDate.getDate() + 7
        );
      }
    }

    // push changes to state
    this.setState({
      tripType: value,
      timeRange: [departureDate, returnDate]
    });
  };

  // select time range
  rangeSet = (event, inst) => {
    if (this.state.tripType === "round") {
      this.setState({ timeRange: inst.getVal() });
    } else {
      this.setState({ timeRange: [inst.getVal()[0], null] });
    }
  };

  rangeChange = (event, inst) => {
    var oneWay = this.state.tripType === "oneway";
    if (oneWay && event.control === "calendar" && event.active === "start") {
      inst._isVisible = false;
      inst.setActiveDate("start");
      inst._isVisible = true;
    }
    if (inst._markup) {
      inst._isValid = true;
      inst._markup
        .find(".mbsc-fr-btn-s .mbsc-fr-btn")
        .removeClass("mbsc-fr-btn-d" + (oneWay ? " mbsc-disabled" : ""));
    }
  };

  rangeClose = () => {
    if (this.state.tripType === "oneway") {
      return true;
    }
  };

  // passenger numbers
  adultsChange = event => {
    this.setState({ adults: +event.target.value });
  };

  childrenChange = event => {
    this.setState({ children: +event.target.value });
  };

  infantChange = event => {
    this.setState({ infant: +event.target.value });
  };

  // trip class selection
  tripClassChange = newClass => {
    this.setState({ tripClass: newClass });
  };

  getRemoteData = () => {
    return {
      url: "https://trial.mobiscroll.com/airports/",
      remoteFilter: true,
      dataType: "jsonp",
      processResponse: function(data) {
        var i,
          item,
          ret = [];

        if (data) {
          for (i = 0; i < data.length; i++) {
            item = data[i];
            ret.push({
              value: item.code,
              text: item.name,
              html:
                '<div style="font-size:16px;line-height:18px;">' +
                item.name +
                '</div><div style="font-size:10px;line-height:12px;">' +
                item.location +
                ", " +
                item.code +
                "</div>"
            });
          }
        }

        return ret;
      }
    };
  };

  onButtonClick = () => {
    fetch(
      `https://fierce-castle-81936.herokuapp.com/https://developer.goibibo.com/api/search/?app_id=${
        this.state.app_id
      }&app_key=${
        this.state.app_key
      }&format=json&source=DEL&destination=BOM&dateofdeparture=20180902&seatingclass=E&adults=1&children=0&infants=0&counter=100`
    )
      .then(response => response.json())
      .then(data => {
        if (data.data.onwardflights === undefined) {
          this.props.onRouteChange("Error");
        } else {
          this.props.getFlightData(data);
          this.props.onRouteChange("Display");
        }
      })
      .catch(error => this.props.onRouteChange("Error"));
  };

  render() {
    return (
      <mobiscroll.Form className="md-flight-booking anim">
        <div className="md-ftype-cont">
          <label>
            Round trip
            <input
              type="radio"
              data-role="segmented"
              checked={this.state.tripType === "round"}
              name="triptype"
              onChange={this.changeTripType.bind(this, "round")}
              className="md-flight-type"
            />
          </label>
          <label>
            One way
            <input
              type="radio"
              data-role="segmented"
              checked={this.state.tripType === "oneway"}
              name="triptype"
              onChange={this.changeTripType.bind(this, "oneway")}
              className="md-flight-type md-one-way"
            />
          </label>
        </div>

        <label>
          Origin
          <mobiscroll.Select
            value={this.state.origin}
            multiline={2} // More info about multiline: https://docs.mobiscroll.com/4-3-2/react/range#opt-multiline
            height={50} // More info about height: https://docs.mobiscroll.com/4-3-2/react/range#opt-height
            filter={true}
            data={this.getRemoteData()}
            placeholder="Please select..."
          />
        </label>
        <label>
          Destination
          <mobiscroll.Select
            multiline={2} // More info about multiline: https://docs.mobiscroll.com/4-3-2/react/range#opt-multiline
            height={50} // More info about height: https://docs.mobiscroll.com/4-3-2/react/range#opt-height
            filter={true}
            data={this.getRemoteData()}
            placeholder="Please select..."
          />
        </label>
        <div className="md-time-range">
          <label>
            Leaving
            <mobiscroll.Range
              value={this.state.timeRange}
              onSet={this.rangeSet} // More info about onSet: https://docs.mobiscroll.com/4-3-2/react/range#event-onSet
              onSetDate={this.rangeChange} // More info about onSetDate: https://docs.mobiscroll.com/4-3-2/react/range#event-onSetDate
              onBeforeClose={this.rangeClose} // More info about onBeforeClose: https://docs.mobiscroll.com/4-3-2/react/range#event-onBeforeClose
              className="md-leaving-date"
              startInput=".md-leaving-date" // More info about startInput: https://docs.mobiscroll.com/4-3-2/react/range#opt-startInput
              endInput=".md-return-date" // More info about endInput: https://docs.mobiscroll.com/4-3-2/react/range#opt-endInput
              min={new Date()} // More info about min: https://docs.mobiscroll.com/4-3-2/react/range#opt-min
              showSelector={false} // More info about showSelector: https://docs.mobiscroll.com/4-3-2/react/range#opt-showSelector
            />
          </label>

          <label>
            Returning
            <input
              type="text"
              className="md-return-date"
              disabled={this.state.tripType === "oneway"}
            />
          </label>
        </div>

        <mobiscroll.Stepper
          value={this.state.adults}
          onChange={this.adultsChange}
          min={1}
          max={15}
          data-val="left"
        >
          Adults
          <span className="mbsc-desc">From 14 years</span>
        </mobiscroll.Stepper>
        <mobiscroll.Stepper
          value={this.state.children}
          onChange={this.childrenChange}
          min={0}
          max={15}
          data-val="left"
        >
          Children
          <span className="mbsc-desc">2-14 years</span>
        </mobiscroll.Stepper>
        <mobiscroll.Stepper
          value={this.state.infant}
          onChange={this.infantChange}
          min={0}
          max={10}
          data-val="left"
        >
          Infant
          <span className="mbsc-desc">0-2 years</span>
        </mobiscroll.Stepper>

        <label>
          Economy
          <input
            type="radio"
            checked={this.state.tripClass === "economy"}
            onChange={this.tripClassChange.bind(this, "economy")}
            data-role="segmented"
            name="flight_type"
          />
        </label>
        <label>
          Comfort
          <input
            type="radio"
            checked={this.state.tripClass === "comfort"}
            onChange={this.tripClassChange.bind(this, "comfort")}
            data-role="segmented"
            name="flight_type"
          />
        </label>
        <label>
          Business
          <input
            type="radio"
            checked={this.state.tripClass === "business"}
            onChange={this.tripClassChange.bind(this, "business")}
            data-role="segmented"
            name="flight_type"
          />
        </label>

        <div className="mbsc-padding">
          <button
            className="mbsc-btn-block"
            onClick={e => {
              this.onButtonClick();
              e.preventDefault();
            }}
          >
            Find Flights
          </button>
        </div>
      </mobiscroll.Form>
    );
  }
}

export default Search;
