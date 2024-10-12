const chatController = require("../controllers/chat.controller");
const { checkifLoggedIn } = require("../middleware/auth.middleware");

const express = require("express");

const router = express.Router();

router.use(checkifLoggedIn);

router.get("/chat-rooms", chatController.getChatRooms);
router.post("/create-room", chatController.createChatRoom);

module.exports = router;
