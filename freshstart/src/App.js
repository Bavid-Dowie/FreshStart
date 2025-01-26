import './App.css';
import React, { useState } from 'react';
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  })

  // numClickHandlerFunction

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      let newNum;

      if (calc.num === 0 && value === "0") {
        newNum = "0";
      } else if (removeSpaces(calc.num) % 1 === 0) {
        newNum = toLocaleString(Number(removeSpaces(calc.num + value)));
      } else {
        newNum = toLocaleString(calc.num + value);
      }

      setCalc({
        ...calc,
        num: newNum,
        res: !calc.sign ? 0 : calc.res,
      });
    }

  };

  // commaClickHandler function

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  // signClickHandler function

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  // equalsClickHandler function

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) => {
        if (sign === "+") {
          return a + b;
        } else if (sign === "-") {
          return a - b;
        } else if (sign === "X") {
          return a * b;
        } else {
          return a / b;
        }
      };


      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
              math(
                Number(removeSpaces(calc.res)),
                Number(removeSpaces(calc.num)),
                calc.sign
              )
            ),
        sign: "",
        num: 0,
      });
    }
  };

  // equalsClickHandler function

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  // invertClickHandler function

  const getParsedValue = (value) => (value ? parseFloat(removeSpaces(value)) : 0);

  const percentClickHandler = () => {
    const num = getParsedValue(calc.num);
    const res = getParsedValue(calc.res);

    setCalc({
      ...calc,
      num: num / 100,
      res: res / 100,
      sign: "",
    });
  };

  // percentClickHandler function

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
  {
    btnValues.flat().map((btn, i) => {
      let onClickHandler;

      if (btn === "C") {
        onClickHandler = resetClickHandler;
      } else if (btn === "+-") {
        onClickHandler = invertClickHandler;
      } else if (btn === "%") {
        onClickHandler = percentClickHandler;
      } else if (btn === "=") {
        onClickHandler = equalsClickHandler;
      } else if (btn === "/" || btn === "X" || btn === "-" || btn === "+") {
        onClickHandler = signClickHandler;
      } else if (btn === ".") {
        onClickHandler = commaClickHandler;
      } else {
        onClickHandler = numClickHandler;
      }

      return (
        <Button
          key={i}
          className={btn === "=" ? "equals" : ""}
          value={btn}
          onClick={onClickHandler}
        />
      );
    })
  }
</ButtonBox>

    </Wrapper>
  );
};

export default App
