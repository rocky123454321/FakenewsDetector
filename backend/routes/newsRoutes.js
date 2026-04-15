import express from 'express'
const router = express.Router()
import  {checkNews}  from "../controllers/newsController.js"
router.post("/check", checkNews);

export default router