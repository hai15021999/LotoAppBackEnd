import express from "express";
import { resJSON } from "../../utils/request/request.mjs";
import { login, removeGamePlayer, restartGame } from './game-manager.model.mjs'
import { getGameBoardByManager } from '../../data/games.mjs';
const router = express.Router();

router
  .post("/login", async (req, res) => {
    const { username, password } = req.body;
    const result = await login(username, password);
    if (result.error) {
        resJSON(req, res, 400, {
            message: result.message,
          });
    } else {
        resJSON(req, res, 200, result);
    }
  })
  .get("/game/:id", async (req, res) => {
    const result = await getGameBoardByManager(req);
    if (result) {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, result);
    }
  })
  .post("/removePlayer", async (req, res) => {
    const { gameId, player } = req.body;
    const result = await removeGamePlayer(gameId, player);
    if (result.error) {
        resJSON(req, res, 400, {
            message: result.message,
          });
    } else {
        resJSON(req, res, 200, result);
    }
  })
  .post("/restart", async (req, res) => {
    const result = await restartGame(req);
    if (result) {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, {
        message: "Cannot restart this game.",
      });
    }
  });

export { router as GameManagerRouter };
