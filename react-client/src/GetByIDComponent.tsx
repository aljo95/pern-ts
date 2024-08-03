import React from "react";
import { useState } from "react";
import { trpc } from "./trpc";

function GetByIDComponent() {
  const [inputNumber, setInputNumber] = useState<string>("");
  const [previousNumber, setPreviousNumber] = useState<string>("");
  const [inputFinal, setInputFinal] = useState<string>("");

  /*
  const user: number = trpc.user.getUserById.useQuery({
    text: "2",
  });
  if (!user) return;
  console.log(user);
  setPreviousNumber(user.name);
    */
  const handleSubmit: void = (e: InputEvent) => {
    e.preventDefault();
    console.log(+inputNumber); //parse to int
    setInputFinal(inputNumber);
    setInputNumber("");
  };

  return (
    <div id="container">
      <h1 id="title">
        Simple React+Express TypeScript example. +postgreSQL +tRPC
      </h1>
      <form id="form-container" onSubmit={handleSubmit}>
        <label>
          Input ID:
          <input
            type="number"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
          />
        </label>
        <input type="submit" value="submit" />
      </form>

      <div id="previous-container">
        {previousNumber ? (
          <p>Your selected ID corresponds with user: {previousNumber}</p>
        ) : (
          <></>
        )}
      </div>
      <div id="all users"></div>
    </div>
  );
}

export default GetByIDComponent;
