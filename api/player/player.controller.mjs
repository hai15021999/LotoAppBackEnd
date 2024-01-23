import express from "express";
import { joinGame, pickPaper, notifyWaitingBingo, notifyBingo } from "./player.model.mjs";
import { resJSON } from "../../utils/request/request.mjs";

const router = express.Router();

router
  .post("/joinGame", async (req, res) => {
    const { playerName, gameId } = req.body;
    const result = await joinGame(playerName, gameId);
    if (result) {
      if (result.status === "success") {
        resJSON(req, res, 200, result);
      } else {
        resJSON(req, res, 400, {
          message: result.message,
        });
      }
    } else {
    }
  })
  .post("/pickPaper", async (req, res) => {
    const { gameId, playerName, paperIds } = req.body;
    const result = await pickPaper(gameId, playerName, paperIds);
    if (result.status === "success") {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, {
        message: result.message,
      });
    }
  })
  .post("/notifyWaiting", async (req, res) => {
    const { gameId, playerName } = req.body;
    const result = await notifyWaitingBingo(gameId, playerName);
    if (result.status === "success") {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, {
        message: result.message,
      });
    }
  })
  .post("/notifyBingo", async (req, res) => {
    const { gameId, playerName, paperId, rowBingo } = req.body;
    const result = await notifyBingo(gameId, playerName, paperId, rowBingo);
    if (result.status === "success") {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, {
        message: result.message,
      });
    }
  });

export { router as PlayerRouter };
