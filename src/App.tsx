import { useGame } from './context/GameContext';
import Board from './components/Board';
import catImage from './assets/polite-cat.jpg';
import './App.css';

function App() {
  const { winner, resetGame } = useGame();

  return (
    <div>
      <h1 className='title'>Tic-Tac-Toe</h1>
      <Board />
      {winner && (
        <>
          <div className='end-game-message'>
            <h2 className='stalemate-text'>
              {winner === 'stalemate'
                ? "It's a cat's game"
                : `The "${winner}" Player Wins!`}
            </h2>
            {winner === 'stalemate' && (
              <img className='cat-image' src={catImage} alt='Polite Cat'></img>
            )}
          </div>
          <button onClick={resetGame}>Reset</button>
        </>
      )}
    </div>
  );
}

export default App;
