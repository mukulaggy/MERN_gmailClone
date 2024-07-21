import express from "express"; 
import { sendEmailHandler,createEmail, deleteEmail, getAllEmails } from "../controllers/email.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createEmail);
router.route("/:id").delete(isAuthenticated, deleteEmail);
router.route("/getallemails").get(isAuthenticated, getAllEmails);
router.post('/send', isAuthenticated, sendEmailHandler);


export default router;
