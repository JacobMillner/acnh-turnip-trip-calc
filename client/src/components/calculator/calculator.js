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

  const handleCalculate = () => {
    if (bells == 0 || turnipPrice == 0) {
      message.error(
        "Input Error: Make sure you enter turnip prices and bells."
      );
      return;
    }
    let totalTrips = 0;
    let totalTurnipsToBuy = 0;
    let totalBells = bells;
    let curTurnipPrice = turnipPrice;
    let curTrip = 1;
    let messages = [];
    let trips = [];

    totalTurnipsToBuy = Math.floor(totalBells / curTurnipPrice);

    messages.push("Total Turnips to buy: " + totalTurnipsToBuy);
    messages.push(
      "Total trips: " + Math.ceil(totalTurnipsToBuy / totalTurnipsPerTrip)
    );

    while (totalBells > totalTurnipsPerTrip * curTurnipPrice) {
      trips.push({
        trip: curTrip,
        stats:
          "Withdraw " +
          totalBells +
          " Bells. Buy " +
          totalTurnipsToBuy +
          " Turnips.",
      });
      curTrip = curTrip + 1;
      totalTurnipsToBuy = totalTurnipsToBuy - totalTurnipsPerTrip;
      totalBells = totalBells - totalTurnipsPerTrip * curTurnipPrice;
    }

    trips.push({
      trip: curTrip,
      stats:
        "Withdraw " +
        totalBells +
        " Bells. Buy " +
        totalTurnipsToBuy +
        " Turnips.",
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
            value={turnipPrice}
            onChange={handleTurnipChange}
          />
        </Form.Item>
        <Form.Item>
          Total Bells:
          <InputNumber min={0} value={bells} onChange={handleBellsChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleCalculate}>
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
                style={{ width: 300, padding: "10px" }}
              >
                {trip["stats"]}
              </Card>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default Calculator;
