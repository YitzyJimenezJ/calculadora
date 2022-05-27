import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React, { useState } from "react";

const btnValues = [
  ["C", "+-", "/","X"],
  [7, 8, 9, "-"],
  [4, 5, 6, "+"],
  [1, 2, 3, 0], 
  ["="],
];
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  //para setear valores estaticos, el signo, el numero y el resultado
  let [calc, setCalc] = useState({
    operador: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault(); //obtiene el evento
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) { //el numero debe ser menor a 16 digitos
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.operador ? 0 : calc.res,
      });
    }
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      operador: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };
//hace los calculos al tocar el =
  const equalsClickHandler = () => {
    if (calc.operador && calc.num) {
      const math = (num1, num2, operador) =>
        operador === "+"
          ? num1 + num2
          : operador === "-"
          ? num1 - num2
          : operador === "X"
          ? num1 * num2
          : Math.floor(num1 / num2);

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.operador === "/"
            ? "No se puede dividir entre cero"
            : toLocaleString(
                math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)), calc.operador)
              ),
        operador: "",
        num: 0,
      });
    }
  };

  const invertirNumero = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      operador: "",
    });
  };
//resetea la calculadora
  const resetearCalculadora = () => {
    setCalc({
      ...calc, //se usa para llamar una variable con multiples parametros
      operador: "",
      num: 0,
      res: 0,
    });
  };
  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
      {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C" //comprueba si estrictamente se presiono uno de los valores dados
                  ? resetearCalculadora
                  : btn === "+-"
                  ? invertirNumero
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : numClickHandler
              }/>
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;