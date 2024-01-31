import express from "express";
import { resJSON } from "../../utils/request/request.mjs";
import { login, removeGamePlayer } from './game-manager.model.mjs'

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
  });

export { router as GameManagerRouter };
