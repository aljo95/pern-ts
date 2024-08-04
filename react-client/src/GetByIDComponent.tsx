import React from "react";
import { useState } from "react";
import { trpc } from "./trpc";

function GetByIDComponent() {
  const [inputNumber, setInputNumber] = useState<string>("");
  const [previousNumber, setPreviousNumber] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, refetch } = trpc.user.getUserById.useQuery(
    {
      text: inputNumber,
    },
    {
      enabled: false,
    }
  );

  const handleSubmit: void = async (e: InputEvent) => {
    e.preventDefault();
    const res = await refetch();
    console.log(res.data);
    setPreviousNumber(res.data);

    setInputNumber("");
  };

  return (
    <div id="container">
      <h2 id="title">
        Simple React+Express TypeScript example. +postgreSQL +tRPC
      </h2>
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
    </div>
  );
}

export default GetByIDComponent;
