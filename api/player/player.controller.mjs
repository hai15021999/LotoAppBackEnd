import express from "express";
import { joinGame, pickPaper } from "./player.model.mjs";
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
  });

export { router as PlayerRouter };
