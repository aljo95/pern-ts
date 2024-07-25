import { useEffect, useState } from 'react'
import './App.css'
import { trpc } from './trpc'

function App() {
  const [inputNumber, setInputNumber] = useState<string>("")
  //const [inputFinal, setInputFinal] = useState<string>("")
  const [previousNumber, setPreviousNumber] = useState<string>("")


  const { isPending, error, data } = trpc.user.getUserById.useQuery({text: previousNumber}, { 
    refetchOnWindowFocus: false
  })
  console.log(data)

  if (isPending) return "loading.."
  if (error) return "ERROR" + error.message

  const handleSubmit: any = (e: InputEvent) => {
    e.preventDefault();
    //send number to server
    console.log(+inputNumber) //parse to int
    setPreviousNumber(inputNumber)
    setInputNumber("")
  }

  return (
    <div id="container">
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
        {data ?
          <p>{data}</p> 
        :
          previousNumber ?
            <p>invalid number</p>
            :
            <p>nothing fetched</p>
        }
        
      </div>
    </div>
  )
}

export default App
