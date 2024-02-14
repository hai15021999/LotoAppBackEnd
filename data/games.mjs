import { PaperData } from './papers.mjs';
import { generateGameCode } from '../utils/functions/common.mjs'

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
      code: temp.code,
      result: temp.result,
      status: temp.status,
      gameInfo: temp.gameInfo,
      players: Object.keys(temp.players).reduce((acc, cur) => {
        if (temp.players[cur] && temp.players[cur].isReady && temp.players[cur].isRemove !== true) {
          acc.push(cur);
        }
        return acc;
      }, []),
      selectedPapers: temp.selectedPapers, 
      winner: temp.winner
    }
  }
  return null;
};

const getGameBoardByManager = (id) => {
  return gameBoards.get(id);
};

const getGameBoardRecord = (id) => {
  return gameBoards.get(id)?.result ?? [];
};

const createGameBoard = (id) => {
  const gameCodes = getGameBoards().reduce((acc, cur) => {
    if (cur) {
      acc.push(cur.code);
    }
    return acc;
  }, []);
  const newGameCode = generateGameCode(gameCodes);
  gameBoards.set(newGameCode, {
    id: id,
    code: newGameCode,
    result: [],
    winner: [],
    players: {},
    status: "new",
    selectedPapers: [],
    gameInfo: {}
  });
  return {
    status: "success",
    gameCode: newGameCode
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
  if (temp.status === 'playing') {
    return {
      status: "failed",
      message: "Game đã bắt đầu."
    }
  }
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

const removePlayer = (id, player) => {
  let temp = gameBoards.get(id);
  if (temp.status === 'playing') {
    return {
      status: "failed",
      message: "Game đã bắt đầu."
    }
  }
  const paperIds = temp.players[player]['paperIds'];
  temp.players[player]['isRemove'] = true;
  temp.selectedPapers = temp.selectedPapers.filter((item) => { return !paperIds.includes(item) });
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

const updateGameBoardWinner = (id, playerName) => {
  let temp = gameBoards.get(id);
  if (temp.winner) {
    temp['winner'].push(playerName);
  } else {
    temp['winner'] = [playerName];
  }
  temp.status = 'end';
  gameBoards.set(id, temp);
  return {
    status: "success",
  };
};

const onFinishGame = (id) => {
  let temp = gameBoards.get(id);
  temp['status'] = 'finished';
  gameBoards.set(id, temp);
  return {
    status: "success",
  };
};

const onRestartGame = (id) => {
  let temp = gameBoards.get(id);
  temp['status'] = 'playing';
  temp['winner'] = [];
  temp['result'] = [];
  gameBoards.set(id, temp);
  return {
    status: "success",
  };
}

const verifyBingo = (id, playerName, paperId, rowBingo) => {
  let temp = gameBoards.get(id);
  const paperData = PaperData[paperId];

  const isCorrectPlayerPaper = temp.players[playerName]['paperIds'].includes(paperId);

  const isIncludeCorrectValue = rowBingo.reduce((acc, cur) => {
    if (!temp.result.includes(cur)) {
      acc = false;
    }
    return acc;
  }, true);

  const isCorrectRow = paperData.reduce((acc, cur) => {
    const isFullElement = cur.reduce((acc_cell, cur_cell) => {
      if (!rowBingo.includes(cur_cell)) {
        acc_cell = false;
      }
      return acc_cell;
    }, true);
    if (isFullElement) {
      acc = true;
    }
    return acc;
  }, false);

  return isIncludeCorrectValue && isCorrectRow && isCorrectPlayerPaper;
}

export {
  getGameBoard,
  getGameBoardRecord,
  createGameBoard,
  addGameBoardPlayer,
  updateGameBoardStatus,
  updateGameBoardRecord,
  updateGameBoardInfo,
  getGameBoards,
  updatePlayerPaper,
  verifyBingo,
  updateGameBoardWinner,
  onFinishGame,
  removePlayer,
  getGameBoardByManager,
  onRestartGame
};
