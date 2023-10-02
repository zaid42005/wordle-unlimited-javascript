
import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault } from './Words';
import {createContext} from 'react'; 

export const AppContext = createContext();
function App() {
  const onSelectLetter = (keyVal) => {
    if (currAttempt.letter > 4) return;
            const newBoard = [...board]
            newBoard[currAttempt.attempt][currAttempt.letter] = keyVal
            setBoard(newBoard)
            setCurrAttempt({...currAttempt, letter:currAttempt.letter + 1})
  }
  const onDelete = () => {
    if (currAttempt.letter === 0) return;
            const newBoard = [...board]
            newBoard[currAttempt.attempt][currAttempt.letter - 1] = ""
            setBoard(newBoard)
            setCurrAttempt({...currAttempt, letter:currAttempt.letter -1})
  }
  const onEnter = () =>{
    if (currAttempt.letter !== 5) return;
            setCurrAttempt({attempt: currAttempt.attempt + 1, letter: 0})
  }

  const [board,setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt:0,letter:0});
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value = {{board, setBoard, currAttempt, setCurrAttempt, onDelete, onEnter, onSelectLetter}}>
        <div className='game'>
        <Board />
        <Keyboard />
        </div>
      </AppContext.Provider>
      
    </div>
  );
}

export default App;
