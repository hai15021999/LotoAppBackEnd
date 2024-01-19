import { lotoPaper } from './papers.mjs'

let gameBoards = new Map();

const getGameBoards = () => {
    const result = Array.from(gameBoards, ([_, value]) => (value))
    return result;
  };

const getGameBoard = (id) => {
  const temp = gameBoards.get(id);
  if (temp) {
    return {
      id: temp.id,
      result: temp.result,
      status: temp.status,
      gameInfo: temp.gameInfo,
      players: Object.keys(temp.players).reduce((acc, cur) => {
        if (temp.players[cur] && temp.players[cur].isReady) {
          acc.push(cur);
        }
        return acc;
      }, []),
      selectedPapers: temp.selectedPapers
    }
  }
  return null;
};

const getGameBoardRecord = (id) => {
  return gameBoards.get(id)?.result ?? [];
};

const createGameBoard = (id) => {
  gameBoards.set(id, {
    id: id,
    result: [],
    winner: null,
    players: {},
    status: "new",
    selectedPapers: [],
    gameInfo: {},
  });
  return {
    status: "success",
  };
};

const addGameBoardPlayer = (id, player) => {
  let temp = gameBoards.get(id);
  if (temp.players[player]) {
    return {
      status: "failed",
      message: "Duplicate player",
    };
  }
  temp.players[player] = {
    isReady: false,
    paperIds: []
  };
  gameBoards.set(id, temp);
  return {
    status: "success",
  };
};

const updatePlayerPaper = (id, player, paperIds) => {
  let temp = gameBoards.get(id);
  if (temp.selectedPapers.includes(...paperIds)) {
    return {
      status: "failed",
      message: "Tờ đã bị chọn."
    }
  }
  temp.players[player] = {
    isReady: true,
    paperIds: paperIds
  }
  temp.selectedPapers.push(...paperIds);
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
  getGameBoards,
  updatePlayerPaper
};
