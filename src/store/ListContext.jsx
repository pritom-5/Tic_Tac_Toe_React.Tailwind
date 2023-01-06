import { createContext, useReducer } from "react";
import { checkWinner, isDrawLogic } from "../logic/GameLogics";

const initialBoardObj = {
  0: [0, 0, 0],
  1: [0, 0, 0],
  2: [0, 0, 0],
};

const turnOptions = [0, 1, 2];

const initialContext = {
  gameState: {
    board: {},
    currentPlayer: "",
    gameOverLogic: { message: "", winner: null }, //winner 0 for draw
  },
  addItem: (key, index) => {},
  restart: () => {},
};

const ListContext = createContext(initialContext);

export default ListContext;

//////////////////////
const initialListObj = {
  board: { ...initialBoardObj },
  currentPlayer: 1,
  gameOverLogic: { message: "", winner: null },
};

const reducerFn = (state, action) => {
  if (action.type === "ADD") {
    const { key, index } = action.payload;
    const { board, currentPlayer, gameOverLogic } = state;
    const board0 = { ...board };
    board0[key][index] = currentPlayer;

    const tempCurrentPlayer = currentPlayer === 1 ? 2 : 1;

    const isDraw = isDrawLogic(board0);
    const winner = checkWinner(board0, currentPlayer);

    let tempGameOverLogic = { ...gameOverLogic };

    if (winner !== null) {
      tempGameOverLogic = {
        message: `player ${winner} won`,
        winner,
      };
    } else {
      if (isDraw) {
        tempGameOverLogic = { message: "It's a Draw", winner: 0 };
      }
    }

    return {
      board: board0,
      currentPlayer: tempCurrentPlayer,
      gameOverLogic: tempGameOverLogic,
    };
  }

  if (action.type === "RESTART") {
    const newBoard = {
      0: [0, 0, 0],
      1: [0, 0, 0],
      2: [0, 0, 0],
    };
    return {
      board: newBoard,
      currentPlayer: 1,
      gameOverLogic: { message: "", winner: null },
    };
  }
  return state;
};

export function ListContextProvider({ children }) {
  const [boardState, dispatch] = useReducer(reducerFn, initialListObj);

  // addItemHandler
  const addItemHandler = (key, index, currentTurn) => {
    dispatch({ type: "ADD", payload: { key, index } });
  };

  // restartHandler
  const restartHandler = () => {
    dispatch({ type: "RESTART" });
  };

  return (
    <ListContext.Provider
      value={{
        gameState: boardState,
        addItem: addItemHandler,
        restart: restartHandler,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
