let gameBoards = new Map();

const lotoPaper = [
  {
    id: "greenLeft",
    value: [
      [16, 28, 45, 68, 87],
      [4, 29, 35, 55, 73],
      [9, 30, 54, 62, 88],
      [1, 21, 33, 52, 76],
      [8, 40, 50, 79, 81],
      [11, 20, 46, 63, 83],
      [27, 49, 59, 72, 80],
      [2, 19, 32, 48, 67],
      [14, 22, 57, 78, 90],
    ],
  },
  {
    id: "greenRight",
    value: [
      [6, 18, 47, 69, 86],
      [13, 31, 44, 61, 70],
      [7, 24, 34, 56, 71],
      [5, 23, 41, 65, 74],
      [10, 37, 53, 60, 89],
      [17, 38, 42, 75, 84],
      [15, 25, 51, 77, 85],
      [12, 36, 43, 64, 82],
      [3, 26, 39, 58, 66],
    ],
  },
];

const getGameBoards = () => {
    const result = Array.from(gameBoards, ([_, value]) => (value))
    return result;
  };

const getGameBoard = (id) => {
  return gameBoards.get(id);
};

const getGameBoardRecord = (id) => {
  return gameBoards.get(id)?.result ?? [];
};

const createGameBoard = (id) => {
  gameBoards.set(id, {
    id: id,
    result: [],
    winner: null,
    players: [],
    status: "new",
    gameInfo: {},
  });
  return {
    status: "success",
  };
};

const addGameBoardPlayer = (id, player) => {
  let temp = gameBoards.get(id);
  if (temp.players.includes(player)) {
    return {
      status: "failed",
      message: "Duplicate player",
    };
  }
  temp.players.push(player);
  gameBoards.set(id, temp);
  return {
    status: "success",
  };
};

const updateGameBoardStatus = (id, newStatus) => {
  let temp = gameBoards.get(id);
  temp.status = newStatus;
  gameBoards.set(id, temp);
  return {
    status: "success",
  };
};

const updateGameBoardRecord = (id, newRecord) => {
  let temp = gameBoards.get(id);
  temp.result.push(newRecord);
  gameBoards.set(id, temp);
  return {
    status: "success",
  };
};

const updateGameBoardInfo = (id, playerName, paperId) => {
  let temp = gameBoards.get(id);
  if (temp.gameInfo[paperId]) {
    return {
      status: "failed",
      message: "Choosen paper"
    };
  }
  temp.gameInfo[paperId] = playerName;
  gameBoards.set(id, temp);
  return {
    status: "success",
  };
};

export {
  getGameBoard,
  getGameBoardRecord,
  createGameBoard,
  addGameBoardPlayer,
  updateGameBoardStatus,
  updateGameBoardRecord,
  updateGameBoardInfo,
  getGameBoards
};
