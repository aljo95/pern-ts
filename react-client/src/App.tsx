import { useEffect, useState } from 'react'
import './App.css'
import { trpc } from './trpc'

function App() {
  const [inputNumber, setInputNumber] = useState<string>("")
  const [inputFunal, setInputFinal] = useState<string>("")
  const [previousNumber, setPreviousNumber] = useState<string>("")


  useEffect(() => { 
    //const fetchUser = , made into IIFE instead 
    (async() => {
      const user = await trpc.user.getUserById.query(inputFunal)
      if (!user) return
      console.log(user)
      setPreviousNumber(user.name)
    })();
  }, [inputFunal])


  const handleSubmit: any = (e: InputEvent) => {
    e.preventDefault();
    //send number to server
    console.log(+inputNumber) //parse to int
    setInputFinal(inputNumber)
    setInputNumber("")
  }


  return (
    <>
      <h1 id="title">Simple React+Express TypeScript example. +postgreSQL +tRPC</h1>
      <form id="form-container" onSubmit={handleSubmit}>
        <label>Input ID: 
          <input type="number" value={inputNumber} onChange={(e) => setInputNumber(e.target.value)} />
        </label>
        <input type="submit" value="submit"/>
      </form>
      <div id="return-container">
        <p></p>
      </div>

      <div id="previous-container">
        {previousNumber ? 
          <p>Your selected ID corresponds with user: {previousNumber}</p>
        :
          <p></p>
        }
      </div>
    </>
  )
}

export default App
