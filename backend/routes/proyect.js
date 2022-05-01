import express from "express";
import proyect from "../controllers/proyect.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const router = express.Router();

router.post("/saveProyect", auth, proyect.saveProyect);
router.get("/listProyectAdmin", auth, proyect.listProyectAdmin);
router.get("/listProyectColab", auth, proyect.listProyectColab);
router.get("/listCollaborators/:_id",auth, proyect.listCollaborators);
router.put("/updateProyect", auth, proyect.updateProyect);
router.delete("/deleteProyect/:_id", auth, proyect.deleteProyect);
router.put("/updateCollaborators/:_id",auth, proyect.addCollaborators);

export default router;
