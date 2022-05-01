import express from "express";
const router = express.Router();
import mail from "./../controllers/mail.js"


router.post("/contactMail/",  mail.contactMail);

export default router;