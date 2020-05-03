import "./calculator.css";
import React, { useState } from "react";
import { InputNumber, Button, Form } from "antd";

function Calculator(props) {
  const [turnipPrice, setTurnipPrice] = useState(0);
  const [bells, setBells] = useState(0);
  const [results, setResults] = useState("");

  const handleTurnipChange = (value) => {
    setTurnipPrice(value);
  };

  const handleBellsChange = (value) => {
    setBells(value);
  };

  const handleCalculate = () => {
    setResults("Price: " + turnipPrice + " " + "Bells: " + bells);
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
          Total Bells:{" "}
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
        <div>{results}</div>
      </div>
    </div>
  );
}

export default Calculator;
