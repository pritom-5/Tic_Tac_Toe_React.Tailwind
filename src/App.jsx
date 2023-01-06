import { useContext, useState } from "react";
import svgPicker from "./logic/svgPicker";
import ListContext from "./store/ListContext";

function Item({ objKey, index, value }) {
  const { addItem, gameState } = useContext(ListContext);
  const clickHandler = () => {
    if (value != 0) return;
    addItem(objKey, index);
  };

  const svg = svgPicker(value);

  return (
    <div
      onClick={clickHandler}
      className="bg-purple-600 h-24 aspect-square rounded-xl border-yellow-500 border-2 shadow-inner"
    >
      {svg}
    </div>
  );
}

function StaticBoard({ value, winner }) {
  const svg = svgPicker(value);

  const classVar =
    value == winner
      ? "bg-green-900 p-2 flex justify-center"
      : "bg-transparent p-2 flex justify-center";

  console.log(svg);

  return (
    <div id="static-board-container" className={classVar}>
      <div id="static-board">
        <div className="h-8 w-8 item">{svg}</div>
      </div>
    </div>
  );
}

function App() {
  const { gameState, restart } = useContext(ListContext);
  const { board, currentPlayer } = gameState;

  const svg = svgPicker(currentPlayer);

  return (
    <div className="min-h-screen bg-purple-900">
      <div
        id="turn"
        className="flex justify-center items-center h-16 mx-auto pt-32 pb-0 aspect-square text-purple-400 font-bold text-3xl"
      >
        <div>Turn</div>
        <div className="h-16 w-16">{svg}</div>
      </div>

      <div
        id="board"
        className="grid grid-cols-[max-content_max-content_max-content] gap-2 place-content-center pt-16"
      >
        {Object.values(board).map((items0, index0) =>
          items0.map((items1, index1) => (
            <Item
              key={index0 + index1}
              objKey={index0}
              index={index1}
              value={items1}
            />
          ))
        )}
      </div>
      {gameState.gameOverLogic.winner !== null && (
        <div
          id="modal"
          className="bg-purple-400 bg-opacity-5 absolute top-0 left-0 min-h-screen min-w-full backdrop-blur-md"
        >
          <div className="bg-purple-900 max-w-fit py-8 px-16 text-orange-300 font-bold text-3xl rounded-xl text-center absolute top-16 left-1/2 -translate-x-1/2">
            <div className="text-2xl">Game Over</div>
            <div className="text-4xl">{gameState.gameOverLogic.message}</div>
            <div
              id="bord-modal"
              className=" grid grid-cols-3 place-content-center border-purple-400 border-2 m-4 rounded-xl"
            >
              {Object.values(board).map((item1, index1) =>
                item1.map((item2, index2) => (
                  <StaticBoard
                    key={` ${index1} ${index2}`}
                    value={item2}
                    winner={gameState.gameOverLogic.winner}
                  />
                ))
              )}
            </div>
            <button
              onClick={() => restart()}
              className="mt-4 bg-green-700 text-orange-200 px-4 py-2 rounded-md hover:bg-orange-200 hover:text-green-700"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
