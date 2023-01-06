export function isDrawLogic(board) {
  //  flatten board
  const flatArr = Object.values(board).flat();

  //  chack if all of them are filled
  if (flatArr.every((item) => item == 1 || item == 2)) return true;
  return false;
}

export function checkWinner(board, currentPlayer) {
  if (
    (board["0"][0] !== 0 &&
      board["0"][0] === board["0"][1] &&
      board["0"][0] === board["0"][2]) ||
    (board["1"][0] !== 0 &&
      board["1"][0] === board["1"][1] &&
      board["1"][0] === board["1"][2]) ||
    (board["2"][0] !== 0 &&
      board["2"][0] === board["2"][1] &&
      board["2"][0] === board["2"][2]) ||
    (board["0"][0] !== 0 &&
      board["0"][0] === board["1"][0] &&
      board["1"][0] === board["2"][0]) ||
    (board["0"][1] !== 0 &&
      board["0"][1] === board["1"][1] &&
      board["0"][1] === board["2"][1]) ||
    (board["0"][2] !== 0 &&
      board["0"][2] === board["1"][2] &&
      board["0"][2] === board["2"][2]) ||
    (board["0"][0] !== 0 &&
      board["0"][0] === board["1"][1] &&
      board["0"][0] === board["2"][2]) ||
    (board["0"][2] !== 0 &&
      board["0"][2] === board["1"][1] &&
      board["0"][2] === board["2"][0])
  ) {
    console.log(currentPlayer);
    return currentPlayer;
  }
  return null;
}
