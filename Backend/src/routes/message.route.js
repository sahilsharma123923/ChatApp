const express = require('express')
const messageController = require('../controller/message.controller')
const arcjetMiddleware = require("../middleware/arcjet.middleware");
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router();

router.use(arcjetMiddleware, authMiddleware.authMiddleware)

router.get("/contacts", messageController.getContacts)
router.get("/chat", messageController.getChats)
router.get("/:id", messageController.getMessages)
router.post("/send/:id", messageController.sendMessages)

module.exports = router