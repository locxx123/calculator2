import React, { useState } from "react";
import ButtonsContainer from "./components/ButtonsContainer";
import DisplayContainer from "./components/DisplayContainer";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

  function handleClick(e) {
    const targetValue = e.target.name;
    setDisplay(display + targetValue);
  }

  function operatorClick(operator) {
    let lastCharacter = display.slice(-2);
    let operatorsArray = ["+ ", "- ", "* ", "/ "];


    if (display === "" || operatorsArray.includes(lastCharacter)) return;

    setDisplay((prevDisplay) => {
      return prevDisplay + " " + operator + " ";
    });
  }

  function handleEqual() {
    if (display.slice(-2).includes("+ ", "- ", "* ", "/ ")) return;

    setDisplay("");

    try {
      const resultValue = calculate(display.replace( /\s/g, ''));
      setResult(resultValue);
    } catch (error) {
      setDisplay("Error");
    }
  }

//   Logic tính toán
  function calculate(calstr) {
    for (var level = 0; level < 3; level++) {
        var search = level == 0 ? '(\\d+[*/]\\d+)'
                   : level == 1 ? '(-?\\d+-\\d+)'
                                : '(-?\\d+\\+\\d+)';
        var higher = RegExp(search);
        var res = calstr.split(higher);
        while(res.length > 2){
            for(var i = 1; i < res.length; i+=2){
                var a = res[i].split(/((?:^-)?[0-9\.]+)/g);
                calstr = calstr.replace(higher, 
                     a[2] == '*' ? +a[1] * +a[3]
                   : a[2] == '/' ? +a[1] / +a[3]
                   : a[2] == '+' ? +a[1] + +a[3]
                                 : +a[1] - +a[3]
                );
            }
            res = calstr.split(higher);
        }
    }
    return res[0];
  }

//   Nút xóa tất cả
  function clear() {
    setDisplay("");
    setResult("");
  }

//   Nút xóa 1 ký tự "X"
  function backspace() {
    setDisplay(display.slice(0, -1));
  }

  return (
    <>
      <div className="container">
        <div className="calculator">
          {/* Phần hiển thị màn hình và nút xóa */}
          <DisplayContainer
            display={display}
            result={result}
            backspace={backspace}
            clear={clear}
          />
          {/* Nút bấm và dấu */}
          <ButtonsContainer
            operatorClick={operatorClick}
            handleClick={handleClick}
            handleEqual={handleEqual}
          />
        </div>
      </div>
    </>
  );
}

export default App;
