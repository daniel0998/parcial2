import express from "express";
import list from "../controllers/list.js";
import auth from "../middlewares/auth.js";
import validId from "../middlewares/validId.js";
import formatFile from "../middlewares/formatFile.js";
import multiparty from "connect-multiparty";
const mult = multiparty();
const router = express.Router();

router.post("/saveList/:_id",auth,  list.saveList);
router.get("/listList/:_id",auth,  list.listList);
router.put("/updatelist",auth,  list.updateList);
router.delete("/deletelist/:_id",auth,  validId, list.deleteList);

export default router;