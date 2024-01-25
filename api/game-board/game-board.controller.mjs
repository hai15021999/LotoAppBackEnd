import express from "express";
import { getNewGameBoardId, getGameById, getAllGameBoards, startGameBoard, getNumber, onFinishGame } from "./game-board.model.mjs";
import { resJSON } from "../../utils/request/request.mjs";

const router = express.Router();

router
  .get("/game/:id", async (req, res) => {
    const result = await getGameById(req);
    if (result) {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, result);
    }
  })
  .get("/games", async (req, res) => {
    const result = await getAllGameBoards(req);
    if (result) {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, result);
    }
  })
  .post("/newGame", async (req, res) => {
    const result = await getNewGameBoardId();
    if (result) {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, {
        message: "Cannot generate new game.",
      });
    }
  })
  .post("/startGame", async (req, res) => {
    const result = await startGameBoard(req);
    if (result) {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, {
        message: "Cannot generate new game.",
      });
    }
  })
  .post("/getNumber", async (req, res) => {
    const result = await getNumber(req);
    if (result) {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, {
        message: "Cannot generate new game.",
      });
    }
  }).post("/finish", async (req, res) => {
    const result = await onFinishGame(req);
    if (result) {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, {
        message: "Cannot finish this game.",
      });
    }
  })

export { router as GameBoardRouter };
