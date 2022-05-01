import express from "express";
import role from "../controllers/role.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
import validId from "../middlewares/validId.js";
const router = express.Router();

router.post("/registerRole",   role.registerRole);
router.get("/listRole",   role.listRole);
router.get("/findRole/:_id",  role.findRole);
router.put("/updateRole",   role.updateRole);
router.delete("/deleteRole/:_id",  role.deleteRole);

export default router;
