import "./calculator.css";
import React, { useState } from "react";
import { InputNumber, Button, Form, message } from "antd";

function Calculator(props) {
  const [turnipPrice, setTurnipPrice] = useState(0);
  const [bells, setBells] = useState(0);
  const [results, setResults] = useState();

  const totalTurnipsPerTrip = 4000; // TODO: allow setting total bag slots

  const handleTurnipChange = (value) => {
    setTurnipPrice(value);
  };

  const handleBellsChange = (value) => {
    setBells(value);
  };

  const handleCalculate = () => {
    let totalTrips = 0;
    let totalTurnipsToBuy = 0;
    let totalBells = bells;
    let curTurnipPrice = turnipPrice;
    let curTrip = 1;
    let messages = [];

    totalTurnipsToBuy = Math.floor(totalBells / curTurnipPrice);

    messages.push("Total Turnips to buy: " + totalTurnipsToBuy);
    messages.push(
      "Total trips: " + Math.ceil(totalTurnipsToBuy / totalTurnipsPerTrip)
    );

    while (totalBells > totalTurnipsPerTrip * curTurnipPrice) {
      messages.push("Trip " + curTrip + ":        ");

      messages.push("Bring Bells: " + totalTurnipsPerTrip * curTurnipPrice);
      messages.push("Buy Turnips: " + totalTurnipsPerTrip);
      curTrip = curTrip + 1;
      totalTurnipsToBuy = totalTurnipsToBuy - totalTurnipsPerTrip;
      totalBells = totalBells - totalTurnipsPerTrip * curTurnipPrice;
    }

    messages.push("Trip " + curTrip + ":");
    messages.push("Bring Bells:" + totalBells);
    messages.push("Buy Turnips: " + totalTurnipsToBuy);

    setResults(messages);
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
      <div>
        Results:
        <div>{results && results.map((msg) => <div>{msg}</div>)}</div>
      </div>
    </div>
  );
}

export default Calculator;
