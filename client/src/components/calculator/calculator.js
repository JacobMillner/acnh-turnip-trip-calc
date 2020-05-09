import "./calculator.css";
import React, { useState } from "react";
import { InputNumber, Button, Form, message, Card, Row } from "antd";

function Calculator(props) {
  const [turnipPrice, setTurnipPrice] = useState(0);
  const [bells, setBells] = useState(0);
  const [results, setResults] = useState();
  const [trips, setTrips] = useState();

  const totalTurnipsPerTrip = 4000; // TODO: allow setting total bag slots

  const handleTurnipChange = (value) => {
    setTurnipPrice(value);
  };

  const handleBellsChange = (value) => {
    setBells(value);
  };

  const formatter = (value) => {
    // add commas
    if (value != null && value != "" && value.length != 0 && !isNaN(value)) {
      let commafy = parseInt(value).toLocaleString();
      return commafy;
    } else {
      return value;
    }
  };

  const handleCalculate = () => {
    if (bells == 0 || turnipPrice == 0) {
      message.error(
        "Input Error: Make sure you enter turnip prices and bells."
      );
      return;
    }
    let totalTrips = 0;
    let totalTurnipsToBuy = 0;
    let totalBells = parseInt(bells);
    let curTurnipPrice = parseInt(turnipPrice);
    let curTrip = 1;
    let messages = [];
    let trips = [];

    totalTurnipsToBuy = Math.floor(totalBells / curTurnipPrice);

    messages.push(
      "Total Turnips to buy: " + totalTurnipsToBuy.toLocaleString()
    );
    messages.push(
      "Total trips: " +
        Math.ceil(totalTurnipsToBuy / totalTurnipsPerTrip).toLocaleString()
    );

    while (totalBells > totalTurnipsPerTrip * curTurnipPrice) {
      trips.push({
        trip: curTrip,
        stats: [
          "Withdraw: " +
            (totalTurnipsPerTrip * curTurnipPrice).toLocaleString() +
            " Bells",
          "Buy: " + totalTurnipsPerTrip.toLocaleString() + " Turnips",
        ],
      });
      curTrip = curTrip + 1;
      totalTurnipsToBuy = totalTurnipsToBuy - totalTurnipsPerTrip;
      totalBells = totalBells - totalTurnipsPerTrip * curTurnipPrice;
    }

    trips.push({
      trip: curTrip,
      stats: [
        "Withdraw: " + totalBells.toLocaleString() + " Bells",
        "Buy: " + totalTurnipsToBuy.toLocaleString() + " Turnips",
      ],
    });

    setResults(messages);
    setTrips(trips);
  };

  return (
    <div>
      <Form>
        <Form.Item>
          Turnip prices:{" "}
          <InputNumber
            min={0}
            value={turnipPrice ? turnipPrice : 0}
            onChange={handleTurnipChange}
            formatter={formatter}
          />
        </Form.Item>
        <Form.Item>
          Total Bells:{" "}
          <InputNumber
            min={0}
            value={bells ? bells : 0}
            onChange={handleBellsChange}
            formatter={formatter}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleCalculate}
            style={{ background: "#795548", borderColor: "#795548" }}
          >
            Calculate!
          </Button>
        </Form.Item>
      </Form>
      <span></span>
      <div>
        Results:
        <div>{results && results.map((msg) => <div>{msg}</div>)}</div>
      </div>
      <div>
        <Row type="flex" justify="center">
          {trips &&
            trips.map((trip) => (
              <Card
                title={"Trip: " + trip["trip"]}
                style={{
                  width: 300,
                  padding: "15px",
                  backgroundColor: "rgba(255, 255, 255, 0.0)",
                  border: 5,
                }}
                headStyle={{
                  backgroundColor: "#8BC34A",
                  border: 0,
                }}
                bodyStyle={{
                  backgroundColor: "#DCEDC8",
                  border: 0,
                }}
              >
                {trip["stats"].map((stat) => (
                  <p>{stat}</p>
                ))}
              </Card>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default Calculator;
