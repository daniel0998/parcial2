import express from "express";
import task from "../controllers/task.js";
import auth from "../middlewares/auth.js";
import validId from "../middlewares/validId.js";
import formatFile from "../middlewares/formatFile.js";
import multiparty from "connect-multiparty";
const mult = multiparty();
const router = express.Router();

router.post("/saveTask/:_id",auth, task.saveTask);
router.post("/saveTaskImg",auth, mult, formatFile, task.saveTaskImg);
router.get("/listTask/:_id",auth,  task.listTask);
router.get("/findTask/:_id",auth,  task.findTask);
router.put("/updateTask",auth, task.updateTask);
router.delete("/deleteTask/:_id",auth, task.deleteTask);

export default router;
