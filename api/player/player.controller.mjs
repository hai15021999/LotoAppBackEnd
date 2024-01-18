import express from "express";
import { joinGame, pickPaper } from "./player.model.mjs";
import { resJSON } from "../../utils/request/request.mjs";

const router = express.Router();

router
  .post("/joinGame", async (req, res) => {
    const { playerName, gameId } = req.body;
    const result = await joinGame(playerName, gameId);
    if (result) {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, {
        message: "Cannot join this game.",
      });
    }
  })
  .post("/pickPaper", async (req, res) => {
    const { gameId, playerName, paperId } = req.body;
    const result = await pickPaper(gameId, playerName, paperId);
    if (result) {
      resJSON(req, res, 200, result);
    } else {
      resJSON(req, res, 400, {
        message: "Cannot pick this paper.",
      });
    }
  })

export { router as PlayerRouter };
